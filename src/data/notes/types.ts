/* Shared types for note entries. Each note lives in its own folder
   under src/data/notes/ and default-exports one Note.

   Photos belong to the note they came from. Drop files into
   src/assets/pictures/<note-id>/ and they appear automatically —
   see src/data/photos.ts. You never list them by hand; you only
   write captions for them. */

export type Photo = {
  /** Resolved URL, produced by the glob in data/photos.ts */
  src: string;
  /** Filename on disk, used to look up its caption */
  file?: string;
  caption: string;
  alt?: string;
  /** Videos autoplay muted on loop */
  kind?: 'image' | 'video';
  /** Poster frame, from a matching <name>-poster.jpg */
  poster?: string;
};

export type NoteSection = {
  /** Optional. Leave it off for notes that should read as plain prose. */
  heading?: string;
  paragraphs: string[];
};

export type Note = {
  /** Stable id. Also the photo folder name under src/assets/pictures/ */
  id: string;
  /** Filename shown in the list, e.g. 'eth_summer_school.txt' */
  filename: string;
  title: string;
  date: string;
  /** One line shown in the file list */
  summary: string;
  tags?: string[];
  /** Hidden from the site while true */
  draft: boolean;
  sections: NoteSection[];
  /** Captions keyed by filename, e.g. { 'img_4692.jpg': 'On stage.' } */
  captions?: Record<string, string>;
  /** Filenames pinned to the front. The first one becomes the hero. */
  order?: string[];
  /** Filled in automatically from the photo folder. Do not set by hand. */
  photos?: Photo[];
  /** Files listed at the bottom of the note, opened in their own window */
  attachments?: Attachment[];
  /** YouTube video id, embedded under the photos */
  youtube?: string;
};

export type Attachment = {
  name: string;
  /** Path under public/, e.g. 'notes/<id>/essay.pdf' */
  src: string;
};

/** Videos must be .mp4 (H.264). `npm run media` handles the conversion. */
export const isVideo = (photo: Photo) =>
  photo.kind === 'video' || /\.(mp4|webm)$/i.test(photo.src);
