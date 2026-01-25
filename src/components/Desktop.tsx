import { useState, useEffect } from 'react';
import Window from './Window.tsx';
import Icon from './Icon.tsx';
import ContactForm from './ContactForm.tsx';
import LinkedInProfile from './LinkedInProfile.tsx';
import Projects from './Projects.tsx';
import PDFViewer from './PDFViewer';
import MyInfo from './MyInfo';
import SystemProperties from './SystemProperties';
import Screensaver from './Screensaver';
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

const WelcomeMessage = ({ onClose }: { onClose: () => void }) => (
  <div style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={onClose}>
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);

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

  // Show welcome window on mount
  useEffect(() => {
    if (!welcomeShown) {
      const welcomeContent = <WelcomeMessage onClose={() => closeWelcome()} />;
      setWindows([{ id: 'welcome', title: "Welcome!", content: welcomeContent, isMinimized: false, cascadeOffset: { x: 100, y: 50 } }]);
      setFocusOrder(['welcome']);
      setWelcomeShown(true);
    }
  }, []);

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
        openWindow('projects', 'Projects', <Projects />);
        break;
      case 'contact':
        openWindow('contact', 'Contact', <ContactForm />);
        break;
      case 'github':
        window.open('https://github.com/kay-000', '_blank');
        break;
      case 'linkedin':
        openWindow('linkedin', 'LinkedIn Profile', <LinkedInProfile />, { width: 600, height: 500 });
        break;
      case 'system':
        openWindow('system', 'System Properties', <SystemProperties />, { width: 400, height: 450 });
        break;
    }
  };


  return (
    <>
      <Screensaver idleTimeout={60000} />
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

function Bar({ windows, restoreWindow, setWindows, bringToFront }: BarProps) {
  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // const addWindow = () => {
  //   const newWindow: WindowState = {
  //     id: Date.now().toString(),
  //     title: `New Window ${windows.length + 1}`,
  //     content: <p>New Window</p>,
  //     isMinimized: false,
  //   };
  //   setWindows([...windows, newWindow]);
  // };

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