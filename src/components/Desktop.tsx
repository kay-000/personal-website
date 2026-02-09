import { useState, useEffect } from 'react';
import Window from './Window.tsx';
import Icon from './Icon.tsx';
import ContactForm from './ContactForm.tsx';
import LinkedInProfile from './LinkedInProfile.tsx';
import Projects from './Projects.tsx';
import PDFViewer from './PDFViewer';
import DemoViewer from './DemoViewer';
import MyInfo from './MyInfo';
import SystemProperties from './SystemProperties';
import Screensaver from './Screensaver'; 
  // import RobotScreensaver from './RobotScreensaver';                                                                           
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

const getWindowConfigs = (onOpenFile?: OpenFileHandler, onOpenDemo?: OpenFileHandler): Record<string, WindowConfig> => ({
  kayla_info: { id: 'kayla_info', title: 'Kayla_info.txt', getContent: () => <MyInfo /> },
  kayla_resume: { id: 'kayla_resume', title: 'Kayla_McFarlane_Resume.pdf', getContent: () => <PDFViewer src="/Kayla_McFarlane_Resume.pdf" /> },
  kayla_cv: { id: 'kayla_cv', title: 'Kayla_McFarlane_CV.pdf', getContent: () => <PDFViewer src="/Kayla_McFarlane_CV.pdf" /> },
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
        const configs = getWindowConfigs(handleOpenFile, handleOpenDemo);
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
        if (src && !getWindowConfigs(handleOpenFile, handleOpenDemo)[w.id]) {
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
    setWindows(windows.filter(window => window.id !== id));
    setFocusOrder(prev => prev.filter(wid => wid !== id));
  };

  const minimizeWindow = (id: string) => {
    playMinimize();
    setWindows(windows.map(window =>
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const restoreWindow = (id: string) => {
    playWindowOpen();
    setWindows(windows.map(window =>
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
    const existingWindow = windows.find(w => w.id === id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        restoreWindow(id);
      }
    } else {
      playWindowOpen();
      // Calculate cascade offset based on number of existing windows (30px down and right for each)
      const cascadeStep = 30;
      const cascadeOffset = {
        x: windows.length * cascadeStep,
        y: windows.length * cascadeStep,
      };
      setWindows([...windows, { id, title, content, isMinimized: false, initialSize, cascadeOffset }]);
      // Add to focus order
      setFocusOrder(prev => [...prev, id]);
    }
  };

  const handleIconClick = (id: string) => {
    playClick();
    switch (id) {
      case 'kayla_info':
        openWindow('kayla_info', 'Kayla_info.txt', <MyInfo/>);
        break;
      case 'kayla_resume':
          openWindow(
            'kayla_resume',
            'Kayla_McFarlane_Resume.pdf',
            <PDFViewer src="/Kayla_McFarlane_Resume.pdf" />
          );
          break;
      case 'kayla_cv':
        openWindow(
          'kayla_cv',
          'Kayla_McFarlane_CV.pdf',
          <PDFViewer src="/Kayla_McFarlane_CV.pdf" />
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
        <div className="corner-icon">
          <Icon name="System" icon="icons/computer.svg" onClick={() => handleIconClick('system')} />
        </div>
        <div className="desktop-icons">
            <Icon name="Kayla_info.txt" icon="icons/person_icon.svg" onClick={() => handleIconClick('kayla_info')} />
            <Icon name="Kayla_McFarlane_Resume.pdf" icon="icons/file.svg" onClick={() => handleIconClick('kayla_resume')} />
            <Icon name="Kayla_McFarlane_CV.pdf" icon="icons/file.svg" onClick={() => handleIconClick('kayla_cv')} />

            <Icon name="Projects" icon="icons/folder.svg" onClick={() => handleIconClick('projects')} />
            <Icon name="Contact" icon="icons/email.svg" onClick={() => handleIconClick('contact')} />
            <Icon name="GitHub" icon="icons/github_icon.svg" onClick={() => handleIconClick('github')} />
            <Icon name="LinkedIn" icon="icons/linkedin_icon.svg" onClick={() => handleIconClick('linkedin')} />
           

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
              zIndex={focusOrder.indexOf(window.id)}
              onClick={() => bringToFront(window.id)}
            >
              {window.content}
            </Window>
          )
        ))}
      </div>
      <Bar windows={windows} restoreWindow={restoreWindow} setWindows={setWindows} bringToFront={bringToFront} />
    </>
  );
}

type BarProps = {
  windows: WindowState[];
  restoreWindow: (id: string) => void;
  setWindows: React.Dispatch<React.SetStateAction<WindowState[]>>;
  bringToFront: (id: string) => void;
};

function Bar({ windows, restoreWindow, bringToFront }: BarProps) {
  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleWindowClick = (id: string) => {
    playClick();
    restoreWindow(id);
    bringToFront(id);
  };

  return (
    <div className="desktop-bar">
      {/* Removed add window button - not needed in production */}
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