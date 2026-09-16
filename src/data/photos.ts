/* ============================================================
   Automatic photo discovery.

   Anything you drop into src/assets/pictures/<note-id>/ shows up
   on the site. No list to maintain, no imports to add.

       src/assets/pictures/jensen-2026/clip.mp4   -> appears
       src/assets/pictures/jensen-2026/photo.jpg  -> appears

   Rules
   -----
   - The folder name must match a note's `id`. A folder with no
     matching note gets a stub note generated for it (see
     notes/index.ts), so photos are never orphaned.
   - By default videos sort first, so a video becomes the hero and
     loops. Stills follow in natural filename order.
   - To override, list filenames in the owner's `order` array. Those
     are pinned to the front in exactly that order, and anything you
     leave out keeps the automatic behavior behind them. Pinning one
     still is enough to put a photo at the top instead of the video.
   - `<name>-poster.jpg` is the poster frame for `<name>.mp4` and
     is hidden from the gallery.
   - Captions come from the note's `captions` map, keyed by
     filename. Anything without one shows a visible reminder.

   Run `npm run media` after adding files. It converts HEIC and
   HEVC (which do not play in Chrome or Firefox), resizes anything
   oversized, and generates the poster frames.
   ============================================================ */

import type { Photo } from './notes/types';

// eager: URLs are resolved at build time, including Vite's base path
const FILES = import.meta.glob(
  '../assets/pictures/*/*.{jpg,jpeg,png,webp,gif,avif,mp4,webm}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const VIDEO_RE = /\.(mp4|webm)$/i;
const POSTER_RE = /-poster\.(jpg|jpeg|png)$/i;

type Entry = { folder: string; file: string; url: string };

const entries: Entry[] = Object.entries(FILES).flatMap(([key, url]) => {
  const match = key.match(/\/pictures\/([^/]+)\/([^/]+)$/);
  return match ? [{ folder: match[1], file: match[2], url }] : [];
});

/** Natural sort so 2 comes before 10 */
const byName = (a: Entry, b: Entry) =>
  a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: 'base' });

const toPhoto = (entry: Entry, posters: Entry[]): Photo => {
  const stem = entry.file.replace(/\.[^.]+$/, '');
  const poster = posters.find((p) => p.file.startsWith(`${stem}-poster`));
  return {
    src: entry.url,
    file: entry.file,
    caption: '',
    ...(poster ? { poster: poster.url } : {}),
    ...(VIDEO_RE.test(entry.file) ? { kind: 'video' as const } : {}),
  };
};

const folders = [...new Set(entries.map((e) => e.folder))];

/** Photos found on disk, keyed by folder name (which is the note id). */
export const PHOTOS_BY_FOLDER: Record<string, Photo[]> = Object.fromEntries(
  folders.map((folder) => {
    const own = entries.filter((e) => e.folder === folder);
    const posters = own.filter((e) => POSTER_RE.test(e.file));
    const media = own.filter((e) => !POSTER_RE.test(e.file));

    // Videos first, so one always becomes the hero and loops
    const ordered = [
      ...media.filter((e) => VIDEO_RE.test(e.file)).sort(byName),
      ...media.filter((e) => !VIDEO_RE.test(e.file)).sort(byName),
    ];
    return [folder, ordered.map((e) => toPhoto(e, posters))];
  })
).valueOf() as Record<string, Photo[]>;

export type PhotoMeta = {
  /** Captions keyed by filename */
  captions?: Record<string, string>;
  /**
   * Filenames pinned to the front, in this order. Everything not
   * listed keeps the default order behind them. The first photo in
   * the final list is the hero, so listing one still here puts that
   * photo at the top instead of the video.
   */
  order?: string[];
};

/**
 * Photos for one id, ordered and captioned. Shared by notes and
 * projects so both behave identically.
 */
export const attachPhotos = (id: string, meta: PhotoMeta = {}): Photo[] => {
  const found = PHOTOS_BY_FOLDER[id] ?? [];
  if (found.length === 0) return [];

  const pinned = (meta.order ?? [])
    .map((file) => found.find((p) => p.file === file))
    .filter((p): p is Photo => Boolean(p));

  const rest = found.filter((p) => !pinned.includes(p));

  return [...pinned, ...rest].map((photo) => ({
    ...photo,
    // An uncaptioned photo shows nothing rather than a bracketed
    // reminder. Was: `[Caption for ${photo.file}]`
    caption: (photo.file && meta.captions?.[photo.file]) || '',
  }));
};

/** Every folder that has at least one usable file. */
export const PHOTO_FOLDERS = Object.keys(PHOTOS_BY_FOLDER)
  .filter((f) => PHOTOS_BY_FOLDER[f].length > 0)
  .sort();
