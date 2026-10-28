import { useEffect, useRef } from 'react';

type AutoLoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Accessible description, read by screen readers */
  label?: string;
};

/* Autoplaying, looping, muted video.

   React sets `muted` as a DOM property after the element mounts,
   but the browser decides whether autoplay is allowed before that,
   so a plain <video autoPlay muted> is often blocked and just sits
   on its poster. Forcing muted via a ref and then calling play()
   is the reliable way round it.

   play() still returns a rejected promise in some cases (low power
   mode, a user setting), so it is caught and the controls remain
   as the fallback. */
const AutoLoopVideo = ({ src, poster, className, label }: AutoLoopVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;

    const attempt = () => video.play().catch(() => {});
    attempt();

    // Safari sometimes is not ready on mount
    video.addEventListener('loadeddata', attempt, { once: true });
    return () => video.removeEventListener('loadeddata', attempt);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      aria-label={label}
      controls
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
};

export default AutoLoopVideo;
