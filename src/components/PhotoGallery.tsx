import { useState } from 'react';
import { isVideo, type Photo } from '../data/notes/types';
import AutoLoopVideo from './AutoLoopVideo';
import Lightbox from './Lightbox';
import '../styles/PhotoGallery.css';

type PhotoGalleryProps = {
  photos: Photo[];
};

/* Photos for one thing, a note or a project.

   The first photo is the hero, shown large. By DEFAULT that is a
   video, because videos sort ahead of stills automatically, so the
   usual result is a looping clip at the top.

   To override, pin a filename to the front with the owner's `order`
   array. A pinned still becomes the hero instead, and the video
   drops into the grid with a play badge. Everything else follows in
   the grid; clicking a thumbnail enlarges it rather than navigating
   away. */
const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [index, setIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const [hero, ...rest] = photos;

  return (
    <>
      <figure className="gallery-hero">
        {isVideo(hero) ? (
          <AutoLoopVideo src={hero.src} poster={hero.poster} />
        ) : (
          <button
            className="gallery-hero-image"
            onClick={() => setIndex(0)}
            title={hero.caption}
          >
            <img src={hero.src} alt={hero.alt ?? hero.caption} />
          </button>
        )}
        <figcaption>{hero.caption}</figcaption>
      </figure>

      {rest.length > 0 && (
        <div className="gallery-grid">
          {rest.map((photo, i) => (
            <button
              key={photo.src}
              className="gallery-thumb"
              onClick={() => setIndex(i + 1)}
              title={photo.caption}
            >
              <span className="gallery-thumb-frame">
                {isVideo(photo) ? (
                  <>
                    <img src={photo.poster} alt={photo.alt ?? photo.caption} />
                    <span className="thumb-play" aria-hidden="true">▶</span>
                  </>
                ) : (
                  <img src={photo.src} alt={photo.alt ?? photo.caption} />
                )}
              </span>
              <span className="gallery-thumb-caption">{photo.caption}</span>
            </button>
          ))}
        </div>
      )}

      {index !== null && (
        <Lightbox
          photos={photos}
          index={index}
          onNavigate={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
};

export default PhotoGallery;
