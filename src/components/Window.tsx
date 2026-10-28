import React, { useState, useRef } from 'react';
import { BiWindow, BiWindowAlt } from "react-icons/bi";
import Draggable from '../utils/Draggable';
import '../styles/Windows.css';

type WindowProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  isMinimized: boolean;
  initialSize?: { width: number; height: number };
  cascadeOffset?: { x: number; y: number };
  zIndex?: number;
  isActive?: boolean;
  onClick?: () => void;
};

function Window({ id, title, children, onClose, onMinimize, isMinimized, initialSize = { width: 500, height: 500 }, cascadeOffset = { x: 0, y: 0 }, zIndex = 0, isActive = true, onClick }: WindowProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  // Never open larger than the screen, minus the 30px taskbar
  const fitted = {
    width: Math.min(initialSize.width, window.innerWidth - 16),
    height: Math.min(initialSize.height, window.innerHeight - 46),
  };
  const [size, setSize] = useState(fitted);

  // Centered with cascade offset, clamped so the title bar stays on screen
  const initialPosition = {
    x: Math.max(8, Math.min((window.innerWidth - fitted.width) / 2 + cascadeOffset.x, window.innerWidth - fitted.width - 8)),
    y: Math.max(8, Math.min((window.innerHeight - fitted.height) / 2 + cascadeOffset.y, window.innerHeight - fitted.height - 38)),
  };

  const maximizeWindow = () => {
    setIsMaximized(!isMaximized);
    setSize(isMaximized ? fitted : { width: window.innerWidth, height: window.innerHeight - 30 });
  };

  if (isMinimized) {
    return null; // Don't render the window if it's minimized
  }

  return (
    <Draggable dragHandleRef={bannerRef} disableDragging={isMaximized} initialPosition={initialPosition} zIndex={zIndex} onClick={onClick}>
      <div
        className={`window-container ${isMaximized ? 'maximized' : ''} ${isActive ? '' : 'inactive'}`}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        <div className='banner' ref={bannerRef}>
          <h3 className='title'>{title}</h3>
          <div className='window-controls'>
            <button onClick={() => onMinimize(id)}>_</button>
            <button onClick={maximizeWindow}>{isMaximized ? <BiWindowAlt /> : <BiWindow />}</button>
            <button onClick={() => onClose(id)}>X</button>
          </div>
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
    </Draggable>
  );
}

export default Window;