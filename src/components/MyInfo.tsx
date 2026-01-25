import { useState, useEffect, useCallback } from 'react';

// Content (separated from logic)
const BIO_TEXT = `Hi, hello there! My name is Kayla McFarlane and I am 
currently a 1st year Master's Student studying Robotics at Carnegie Mellon University. 
Previously, I studied and obtained my Bachelor's in Electrical & Computer Engineering 
at Carnegie Mellon University.`;



// Typewriter hook (loading/animation logic)
const useTypewriter = (text: string, speed: number = 30, initialDelay: number = 1500) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const restart = useCallback(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsLoading(true);
  }, []);

  const skip = useCallback(() => {
    setDisplayedText(text);
    setIsTyping(false);
    setIsLoading(false);
  }, [text]);

  // Initial delay before typing starts
  useEffect(() => {
    if (!isLoading) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setIsTyping(true);
    }, initialDelay);
    return () => clearTimeout(timeout);
  }, [isLoading, initialDelay]);

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, text, speed, isTyping]);

  return { displayedText, isTyping, isLoading, restart, skip };
};

// Component
const MyInfo = () => {
  const { displayedText, isTyping, isLoading, restart, skip } = useTypewriter(BIO_TEXT);

  // Spacebar to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (isLoading || isTyping)) {
        e.preventDefault();
        skip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, isTyping, skip]);

  return (
    <div onClick={restart} style={{ cursor: 'pointer' }}>
      {isLoading ? (
        <p>Information Loading...</p>
      ) : (
        <p>
          {displayedText}
          {isTyping && <span className="cursor">|</span>}
        </p>
      )}
    </div>
  );
};

export default MyInfo;
