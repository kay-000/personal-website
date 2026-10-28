import { useEffect, useState } from 'react';
import '../styles/BootScreen.css';

/* A plain BIOS power-on self test before the login screen.
   Any key or click skips it. */
const POST_LINES: [string, string][] = [
  ['CPU: KaylaCore R9', 'OK'],
  ['Memory test: 32768 MB', 'OK'],
  ['Detecting drives: Projects, Notes, Pictures', 'OK'],
  ['Loading robot drivers', 'OK'],
  ['miffy.sys', 'OK'],
];

const LINE_MS = 900;

const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown > POST_LINES.length) {
      const t = setTimeout(onDone, 1800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), LINE_MS);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [onDone]);

  return (
    <div className="boot-screen" onClick={onDone}>
      <div className="boot-header">
        <span>KaylaOS BIOS v2.6</span>
        <span>(C) 2026 Kayla McFarlane</span>
      </div>
      <p className="boot-dim">Running power-on self test...</p>
      <ul className="boot-lines">
        {POST_LINES.slice(0, shown).map(([label, status]) => (
          <li key={label}>
            <span className="boot-label">{label}</span>
            <span className="boot-fill" aria-hidden="true" />
            <span className="boot-ok">[ {status} ]</span>
          </li>
        ))}
      </ul>
      {shown > POST_LINES.length && <p className="boot-ready">Starting KaylaOS...</p>}
      <p className="boot-skip">Press any key to skip</p>
    </div>
  );
};

export default BootScreen;
