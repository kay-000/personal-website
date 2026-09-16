#!/usr/bin/env node
/* ============================================================
   Rewrite the Study Bearbot demo's hardcoded absolute paths so
   it works under Vite's `base`.

       npm run fix-demo

   The demo in public/projects/studybearbot/studybear_site/ is a
   prebuilt app whose bundle hardcodes root-absolute URLs like
   /projects/... and /audios/.... Served under a base like
   '/personal-website/' those all 404, so the iframe loads a blank
   page. This prefixes them with the base and points /audios/ at
   where the files actually live.

   Idempotent, and it re-normalizes whatever prefix a previous run
   left behind, so changing `base` in vite.config.ts and re-running
   is all it takes. Re-run it if you change `base` or replace the
   demo build.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const base = (
  fs.readFileSync(path.join(ROOT, 'vite.config.ts'), 'utf8')
    .match(/base:\s*['"]([^'"]+)['"]/)?.[1] ?? '/'
).replace(/\/$/, '');

const CLIENT = path.join(
  ROOT,
  'public/projects/studybearbot/studybear_site/client'
);
const PUBLIC_PREFIX = '/projects/studybearbot/studybear_site/client';

if (!fs.existsSync(CLIENT)) {
  console.error(`No demo at ${CLIENT}`);
  process.exit(1);
}

const targets = [
  path.join(CLIENT, 'index.html'),
  ...fs
    .readdirSync(path.join(CLIENT, 'assets'))
    .filter((f) => /\.(js|css)$/.test(f))
    .map((f) => path.join(CLIENT, 'assets', f)),
];

let touched = 0;

for (const file of targets) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  // Re-point every reference to the client dir at the current base,
  // whatever prefix is sitting in front of it now. This is what makes
  // a base change (project subpath <-> user site root) a one-liner.
  const prefixed = new RegExp(
    `"[^"]*?${PUBLIC_PREFIX.replace(/\//g, '\\/')}`,
    'g'
  );
  after = after.replace(prefixed, `"${base}${PUBLIC_PREFIX}`);

  // /audios/x.mp3 and /videos/x.mp4 live under the client dir, not at
  // the site root. Only bare ones are left by the pass above.
  after = after.replaceAll('"/audios/', `"${base}${PUBLIC_PREFIX}/audios/`);
  after = after.replaceAll('"/videos/', `"${base}${PUBLIC_PREFIX}/videos/`);

  if (after !== before) {
    fs.writeFileSync(file, after);
    touched++;
    console.log(`  patched ${path.relative(ROOT, file)}`);
  }
}

console.log(
  touched
    ? `\nRewrote ${touched} file(s) for base '${base || '/'}'.`
    : `\nNothing to do. Already correct for base '${base || '/'}'.`
);
