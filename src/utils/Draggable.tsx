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

  // Pointer events cover mouse, touch and pen with one code path
  const handlePointerDown = (e: React.PointerEvent) => {
    if (disableDragging) return;
    const target = e.target as HTMLElement;
    // Let the title bar buttons be tapped without starting a drag
    if (target.closest('button')) return;
    if (dragHandleRef.current && dragHandleRef.current.contains(target)) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || disableDragging) return;
    // Keep at least 60px of the title bar on screen so it can be grabbed back
    setPosition({
      x: Math.min(Math.max(e.clientX - offset.x, 60 - (dragHandleRef.current?.offsetWidth ?? 0)), window.innerWidth - 60),
      y: Math.min(Math.max(e.clientY - offset.y, 0), window.innerHeight - 60),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, offset, disableDragging]);

  return (
    <div
      onPointerDown={handlePointerDown}
      // Raise on pointer-down, not click. A click bubbles up after the
      // child's handler has already opened a new window, so raising
      // here on click pulled this window back over the new one.
      onPointerDownCapture={onClick}
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