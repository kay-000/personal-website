#!/usr/bin/env node
/* ============================================================
   Normalize everything in src/assets/pictures/ for the web.

   Drop raw files (straight off a phone or camera) into
   src/assets/pictures/<note-id>/ and run:

       npm run media

   It will, in place and idempotently:
     - convert HEIC/PNG/oversized images to <=1600px JPEG
     - transcode HEVC or .mov video to H.264 .mp4 (<=1920px)
     - generate a <name>-poster.jpg for every video
     - move the untouched originals to temp/originals/ (gitignored)

   Why: HEIC and HEVC do not play in Chrome or Firefox. They look
   fine on a Mac and are invisibly broken for most visitors.
   ============================================================ */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// import.meta.dirname needs Node 20.11+; this works everywhere
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const MEDIA = path.join(ROOT, 'src/assets/pictures');
const ARCHIVE = path.join(ROOT, 'temp/originals');

const MAX_IMAGE_PX = 1600;  // long edge
const MAX_VIDEO_PX = 1280;  // long edge, not width
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm']);

const run = (cmd, args) =>
  execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();

const archive = (file) => {
  const rel = path.relative(MEDIA, file);
  const dest = path.join(ARCHIVE, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(file, dest);
};

const probe = (file, entries) => {
  const isFormat = entries === 'duration';
  try {
    return run('ffprobe', [
      '-v', 'error',
      ...(isFormat ? [] : ['-select_streams', 'v:0']),
      '-show_entries', `${isFormat ? 'format' : 'stream'}=${entries}`,
      '-of', 'default=nw=1:nk=1',
      file,
    ]).split('\n');
  } catch {
    return [];
  }
};

const imageSize = (file) => {
  try {
    const out = run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file]);
    const w = +(out.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
    const h = +(out.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0);
    return { w, h };
  } catch {
    return { w: 0, h: 0 };
  }
};

/** Pick the final name, ignoring a collision with the source itself.
    macOS is case-insensitive, so IMG_7313.MP4 and img_7313.mp4 are the
    SAME file. Writing straight to the lowercased name would have ffmpeg
    read and write one file, and the archive step would then move the
    result away. So callers convert to a temp path and rename after. */
const freeName = (dir, stem, ext, self) => {
  const sameAsSelf = (p) =>
    path.resolve(p).toLowerCase() === path.resolve(self).toLowerCase();
  let name = `${stem}${ext}`;
  let n = 2;
  while (fs.existsSync(path.join(dir, name)) && !sameAsSelf(path.join(dir, name)))
    name = `${stem}-${n++}${ext}`;
  return path.join(dir, name);
};

/** Convert src -> final safely even when they differ only by case:
    write to a scratch file, move the original out, then rename. */
const convertTo = (src, final, encode) => {
  const scratch = path.join(
    path.dirname(final),
    `.tmp-${Date.now()}-${path.basename(final)}`
  );
  encode(scratch);
  archive(src);
  fs.renameSync(scratch, final);
};

let converted = 0;
let skipped = 0;
let failed = 0;

const folders = fs
  .readdirSync(MEDIA, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const folder of folders) {
  const dir = path.join(MEDIA, folder);
  const files = fs.readdirSync(dir).filter((f) => !f.startsWith('.'));

  for (const file of files) {
    try {
      processFile(dir, folder, file);
    } catch (err) {
      failed++;
      console.warn(`  SKIP   ${folder}/${file} — ${String(err.message).split('\n')[0]}`);
    }
  }
}

function processFile(dir, folder, file) {
    const src = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const stem = path.basename(file, path.extname(file));

    // ---------- images ----------
    if (IMAGE_EXT.has(ext)) {
      if (stem.endsWith('-poster')) return; // generated, leave alone
      const { w, h } = imageSize(src);
      const isJpg = ext === '.jpg' || ext === '.jpeg';
      const tooBig = Math.max(w, h) > MAX_IMAGE_PX;
      const lowerCaseOk = file === file.toLowerCase();

      if (isJpg && !tooBig && lowerCaseOk) {
        skipped++;
        return;
      }

      const out = freeName(dir, stem.toLowerCase().replace(/[^a-z0-9-_]+/g, '-'), '.jpg', src);
      convertTo(src, out, (scratch) =>
        run('sips', ['-Z', String(MAX_IMAGE_PX), '-s', 'format', 'jpeg',
                     '-s', 'formatOptions', '80', src, '--out', scratch]));
      converted++;
      console.log(`  image  ${folder}/${file} -> ${path.basename(out)}`);
      return;
    }

    // ---------- video ----------
    if (VIDEO_EXT.has(ext)) {
      const [codec, w, h] = probe(src, 'codec_name,width,height');
      const needsTranscode =
        codec !== 'h264' ||
        ext !== '.mp4' ||
        Math.max(+w, +h) > MAX_VIDEO_PX ||
        file !== file.toLowerCase();

      let finalPath = src;
      if (needsTranscode) {
        const out = freeName(dir, stem.toLowerCase().replace(/[^a-z0-9-_]+/g, '-'), '.mp4', src);
        convertTo(src, out, (scratch) =>
          run('ffmpeg', [
            '-y', '-loglevel', 'error', '-i', src,
            '-vf', `scale=w=${MAX_VIDEO_PX}:h=${MAX_VIDEO_PX}:force_original_aspect_ratio=decrease:force_divisible_by=2`,
            '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
            '-crf', '26', '-preset', 'slow',
            '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
            '-f', 'mp4', scratch,
          ]));
        finalPath = out;
        converted++;
        console.log(`  video  ${folder}/${file} -> ${path.basename(out)} (was ${codec})`);
      } else {
        skipped++;
      }

      // poster frame, so the gallery has a thumbnail before load
      const posterPath = path.join(
        dir,
        `${path.basename(finalPath, '.mp4')}-poster.jpg`
      );
      if (!fs.existsSync(posterPath)) {
        // Seek into the clip for a representative frame, but never past
        // the end. A 0.95s clip with -ss 1 makes ffmpeg write nothing and
        // still exit 0, which silently leaves the video with no poster.
        const [duration] = probe(finalPath, 'duration');
        const seconds = Number(duration);
        const at = Number.isFinite(seconds) && seconds > 0
          ? Math.min(1, seconds / 2).toFixed(2)
          : '0';

        const grab = (seek) =>
          run('ffmpeg', [
            '-y', '-loglevel', 'error',
            ...(seek ? ['-ss', seek] : []),
            '-i', finalPath,
            '-frames:v', '1', '-q:v', '3', '-update', '1',
            '-pix_fmt', 'yuvj420p', posterPath,
          ]);

        grab(at);
        // Single-frame clips (Live Photos) have nothing to seek to, so
        // any -ss lands past the end and writes no file. Retry unseeked.
        if (!fs.existsSync(posterPath)) grab(null);

        if (fs.existsSync(posterPath)) {
          console.log(`  poster ${folder}/${path.basename(posterPath)}`);
        } else {
          console.warn(`  WARN   no poster for ${folder}/${path.basename(finalPath)}`);
        }
      }
    }
}

const size = run('du', ['-sh', MEDIA]).split('\t')[0];
console.log(`\nconverted ${converted}, already fine ${skipped}, skipped ${failed}`);
console.log(`src/assets/pictures is now ${size}`);
if (converted) console.log(`originals moved to temp/originals/ (gitignored)`);
