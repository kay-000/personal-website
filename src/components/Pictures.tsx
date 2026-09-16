import { useState } from 'react';
import { ALL_PHOTOS, type PhotoOwner } from '../data/gallery';
import { isVideo } from '../data/notes/types';
import Lightbox from './Lightbox';
import '../styles/Pictures.css';

type PicturesProps = {
  /** Opens whatever owns a photo — its note, or its project */
  onOpenOwner?: (owner: PhotoOwner) => void;
};

/* A flat contact sheet of every photo on the site. Clicking one
   enlarges it; the thing it belongs to is a link in the lightbox
   footer, so browsing never yanks you somewhere else. */
const Pictures = ({ onOpenOwner }: PicturesProps) => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="pictures">
      <p className="album-blurb">
      </p>

      {ALL_PHOTOS.length === 0 ? (
        <p className="empty-note">
          No photos yet. Drop files into{' '}
          <code>src/assets/pictures/&lt;id&gt;/</code> and run{' '}
          <code>npm run media</code>. The folder name must match a note id or a
          project id.
        </p>
      ) : (
        <div className="thumb-grid">
          {ALL_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              className="thumb"
              onClick={() => setIndex(i)}
              title={photo.caption}
            >
              <span className="thumb-frame">
                {isVideo(photo) ? (
                  <>
                    <img src={photo.poster} alt={photo.alt ?? photo.caption} />
                    <span className="thumb-play" aria-hidden="true">▶</span>
                  </>
                ) : (
                  <img src={photo.src} alt={photo.alt ?? photo.caption} />
                )}
              </span>
              <span className="thumb-caption">{photo.caption}</span>
              <span className="thumb-source">{photo.owner.title}</span>
            </button>
          ))}
        </div>
      )}

      {index !== null && (
        <Lightbox
          photos={ALL_PHOTOS}
          index={index}
          onNavigate={setIndex}
          onClose={() => setIndex(null)}
          footer={(photo) =>
            onOpenOwner ? (
              <button
                className="lightbox-source"
                onClick={() => {
                  setIndex(null);
                  onOpenOwner(photo.owner);
                }}
              >
                {photo.owner.kind === 'project' ? 'Open project' : 'Read'}:{' '}
                {photo.owner.title} →
              </button>
            ) : null
          }
        />
      )}
    </div>
  );
};

export default Pictures;
