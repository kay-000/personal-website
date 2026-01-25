// Retro sound effects using Web Audio API
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// Helper to create oscillator-based sounds
const playTone = (frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.1) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.value = volume;

  // Fade out
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

// Click sound - short high beep
export const playClick = () => {
  playTone(800, 0.05, 'square', 0.08);
};

// Window open - ascending tone
export const playWindowOpen = () => {
  playTone(400, 0.1, 'sine', 0.1);
  setTimeout(() => playTone(600, 0.1, 'sine', 0.1), 50);
  setTimeout(() => playTone(800, 0.15, 'sine', 0.08), 100);
};

// Window close - descending tone
export const playWindowClose = () => {
  playTone(600, 0.1, 'sine', 0.1);
  setTimeout(() => playTone(400, 0.1, 'sine', 0.08), 50);
  setTimeout(() => playTone(300, 0.15, 'sine', 0.06), 100);
};

// Startup chime - cheerful melody
export const playStartup = () => {
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.12), i * 150);
  });
};

// Error sound - low buzz
export const playError = () => {
  playTone(150, 0.15, 'sawtooth', 0.1);
  setTimeout(() => playTone(150, 0.15, 'sawtooth', 0.1), 200);
};

// Minimize sound - quick blip down
export const playMinimize = () => {
  playTone(600, 0.08, 'sine', 0.08);
  setTimeout(() => playTone(400, 0.08, 'sine', 0.06), 40);
};

// Resume audio context on user interaction (browser requirement)
export const resumeAudio = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};
