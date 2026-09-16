import { useState, useEffect, useRef } from 'react';
import Window from './Window.tsx';
import Icon from './Icon.tsx';
import ContactForm from './ContactForm.tsx';
// import LinkedInProfile from './LinkedInProfile.tsx';
import Projects from './Projects.tsx';
import PDFViewer from './PDFViewer';
import DemoViewer from './DemoViewer';
import MyInfo from './MyInfo';
import Pictures from './Pictures';
import Notes from './Notes';
import NoteDocument from './NoteDocument';
import SystemProperties from './SystemProperties';
import Screensaver from './Screensaver'; 
  // import RobotScreensaver from './RobotScreensaver';                                                                           
import type { TimelineLink } from '../data/timeline';
import { NOTES_BY_ID } from '../data/notes';
import type { PhotoOwner } from '../data/gallery';
import { asset } from '../utils/asset';
import { playStartup, playWindowOpen, playWindowClose, playMinimize, playClick, resumeAudio } from '../utils/sounds';

import '../styles/Desktop.css';
import '../styles/Icon.css';


type WindowState = {
  id: string;
  title: string;
  content: JSX.Element;
  isMinimized: boolean;
  initialSize?: { width: number; height: number };
  cascadeOffset?: { x: number; y: number };
};

// Window config for recreating windows from sessionStorage
type WindowConfig = {
  id: string;
  title: string;
  getContent: () => JSX.Element;
  initialSize?: { width: number; height: number };
};

type OpenFileHandler = (id: string, title: string, src: string) => void;
type OpenWindowHandler = (id: string) => void;
type NavigateHandler = (link: TimelineLink) => void;

const getWindowConfigs = (
  onOpenFile?: OpenFileHandler,
  onOpenDemo?: OpenFileHandler,
  onNavigate?: NavigateHandler,
  onOpenNote?: OpenWindowHandler,
  onOpenOwner?: (owner: PhotoOwner) => void,
): Record<string, WindowConfig> => ({
  kayla_info: { id: 'kayla_info', title: 'Kayla_info.txt', getContent: () => <MyInfo onNavigate={onNavigate} /> },
  pictures: { id: 'pictures', title: 'My Pictures', getContent: () => <Pictures onOpenOwner={onOpenOwner} />, initialSize: { width: 640, height: 540 } },
  notes: { id: 'notes', title: 'Notes', getContent: () => <Notes onOpenNote={onOpenNote} />, initialSize: { width: 620, height: 540 } },
  kayla_resume: { id: 'kayla_resume', title: 'Kayla_McFarlane_Resume.pdf', getContent: () => <PDFViewer src={asset('Kayla_McFarlane_Resume.pdf')} /> },
  kayla_cv: { id: 'kayla_cv', title: 'Kayla_McFarlane_CV.pdf', getContent: () => <PDFViewer src={asset('Kayla_McFarlane_CV.pdf')} /> },
  projects: { id: 'projects', title: 'Projects', getContent: () => <Projects onOpenFile={onOpenFile} onOpenDemo={onOpenDemo} /> },
  contact: { id: 'contact', title: 'Contact', getContent: () => <ContactForm /> },
  // linkedin: { id: 'linkedin', title: 'LinkedIn Profile', getContent: () => <LinkedInProfile />, initialSize: { width: 600, height: 500 } },
  system: { id: 'system', title: 'System Properties', getContent: () => <SystemProperties />, initialSize: { width: 400, height: 450 } },
});

const WelcomeMessage = ({ onClose }: { onClose: () => void }) => (
  <div style={{ padding: '20px', textAlign: 'center'}} onClick={onClose}>
    <h2 style={{ marginBottom: '15px' }}>Welcome to KaylaOS!</h2>
    <p style={{ marginBottom: '10px' }}>Thanks for stopping by my corner of the internet.</p>
    <p style={{ marginBottom: '10px' }}>Feel free to click around and explore!</p>
    <p style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
      Tip: Click on the desktop icons to open windows.
    </p>
    <p style={{ fontSize: '12px', color: '#999', marginTop: '10px', fontStyle: 'italic' }}>
      (Click anywhere to close this message)
    </p>
  </div>
);

