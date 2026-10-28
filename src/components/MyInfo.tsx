import { useState, useEffect, useCallback } from 'react';
import Timeline from './Timeline';
import type { TimelineLink } from '../data/timeline';
import { asset } from '../utils/asset';
import '../styles/MiffyPeek.css';

// Content (separated from logic)

/* A template literal, not JSX text: JSX folds newlines into
   spaces, which is what reflowed her with the window width. */
const MIFFY = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠋⠉⠳⡄⠀⠀⠀⠀⢠⠴⠒⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡶⢶⡀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⢹⡄⠀⠀⣰⠋⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣀⡼⠀⠀⠛⠒⠒⡦⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⣷⠀⢰⡏⠀⠀⠀⠀⠀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣏⠁⠀⠀⠀⠀⠀⣼⠁⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⣹⠀⢸⠀⠀⠀⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠉⡶⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⢽⠀⢸⠀⠀⠀⠀⠀⠀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢷⡤⠞⠉⠉⠉⠁⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⢸⡆⢸⠀⠀⠀⠀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠈⠛⠋⠀⠀⢀⠄⡀⣸⠃⡀⠠⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⠀⠀⠠⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠲⢀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠁⠀⠜⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠠⠳⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣠⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠒⠀⠀⠀⠀⠀⣰⠀⠐⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⠁⠈⣧⠀⠰⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣄⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⡇⠀⠘⠁⠀⠘⠲⢤⡀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢦⣄⠀⣠⠤⠤⠄⠙⡇⠀⠀⢨⠷⢶⡋⠀⠀⠀⠀⠀⢀⣴⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⢷⣀⡴⠂⢠⣇⡀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⠤⣤⣤⡴⠋⠀⠹⣽⣛⣛⣿⠋⠉⠉⢁⡴⢋⣳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣄⡀⠀⠀⠉⠁⠀⠀⠀⣠⡞⠓⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡍⠓⠦⢤⠤⠴⠶⣺⠟⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⡰⢲⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠒⠛⠲⠶⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⠉⠁⠈⠲⣤
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⣀⡀⠀⡞⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠈⠙⠁⠀`;

const BIO_TEXT = `Hi, hello there! I'm Kayla McFarlane.`;

const AdditionalContent = ({ onNavigate }: { onNavigate?: (link: TimelineLink) => void }) => (
  <div className="about-sections">

    <h3>Who Am I? </h3>
     <img src={asset('pfp.jpeg')} alt="A professional headshot" />
      <p>
          I am a graduate student interested in enabling safe autonomous navigation in uncertain, dynamic environments.
          I am currently pursuing my MS in Robotics at Carnegie Mellon University as a Rales Fellow and I work in the
          AirLab developing an evaluation framework for adaptive safety behavior in autonomous navigation systems.
      </p>

      <p>
          In my free time, I enjoy talking walks in nature, watching movies, and trying out new cooking recipes!
      </p>

    <h3> A brief overview: </h3>
      <p>
          Everything I've worked on, created, or been part of. Filter by type, sort by date,
          and click any underlined row to jump straight to it.
      </p>

      {/* Was a hand-aligned ASCII <pre> block — now data-driven so it
          reflows, ranks by type, and links into the rest of the site.
          Edit entries in src/data/timeline.ts. */}
      <Timeline onNavigate={onNavigate} />

      <pre className="miffy-ascii" title="hi from miffy">{MIFFY}</pre>
  </div>
);


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
type MyInfoProps = {
  /** Lets timeline rows open projects, notes, or photo albums */
  onNavigate?: (link: TimelineLink) => void;
};

const MyInfo = ({ onNavigate }: MyInfoProps) => {
  const { displayedText, isTyping, isLoading, skip } = useTypewriter(BIO_TEXT);
  const [showAdditional, setShowAdditional] = useState(false);
  const [loadingAdditional, setLoadingAdditional] = useState(false);

  // Show additional content after bio finishes typing
    useEffect(() => {
      if (!isTyping && !isLoading && displayedText === BIO_TEXT) {
        setLoadingAdditional(true);
        const timeout = setTimeout(() => {
          setLoadingAdditional(false);
          setShowAdditional(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }, [isTyping, isLoading, displayedText]);

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
    <div>
      {isLoading ? (
        <p>Information Loading...</p>
      ) : (
        <div>
          <p>
            {displayedText}
            {isTyping && <span className="cursor">|</span>}
          </p>

          {loadingAdditional && (
              <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
                Loading additional content...
              </p>
            )}

          {showAdditional && <AdditionalContent onNavigate={onNavigate} />}
        </div>
      )}
    </div>
  );
};

export default MyInfo;
