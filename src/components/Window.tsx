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
  onClick?: () => void;
};

function Window({ id, title, children, onClose, onMinimize, isMinimized, initialSize = { width: 500, height: 500 }, cascadeOffset = { x: 0, y: 0 }, zIndex = 0, onClick }: WindowProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState(initialSize);

  // Calculate centered position with cascade offset
  const initialPosition = {
    x: (window.innerWidth - initialSize.width) / 2 + cascadeOffset.x,
    y: (window.innerHeight - initialSize.height) / 2 + cascadeOffset.y,
  };

  const maximizeWindow = () => {
    setIsMaximized(!isMaximized);
    setSize(isMaximized ? initialSize : { width: window.innerWidth, height: window.innerHeight });
  };

  if (isMinimized) {
    return null; // Don't render the window if it's minimized
  }

  return (
    <Draggable dragHandleRef={bannerRef} disableDragging={isMaximized} initialPosition={initialPosition} zIndex={zIndex} onClick={onClick}>
      <div
        className={`window-container ${isMaximized ? 'maximized' : ''}`}
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