import { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/Screensaver.css';

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  opacity: number;
};

type ScreensaverProps = {
  idleTimeout?: number;
};

const Screensaver = ({ idleTimeout = 60000 }: ScreensaverProps) => {
  const [isActive, setIsActive] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const createBubbles = useCallback(() => {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 15; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 40 + Math.random() * 80,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        hue: 330 + Math.random() * 30,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }
    setBubbles(newBubbles);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      createBubbles();
      setIsActive(true);
    }, idleTimeout);
  }, [idleTimeout, createBubbles]);

  const dismissScreensaver = useCallback(() => {
    setIsActive(false);
    startTimer();
  }, [startTimer]);

  // Set up idle detection
  useEffect(() => {
    const handleActivity = () => {
      if (isActive) {
        dismissScreensaver();
      } else {
        startTimer();
      }
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    // Start initial timer
    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [isActive, startTimer, dismissScreensaver]);

  // Animate bubbles
  useEffect(() => {
    if (!isActive) return;

    const animationInterval = setInterval(() => {
      setBubbles(prevBubbles =>
        prevBubbles.map(bubble => {
          let newX = bubble.x + bubble.speedX;
          let newY = bubble.y + bubble.speedY;
          let newSpeedX = bubble.speedX;
          let newSpeedY = bubble.speedY;

          if (newX <= 0 || newX >= window.innerWidth - bubble.size) {
            newSpeedX = -newSpeedX;
            newX = Math.max(0, Math.min(newX, window.innerWidth - bubble.size));
          }
          if (newY <= 0 || newY >= window.innerHeight - bubble.size) {
            newSpeedY = -newSpeedY;
            newY = Math.max(0, Math.min(newY, window.innerHeight - bubble.size));
          }

          return {
            ...bubble,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    }, 16);

    return () => clearInterval(animationInterval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="screensaver" onClick={dismissScreensaver}>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 30% 30%,
              hsla(${bubble.hue}, 80%, 80%, ${bubble.opacity}),
              hsla(${bubble.hue}, 60%, 50%, ${bubble.opacity * 0.5}))`,
            boxShadow: `
              inset -10px -10px 20px hsla(${bubble.hue}, 60%, 40%, 0.3),
              inset 5px 5px 10px hsla(${bubble.hue}, 80%, 90%, 0.5),
              0 0 20px hsla(${bubble.hue}, 70%, 60%, 0.3)
            `,
          }}
        />
      ))}
      <div className="screensaver-text">Move mouse or press any key to exit</div>
    </div>
  );
};

export default Screensaver;