function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusOrder, setFocusOrder] = useState<string[]>([]);
  const [hasInteracted, setHasInteracted] = useState(() => {
    return sessionStorage.getItem('hasPlayedStartup') === 'true';
  });
  const [welcomeShown, setWelcomeShown] = useState(() => {
    return sessionStorage.getItem('hasSeenWelcome') === 'true';
  });

  /* Window content is stored as a JSX element created once, at open
     time, so the handlers inside it capture whatever `windows` was
     back then. Reading that stale array and passing it to setWindows
     wipes every window opened since. Every mutation below therefore
     uses the functional updater form, and reads go through this ref. */
  const windowsRef = useRef<WindowState[]>([]);
  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  // Play startup sound on first interaction (browser requires user gesture for audio)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        resumeAudio();
        playStartup();
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [hasInteracted]);

  // Handler for opening files from Projects
  const handleOpenFile = (id: string, title: string, src: string) => {
    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === id);
      if (existingWindow) {
        if (existingWindow.isMinimized) {
          return prev.map(w => w.id === id ? { ...w, isMinimized: false } : w);
        }
        return prev;
      } else {
        playWindowOpen();
        const cascadeStep = 30;
        const cascadeOffset = { x: prev.length * cascadeStep, y: prev.length * cascadeStep };
        const content = <PDFViewer src={src} />;
        return [...prev, { id, title, content, isMinimized: false, cascadeOffset }];
      }
    });
    setFocusOrder(prev => [...prev.filter(wid => wid !== id), id]);
  };

  // Handler for opening demos from Projects
  const handleOpenDemo = (id: string, title: string, src: string) => {
    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === id);
      if (existingWindow) {
        if (existingWindow.isMinimized) {
          return prev.map(w => w.id === id ? { ...w, isMinimized: false } : w);
        }
        return prev;
      } else {
        playWindowOpen();
        const cascadeStep = 30;
        const cascadeOffset = { x: prev.length * cascadeStep, y: prev.length * cascadeStep };
        const content = <DemoViewer src={src} />;
        return [...prev, { id, title, content, isMinimized: false, initialSize: { width: 800, height: 600 }, cascadeOffset }];
      }
    });
    setFocusOrder(prev => [...prev.filter(wid => wid !== id), id]);
  };

  // Notes open as their own windows, the way Notepad opened one
  // window per document. The Notes window itself is just the browser.
  const handleOpenNote = (noteId: string) => {
    const note = NOTES_BY_ID[noteId];
    openWindow(
      `note-${noteId}`,
      note?.filename ?? 'Note',
      <NoteDocument noteId={noteId} onOpenFile={handleOpenFile} />,
      { width: 600, height: 520 },
    );
  };

  // A photo in My Pictures belongs to a note or a project
  const handleOpenOwner = (owner: PhotoOwner) => {
    if (owner.kind === 'project') handleOpenProject(owner.id);
    else handleOpenNote(owner.id);
  };

  // Deep link into the Projects tree
  const handleOpenProject = (projectId: string) => {
    openOrReplaceWindow(
      'projects',
      'Projects',
      <Projects key={projectId} initialItemId={projectId} onOpenFile={handleOpenFile} onOpenDemo={handleOpenDemo} />,
    );
  };


  // Timeline rows: research/projects go to the Projects folder,
  // everything else opens its write-up in Notes.
  const handleNavigate = (link: TimelineLink) => {
    switch (link.kind) {
      case 'note':
        handleOpenNote(link.id);
        break;
      case 'album':
        // Albums are gone; photos live in their note
        handleOpenNote(link.id);
        break;
      case 'project':
        handleOpenProject(link.id);
        break;
      case 'window':
      default:
        handleIconClick(link.id);
        break;
    }
  };

  // Load saved windows on mount, or show welcome if first visit
  useEffect(() => {
    const saved = sessionStorage.getItem('openWindows');
    if (saved) {
      try {
        const savedData: {
          ids: string[];
          minimized: Record<string, boolean>;
          fileWindows?: Record<string, { title: string; src: string; isDemo?: boolean }>;
        } = JSON.parse(saved);
        const configs = getWindowConfigs(handleOpenFile, handleOpenDemo, handleNavigate, handleOpenNote, handleOpenOwner);
        const restoredWindows: WindowState[] = [];

        savedData.ids.forEach((id, index) => {
          const config = configs[id];
          if (config) {
            // Restore predefined window
            restoredWindows.push({
              id: config.id,
              title: config.title,
              content: config.getContent(),
              isMinimized: savedData.minimized[id] || false,
              initialSize: config.initialSize,
              cascadeOffset: { x: index * 30, y: index * 30 },
            });
          } else if (id.startsWith('note-')) {
            // Note document windows aren't in getWindowConfigs — rebuild by id
            const noteId = id.slice('note-'.length);
            const note = NOTES_BY_ID[noteId];
            if (note) {
              restoredWindows.push({
                id,
                title: note.filename,
                content: <NoteDocument noteId={noteId} onOpenFile={handleOpenFile} />,
                isMinimized: savedData.minimized[id] || false,
                cascadeOffset: { x: index * 30, y: index * 30 },
              });
            }
          } else if (savedData.fileWindows?.[id]) {
            // Restore dynamic file window (PDF from Projects)
            const fileInfo = savedData.fileWindows[id];
            restoredWindows.push({
              id,
              title: fileInfo.title,
              content: <PDFViewer src={fileInfo.src} />,
              isMinimized: savedData.minimized[id] || false,
              cascadeOffset: { x: index * 30, y: index * 30 },
            });
          }
        });

        if (restoredWindows.length > 0) {
          setWindows(restoredWindows);
          setFocusOrder(savedData.ids.filter(id => restoredWindows.some(w => w.id === id)));
        }
      } catch (e) {
        // Invalid saved data, ignore
      }
    }

    // Show welcome only on first visit ever
    if (!welcomeShown) {
      const welcomeContent = <WelcomeMessage onClose={() => closeWelcome()} />;
      setWindows(prev => [{ id: 'welcome', title: "Welcome!", content: welcomeContent, isMinimized: false, cascadeOffset: { x: 100, y: 50 } }, ...prev]);
      setFocusOrder(prev => ['welcome', ...prev]);
      sessionStorage.setItem('hasSeenWelcome', 'true');
      setWelcomeShown(true);
    }
  }, []);

  // Save windows to sessionStorage whenever they change
  useEffect(() => {
    const windowsToSave = windows.filter(w => w.id !== 'welcome');

    if (windowsToSave.length > 0) {
      const ids = windowsToSave.map(w => w.id);
      const minimized: Record<string, boolean> = {};
      const fileWindows: Record<string, { title: string; src: string, isDemo: boolean }> = {};

      windowsToSave.forEach(w => {
        minimized[w.id] = w.isMinimized;
        // Save file info for dynamic windows (PDFs/demos opened from Projects)
        const src = w.content?.props?.src;
        if (src && !getWindowConfigs(handleOpenFile, handleOpenDemo, handleNavigate, handleOpenNote, handleOpenOwner)[w.id]) {
          // Check if it's a demo window (ends with -demo) or file window
          const isDemo = w.id.endsWith('-demo');
          fileWindows[w.id] = { title: w.title, src, isDemo};
        }
      });

      sessionStorage.setItem('openWindows', JSON.stringify({ ids, minimized, fileWindows }));
    } else {
      sessionStorage.removeItem('openWindows');
    }
  }, [windows]);

  const closeWelcome = () => {
    playWindowClose();
    setWindows(prev => prev.filter(window => window.id !== 'welcome'));
    setFocusOrder(prev => prev.filter(wid => wid !== 'welcome'));
  };

  const closeWindow = (id: string) => {
    playWindowClose();
    setWindows(prev => prev.filter(window => window.id !== id));
    setFocusOrder(prev => prev.filter(wid => wid !== id));
  };

  const minimizeWindow = (id: string) => {
    playMinimize();
    setWindows(prev => prev.map(window =>
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const restoreWindow = (id: string) => {
    playWindowOpen();
    setWindows(prev => prev.map(window =>
      window.id === id ? { ...window, isMinimized: false } : window
    ));
    // Bring to front when restored
    bringToFront(id);
  };

  const bringToFront = (id: string) => {
    // Remove id from current position and add to end (highest z-index)
    setFocusOrder(prev => [...prev.filter(wid => wid !== id), id]);
  };

  const openWindow = (id: string, title: string, content: JSX.Element, initialSize?: { width: number; height: number }) => {
    const existingWindow = windowsRef.current.find(w => w.id === id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        restoreWindow(id);
      } else {
        // Already open — surface it instead of silently doing nothing
        bringToFront(id);
      }
      return;
    }

    playWindowOpen();
    setWindows(prev => {
      // Re-check inside the updater; prev is always current
      if (prev.some(w => w.id === id)) return prev;
      // Cascade 30px down and right for each window already open
      const cascadeStep = 30;
      const cascadeOffset = {
        x: prev.length * cascadeStep,
        y: prev.length * cascadeStep,
      };
      return [...prev, { id, title, content, isMinimized: false, initialSize, cascadeOffset }];
    });
    setFocusOrder(prev => [...prev.filter(wid => wid !== id), id]);
  };

  // Like openWindow, but swaps the content of an already-open window
  // instead of no-oping. Deep links (note X, album Y) need this —
  // otherwise clicking a second note while Notes is open does nothing.
  const openOrReplaceWindow = (id: string, title: string, content: JSX.Element, initialSize?: { width: number; height: number }) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        return prev.map(w => w.id === id ? { ...w, content, isMinimized: false } : w);
      }
      playWindowOpen();
      const cascadeStep = 30;
      const cascadeOffset = { x: prev.length * cascadeStep, y: prev.length * cascadeStep };
      return [...prev, { id, title, content, isMinimized: false, initialSize, cascadeOffset }];
    });
    setFocusOrder(prev => [...prev.filter(wid => wid !== id), id]);
  };

  const handleIconClick = (id: string) => {
    playClick();
    switch (id) {
      case 'kayla_info':
        openWindow('kayla_info', 'Kayla_info.txt', <MyInfo onNavigate={handleNavigate} />);
        break;
      case 'pictures':
        openWindow('pictures', 'My Pictures', <Pictures onOpenOwner={handleOpenOwner} />, { width: 640, height: 540 });
        break;
      case 'notes':
        openWindow('notes', 'Notes', <Notes onOpenNote={handleOpenNote} />, { width: 620, height: 540 });
        break;
      case 'kayla_resume':
          openWindow(
            'kayla_resume',
            'Kayla_McFarlane_Resume.pdf',
            <PDFViewer src={asset('Kayla_McFarlane_Resume.pdf')} />
          );
          break;
      case 'kayla_cv':
        openWindow(
          'kayla_cv',
          'Kayla_McFarlane_CV.pdf',
          <PDFViewer src={asset('Kayla_McFarlane_CV.pdf')} />
        );
        break;
      case 'projects':
        openWindow('projects', 'Projects', <Projects onOpenFile={handleOpenFile} onOpenDemo={handleOpenDemo} />);
        break;
      case 'contact':
        openWindow('contact', 'Contact', <ContactForm />);
        break;
      case 'github':
        window.open('https://github.com/kay-000', '_blank');
        break;
      case 'linkedin':
        // openWindow('linkedin', 'LinkedIn Profile', <LinkedInProfile />, { width: 600, height: 500 });
        window.open('http://www.linkedin.com/in/kayla-mcfarlane28', '_blank');
        break;
      case 'system':
        openWindow('system', 'System Properties', <SystemProperties />, { width: 400, height: 450 });
        break;
    }
  };


  return (
    <>
      <Screensaver idleTimeout={300000} /> {/* 5 mins == 300000 ms */} 
      {/* <RobotScreensaver idleTimeout={5000} />  {/* short timeout for testing */}                                               
      <div className="desktop-screen">
        <div className="desktop-brand">
          <div className="brand-name">KaylaOS</div>
          <div className="brand-tag">Robotics @ CMU</div>
        </div>
        <div className="corner-icon">
          <Icon name="System" icon={asset("icons/computer.svg")} onClick={() => handleIconClick('system')} />
        </div>
        <div className="desktop-icons">
            <Icon name="Kayla_info.txt" icon={asset("icons/person_icon.svg")} onClick={() => handleIconClick('kayla_info')} />
            <Icon name="Kayla_McFarlane_Resume.pdf" icon={asset("icons/file.svg")} onClick={() => handleIconClick('kayla_resume')} />
            <Icon name="Kayla_McFarlane_CV.pdf" icon={asset("icons/file.svg")} onClick={() => handleIconClick('kayla_cv')} />

            <Icon name="Projects" icon={asset("icons/folder.svg")} onClick={() => handleIconClick('projects')} />
            <Icon name="My Pictures" icon={asset("icons/folder.svg")} onClick={() => handleIconClick('pictures')} />
            <Icon name="Notes" icon={asset("icons/file.svg")} onClick={() => handleIconClick('notes')} />
            <Icon name="Contact" icon={asset("icons/email.svg")} onClick={() => handleIconClick('contact')} />
            <Icon name="GitHub" icon={asset("icons/github_icon.svg")} onClick={() => handleIconClick('github')} />
            <Icon name="LinkedIn" icon={asset("icons/linkedin_icon.svg")} onClick={() => handleIconClick('linkedin')} />
           

        </div>
        {windows.map((window) => (
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              isMinimized={window.isMinimized}
              initialSize={window.initialSize}
              cascadeOffset={window.cascadeOffset}
              zIndex={focusOrder.indexOf(window.id) + 10}
              isActive={focusOrder[focusOrder.length - 1] === window.id}
              onClick={() => bringToFront(window.id)}
            >
              {window.content}
            </Window>
          )
        ))}
      </div>
      <Bar windows={windows} restoreWindow={restoreWindow} setWindows={setWindows} bringToFront={bringToFront} onMenuSelect={handleIconClick} />
    </>
  );
}

