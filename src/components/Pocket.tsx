import { useEffect, useRef, useState } from 'react';
import MiffyPeek from './MiffyPeek';
import { START_MENU_ITEMS } from '../data/startMenu';
import { asset } from '../utils/asset';
import { playClick } from '../utils/sounds';
import '../styles/Pocket.css';

/* KaylaOS Pocket: the phone layout, after Pocket PC, Microsoft's
   own take on the Win95 look for handhelds. One app fills the
   screen at a time. The bar sits on top with Start, the app's
   title, the clock and a close button. Closing an app goes back
   to the one under it, or to the Today screen. */

type PocketWindow = { id: string; title: string; content: JSX.Element; isMinimized: boolean };

type PocketProps = {
  windows: PocketWindow[];
  focusOrder: string[];
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
  onSwitch: (id: string) => void;
  onHome: () => void;
};

// Home screen apps, same set and order as the desktop icons
const APPS = [
  { id: 'readme', label: 'README', icon: 'icons/person_icon.svg' },
  { id: 'kayla_info', label: 'About Me', icon: 'icons/person_icon.svg' },
  { id: 'projects', label: 'Projects', icon: 'icons/folder.svg' },
  { id: 'pictures', label: 'Pictures', icon: 'icons/folder.svg' },
  { id: 'notes', label: 'Notes', icon: 'icons/file.svg' },
  { id: 'kayla_cv', label: 'CV', icon: 'icons/file.svg' },
  { id: 'kayla_resume', label: 'Resume', icon: 'icons/file.svg' },
  { id: 'contact', label: 'Contact', icon: 'icons/email.svg' },
  { id: 'github', label: 'GitHub', icon: 'icons/github_icon.svg' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'icons/linkedin_icon.svg' },
  { id: 'system', label: 'System', icon: 'icons/computer.svg' },
];

const clock = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
const today = () => new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

const Pocket = ({ windows, focusOrder, onOpen, onClose, onSwitch, onHome }: PocketProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(clock());
  const [miffy, setMiffy] = useState(0);
  const taps = useRef<number[]>([]);

  useEffect(() => {
    const t = setInterval(() => setTime(clock()), 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  // The visible app is the most recently focused one that isn't hidden
  const visible = windows.filter((w) => !w.isMinimized);
  const activeId = [...focusOrder].reverse().find((id) => visible.some((w) => w.id === id));
  const active = windows.find((w) => w.id === activeId);

  // Five quick taps on the clock and Miffy peeks up
  const tapClock = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 2000), now];
    if (taps.current.length >= 5) {
      taps.current = [];
      setMiffy((n) => n + 1);
    }
  };

  const pick = (fn: () => void) => {
    setMenuOpen(false);
    fn();
  };

  return (
    <div className="pocket">
      <div className="pocket-bar">
        <button
          className={`pocket-start ${menuOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            setMenuOpen((o) => !o);
          }}
          aria-label="Start"
        >
          <img src={asset('icons/computer.svg')} alt="" />
        </button>
        <span className="pocket-title">{active ? active.title : 'Today'}</span>
        <button className="pocket-clock" onClick={tapClock}>
          {time}
        </button>
        {active && (
          <button className="pocket-close" onClick={() => onClose(active.id)} aria-label="Close">
            X
          </button>
        )}
      </div>

      {menuOpen && (
        <div className="pocket-menu" onClick={(e) => e.stopPropagation()}>
          <button className="pocket-menu-item" onClick={() => pick(onHome)}>
            <img src={asset('icons/computer.svg')} alt="" />
            Today
          </button>
          {windows.length > 0 && (
            <>
              <div className="pocket-menu-head">Open</div>
              {windows.map((w) => (
                <div key={w.id} className={`pocket-menu-running ${w.id === activeId ? 'current' : ''}`}>
                  <button className="pocket-menu-item" onClick={() => pick(() => onSwitch(w.id))}>
                    {w.title}
                  </button>
                  <button className="pocket-menu-x" onClick={() => onClose(w.id)} aria-label={`Close ${w.title}`}>
                    X
                  </button>
                </div>
              ))}
            </>
          )}
          <div className="pocket-menu-head">Programs</div>
          {START_MENU_ITEMS.map((item, i) =>
            item ? (
              <button key={item.id} className="pocket-menu-item" onClick={() => pick(() => onOpen(item.id))}>
                <img src={asset(item.icon)} alt="" />
                {item.label}
              </button>
            ) : (
              <div key={`sep-${i}`} className="pocket-menu-sep" />
            ),
          )}
        </div>
      )}

      <div className="pocket-screen desktop-screen">
        <MiffyPeek trigger={miffy} />

        <div className="pocket-today" hidden={!!active}>
          <div className="pocket-date">{today()}</div>
          <div className="pocket-owner">
            <img src={asset('pfp.jpeg')} alt="" />
            <div>
              <strong>Kayla McFarlane</strong>
              <span>MS Robotics, Carnegie Mellon University</span>
            </div>
          </div>
          <div className="pocket-grid">
            {APPS.map((app) => (
              <button key={app.id} className="pocket-app" onClick={() => onOpen(app.id)}>
                <img src={asset(app.icon)} alt="" />
                <span>{app.label}</span>
              </button>
            ))}
          </div>
          <div className="pocket-brand">KaylaOS Pocket</div>
        </div>

        {/* Every open app stays mounted so it keeps its scroll and
            folder position; only the active one is shown */}
        {windows.map((w) => (
          <div key={w.id} className="pocket-window content" hidden={w.id !== activeId}>
            {w.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pocket;
