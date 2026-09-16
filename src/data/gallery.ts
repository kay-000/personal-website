/* ============================================================
   The site-wide photo gallery.

   A photo folder binds to whatever owns its id — a note OR a
   project. src/assets/pictures/infernot/ belongs to the INFERNOT
   project; src/assets/pictures/jensen-2026/ belongs to the Jensen
   note. Each photo carries its owner so My Pictures can offer the
   right way back.
   ============================================================ */

import { PUBLISHED_NOTES } from './notes';
import { PROJECT_TREE, type FolderItem } from './projects';
import type { Photo } from './notes/types';

export type PhotoOwner = {
  kind: 'note' | 'project';
  id: string;
  title: string;
};

export type GalleryPhoto = Photo & { owner: PhotoOwner };

const fromNotes: GalleryPhoto[] = PUBLISHED_NOTES.flatMap((note) =>
  (note.photos ?? []).map((photo) => ({
    ...photo,
    owner: { kind: 'note' as const, id: note.id, title: note.title },
  }))
);

const walk = (items: FolderItem[]): GalleryPhoto[] =>
  items.flatMap((item) => [
    ...(item.photos ?? []).map((photo) => ({
      ...photo,
      owner: { kind: 'project' as const, id: item.id, title: item.name },
    })),
    ...(item.children ? walk(item.children) : []),
  ]);

const fromProjects: GalleryPhoto[] = walk(PROJECT_TREE);

/** Every photo on the site, newest-owner first. */
export const ALL_PHOTOS: GalleryPhoto[] = [...fromNotes, ...fromProjects];
