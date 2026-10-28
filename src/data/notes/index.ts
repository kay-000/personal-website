/* ============================================================
   Notes — trip reports and field notes.

   These are deliberately NOT "blog posts". They're dated
   accounts of things that happened, which means there's no
   cadence to fall behind on and they don't go stale.

   PHOTOS ARE AUTOMATIC
   --------------------
   Drop files into src/assets/pictures/<note-id>/ and run
   `npm run media`. They attach to the matching note by themselves,
   videos first (so a video becomes the hero and loops).

   You never list photos. You only caption them, via the note's
   `captions` map keyed by filename:

       captions: { 'img_4692.jpg': 'Presenting the benchmark.' }

   A folder binds to whatever owns its id — a note OR a project.
   src/assets/pictures/infernot/ belongs to the INFERNOT project,
   so it renders there, not here. Only a folder matching neither
   gets a stub note generated, so photos are never orphaned.

   TO ADD A NOTE BY HAND
   ---------------------
   1. Create src/data/notes/<note-id>/index.ts
   2. Default-export a Note (copy any existing one as a template)
   3. Import it below and add it to WRITTEN

   Order in NOTES is the order shown in the file list — newest
   first. `draft: true` hides a note from the site entirely.
   ============================================================ */

import { attachPhotos, PHOTO_FOLDERS } from '../photos';
import { PROJECT_IDS } from '../projects';
import type { Note } from './types';

import iros2026 from './iros-2026';
import roscon2026 from './roscon-2026';
import fziKit2026 from './fzi-kit-2026';
import jensen2026 from './jensen-2026';
import sii2026 from './sii-2026';
import mpowerhouse from './mpowerhouse';
import pairMentor from './pair-mentor';
import ralesFellowship from './rales-fellowship';
import ralesInauguration from './rales-inauguration';
import ethRss2025 from './eth-rss-2025';
import sweOutreach from './swe-outreach';
import suffolkScholarship from './suffolk-scholarship';

export type { Note, NoteSection, Photo, Attachment } from './types';
export { isVideo } from './types';

const WRITTEN: Note[] = [
  iros2026,
  roscon2026,
  fziKit2026,
  jensen2026,
  sii2026,
  mpowerhouse,
  pairMentor,
  ralesInauguration,
  ralesFellowship,
  ethRss2025,
  sweOutreach,
  suffolkScholarship,
];

/** 'fzi-kit-2026' -> 'Fzi Kit 2026', good enough for a stub title */
const titleFromFolder = (folder: string) =>
  folder
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/** A photo folder with no note file still deserves somewhere to live. */
const stubNote = (folder: string): Note => ({
  id: folder,
  filename: `${folder.replace(/-/g, '_')}.txt`,
  title: titleFromFolder(folder),
  date: '[date]',
  summary: `[Auto-generated from src/assets/pictures/${folder}/. Write this one up.]`,
  draft: false,
  sections: [
    {
      paragraphs: [
        `[Generated because src/assets/pictures/${folder}/ has photos but nothing owns that id. Either create src/data/notes/${folder}/index.ts and add it to the WRITTEN list, or rename the folder to match an existing project id.]`,
      ],
    },
  ],
});

const written = new Set(WRITTEN.map((n) => n.id));
const owned = new Set([...written, ...PROJECT_IDS]);

/* Only folders that belong to nothing at all become stub notes.
   A folder whose id matches a project renders on that project. */
const orphanFolders = PHOTO_FOLDERS.filter((f) => !owned.has(f));
const generated = orphanFolders.map(stubNote);

/** Attach discovered photos, honoring the note's order and captions. */
const withPhotos = (note: Note): Note => ({
  ...note,
  photos: attachPhotos(note.id, { captions: note.captions, order: note.order }),
});

export const NOTES: Note[] = [...WRITTEN, ...generated].map(withPhotos);

export const PUBLISHED_NOTES = NOTES.filter((n) => !n.draft);

/** Lookup used by timeline rows to deep-link a note. */
export const NOTES_BY_ID: Record<string, Note> = Object.fromEntries(
  PUBLISHED_NOTES.map((n) => [n.id, n])
);
