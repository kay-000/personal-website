import { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/RobotScreensaver.css';

type Robot = {
  id: number;
  x: number;
  y: number;
  speed: number;
  delay: number;
  started: boolean;
};

type ScreensaverProps = {
  idleTimeout?: number;
};

// Cute beep sounds
const playRobotSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const sounds = [
      { freq: 800, type: 'sine' as OscillatorType },
      { freq: 1000, type: 'sine' as OscillatorType },
      { freq: 600, type: 'square' as OscillatorType },
    ];
    const sound = sounds[Math.floor(Math.random() * sounds.length)];

    oscillator.frequency.value = sound.freq;
    oscillator.type = sound.type;
    gainNode.gain.value = 0.04;
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
};

const RobotScreensaver = ({ idleTimeout = 60000 }: ScreensaverProps) => {
  const [isActive, setIsActive] = useState(false);
  const [robots, setRobots] = useState<Robot[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const createRobots = useCallback(() => {
    const newRobots: Robot[] = [];
    const rows = 5;
    const cols = 8;
    const spacingX = window.innerWidth / cols;
    const spacingY = (window.innerHeight - 100) / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newRobots.push({
          id: row * cols + col,
          x: col * spacingX + spacingX / 2 - 40,
          y: row * spacingY + 50,
          speed: 1.5 + Math.random() * 1,
          delay: (row * cols + col) * 200 + Math.random() * 500, // Staggered start
          started: false,
        });
      }
    }
    setRobots(newRobots);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      createRobots();
      setIsActive(true);
    }, idleTimeout);
  }, [idleTimeout, createRobots]);

  const dismissScreensaver = useCallback(() => {
    setIsActive(false);
    if (soundTimerRef.current) clearInterval(soundTimerRef.current);
    startTimer();
  }, [startTimer]);

  // Idle detection
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
    startTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (soundTimerRef.current) clearInterval(soundTimerRef.current);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [isActive, startTimer, dismissScreensaver]);

  // Random robot sounds
  useEffect(() => {
    if (!isActive) return;

    soundTimerRef.current = setInterval(() => {
      if (Math.random() > 0.7) {
        playRobotSound();
      }
    }, 800);

    return () => {
      if (soundTimerRef.current) clearInterval(soundTimerRef.current);
    };
  }, [isActive]);

  // Animate robots marching off
  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();

    const animationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      setRobots(prevRobots =>
        prevRobots.map(robot => {
          // Check if this robot should start moving
          if (!robot.started && elapsed > robot.delay) {
            return { ...robot, started: true };
          }

          // Move robot to the right if started
          if (robot.started) {
            return { ...robot, x: robot.x + robot.speed };
          }

          return robot;
        })
      );
    }, 30);

    return () => clearInterval(animationInterval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="robot-screensaver" onClick={dismissScreensaver}>
      {robots.map(robot => (
        <svg
          key={robot.id}
          className={`pixel-robot ${robot.started ? 'walking' : ''}`}
          style={{
            left: robot.x,
            top: robot.y,
            opacity: robot.x > window.innerWidth ? 0 : 1,
          }}
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          {/* Robot head */}
          <rect x="28" y="8" width="24" height="20" fill="#F2BED1" />
          {/* Antenna */}
          <rect x="38" y="2" width="4" height="6" fill="#F2BED1" />
          <rect x="36" y="0" width="8" height="4" fill="#F2BED1" />
          {/* Eyes */}
          <rect x="32" y="14" width="6" height="6" fill="#1a0a10" />
          <rect x="42" y="14" width="6" height="6" fill="#1a0a10" />
          {/* Eye shine */}
          <rect x="33" y="15" width="2" height="2" fill="#fff" />
          <rect x="43" y="15" width="2" height="2" fill="#fff" />
          {/* Body */}
          <rect x="24" y="30" width="32" height="28" fill="#F2BED1" />
          {/* Body details */}
          <rect x="34" y="36" width="12" height="4" fill="#fcdee9" />
          <rect x="36" y="44" width="8" height="8" fill="#ff6b9d" />
          {/* Arms */}
          <rect x="14" y="32" width="10" height="6" fill="#F2BED1" />
          <rect x="56" y="32" width="10" height="6" fill="#F2BED1" />
          <rect x="12" y="38" width="6" height="12" fill="#F2BED1" />
          <rect x="62" y="38" width="6" height="12" fill="#F2BED1" />
          {/* Legs */}
          <rect x="28" y="58" width="8" height="14" fill="#F2BED1" className="left-leg" />
          <rect x="44" y="58" width="8" height="14" fill="#F2BED1" className="right-leg" />
          {/* Feet */}
          <rect x="24" y="72" width="12" height="6" fill="#F2BED1" className="left-foot" />
          <rect x="44" y="72" width="12" height="6" fill="#F2BED1" className="right-foot" />
        </svg>
      ))}
      <div className="screensaver-text">Move mouse or press any key to exit</div>
    </div>
  );
};

export default RobotScreensaver;