type BarProps = {
  windows: WindowState[];
  restoreWindow: (id: string) => void;
  setWindows: React.Dispatch<React.SetStateAction<WindowState[]>>;
  bringToFront: (id: string) => void;
  onMenuSelect: (id: string) => void;
};

// Start menu contents. `null` renders a separator.
const START_MENU_ITEMS: ({ id: string; label: string; icon: string } | null)[] = [
  { id: 'kayla_info', label: 'About Me', icon: 'icons/person_icon.svg' },
  { id: 'projects', label: 'Projects', icon: 'icons/folder.svg' },
  { id: 'pictures', label: 'My Pictures', icon: 'icons/folder.svg' },
  { id: 'notes', label: 'Notes', icon: 'icons/file.svg' },
  { id: 'kayla_resume', label: 'Resume', icon: 'icons/file.svg' },
  { id: 'kayla_cv', label: 'CV', icon: 'icons/file.svg' },
  null,
  { id: 'contact', label: 'Contact', icon: 'icons/email.svg' },
  { id: 'github', label: 'GitHub', icon: 'icons/github_icon.svg' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'icons/linkedin_icon.svg' },
  null,
  { id: 'system', label: 'System Properties', icon: 'icons/computer.svg' },
];

function Bar({ windows, restoreWindow, bringToFront, onMenuSelect }: BarProps) {
  const [currentTime, setCurrentTime] = useState(getTime());
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Any click outside the menu dismisses it, like the real Start menu
  useEffect(() => {
    if (!startOpen) return;
    const close = () => setStartOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [startOpen]);

  const handleWindowClick = (id: string) => {
    playClick();
    restoreWindow(id);
    bringToFront(id);
  };

  const handleMenuSelect = (id: string) => {
    setStartOpen(false);
    onMenuSelect(id);
  };

  return (
    <div className="desktop-bar">
      <button
        className={`start-button ${startOpen ? 'open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          playClick();
          setStartOpen((open) => !open);
        }}
      >
        <img src={asset("icons/computer.svg")} alt="" />
        Start
      </button>

      {startOpen && (
        <div className="start-menu" onClick={(e) => e.stopPropagation()}>
          <div className="start-menu-rail">
            <span>KaylaOS</span>
          </div>
          <div className="start-menu-items">
            {START_MENU_ITEMS.map((item, i) =>
              item ? (
                <button
                  key={item.id}
                  className="start-menu-item"
                  onClick={() => handleMenuSelect(item.id)}
                >
                  <img src={asset(item.icon)} alt="" />
                  {item.label}
                </button>
              ) : (
                <div key={`sep-${i}`} className="start-menu-separator" />
              )
            )}
          </div>
        </div>
      )}

      {windows.map((window) => (
        <div key={window.id} className={`window-title ${window.isMinimized ? 'minimized' : ''}`} onClick={() => handleWindowClick(window.id)}>
          {window.title}
        </div>
      ))}

      <div className="time-block">{currentTime}</div>
    </div>
  );
}

function getTime() {
  const date = new Date();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return time;
}

export default Desktop;