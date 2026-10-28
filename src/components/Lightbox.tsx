import { useEffect, type ReactNode } from 'react';
import { isVideo, type Photo } from '../data/notes';
import AutoLoopVideo from './AutoLoopVideo';
import '../styles/Lightbox.css';

type LightboxProps<P extends Photo> = {
  photos: P[];
  /** Index into `photos` of the one being shown */
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
  /** Optional footer content for the current photo, e.g. a link to its note */
  footer?: (photo: P) => ReactNode;
};

/* Full-size photo view, shared by My Pictures and by notes so the
   behavior is identical in both: click a thumbnail to enlarge,
   arrows to move through the set. */
function Lightbox<P extends Photo>({
  photos,
  index,
  onNavigate,
  onClose,
  footer,
}: LightboxProps<P>) {
  const photo = photos[index];
  const count = photos.length;

  const step = (delta: number) => onNavigate((index + delta + count) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!photo) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-stage">
          {count > 1 && (
            <button
              className="lightbox-arrow prev"
              onClick={() => step(-1)}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {isVideo(photo) ? (
            <AutoLoopVideo key={photo.src} src={photo.src} poster={photo.poster} label={photo.alt ?? photo.caption} />
          ) : (
            <img key={photo.src} src={photo.src} alt={photo.alt ?? photo.caption} />
          )}

          {count > 1 && (
            <button
              className="lightbox-arrow next"
              onClick={() => step(1)}
              aria-label="Next"
            >
              ›
            </button>
          )}
        </div>

        <div className="lightbox-bar">
          <div className="lightbox-meta">
            {footer?.(photo)}
            <span className="lightbox-counter">
              {index + 1} / {count}
            </span>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
