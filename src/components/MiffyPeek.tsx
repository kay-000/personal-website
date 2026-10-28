import { useEffect, useState } from 'react';
import '../styles/MiffyPeek.css';

/* Easter egg: type "miffy" anywhere on the desktop and she peeks
   up from behind the taskbar for a moment. */
const SECRET = 'miffy';

/* Ears and head are drawn twice: stroked first, then filled on top,
   so only the outer outline shows and she reads as one shape. */
const SHAPES = (
  <>
    <ellipse cx="22" cy="17" rx="6.2" ry="15.5" />
    <ellipse cx="38" cy="17" rx="6.2" ry="15.5" />
    <ellipse cx="30" cy="44" rx="23" ry="18" />
  </>
);

/* `trigger` lets a parent summon her without a keyboard: each
   time it goes up she peeks. Pocket uses it for clock taps. */
const MiffyPeek = ({ trigger = 0 }: { trigger?: number }) => {
  const [peeking, setPeeking] = useState(false);

  useEffect(() => {
    if (trigger > 0) setPeeking(true);
  }, [trigger]);

  useEffect(() => {
    let typed = '';
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) setPeeking(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!peeking) return;
    const t = setTimeout(() => setPeeking(false), 3500);
    return () => clearTimeout(t);
  }, [peeking]);

  return (
    <div className={`miffy-peek ${peeking ? 'up' : ''}`} aria-hidden="true">
      <span className="miffy-hi">hi!</span>
      <svg viewBox="0 0 60 64" width="72" height="77">
        <g fill="#fff" stroke="#24141c" strokeWidth="2.6">{SHAPES}</g>
        <g fill="#fff">{SHAPES}</g>
        <g fill="#24141c">
          <ellipse cx="19.5" cy="43" rx="1.7" ry="2.3" />
          <ellipse cx="40.5" cy="43" rx="1.7" ry="2.3" />
        </g>
        <path
          d="M27.6 48.6 L32.4 53.4 M32.4 48.6 L27.6 53.4"
          stroke="#24141c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default MiffyPeek;
