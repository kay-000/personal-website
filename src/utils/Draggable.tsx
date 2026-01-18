import React, { useState, useEffect } from 'react';

type DraggableProps = {
  children: React.ReactNode;
  dragHandleRef: React.RefObject<HTMLDivElement>;
  disableDragging?: boolean;
  initialPosition?: { x: number; y: number };
  zIndex?: number;
  onClick?: () => void;
};

function Draggable({ children, dragHandleRef, disableDragging = false, initialPosition = { x: 0, y: 0 }, zIndex = 0, onClick }: DraggableProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disableDragging) return;
    if (dragHandleRef.current && dragHandleRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disableDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, disableDragging]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging && !disableDragging ? 'grabbing' : 'auto',
        zIndex,
      }}
    >
      {children}
    </div>
  );
}

export default Draggable;