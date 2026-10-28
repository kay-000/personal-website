import { NOTES_BY_ID, isVideo, type Photo } from '../data/notes';
import { PROJECT_TREE, findItemById } from '../data/projects';
import type { TimelineLink } from '../data/timeline';

/** A still for a photo: the poster frame for videos, the image itself otherwise. */
export const stillFor = (photo?: Photo): string | undefined =>
  photo ? (isVideo(photo) ? photo.poster : photo.src) : undefined;

/** First photo of whatever a timeline row links to, if it has one. */
export const thumbForLink = (link?: TimelineLink): string | undefined => {
  if (!link) return undefined;
  if (link.kind === 'note' || link.kind === 'album') return stillFor(NOTES_BY_ID[link.id]?.photos?.[0]);
  if (link.kind === 'project') return stillFor(findItemById(PROJECT_TREE, link.id)?.photos?.[0]);
  return undefined;
};
