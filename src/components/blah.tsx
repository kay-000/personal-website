import { useState, useEffect, useCallback } from 'react';

// Content
const BIO_TEXT = `Hi, I'm Kayla McFarlane — a robotics researcher focused on enabling safe autonomous navigation in uncertain, dynamic environments.

Currently pursuing my MS in Robotics at Carnegie Mellon University as a Rales Fellow, I work in the AirLab developing evaluation frameworks for adaptive safety behavior in autonomous systems.

Previously, I built thermal infrared sensing simulators for wildfire detection, explored human-robot interaction through accent recognition research, and developed AI-powered tools at Memorial Sloan Kettering Cancer Center.

I'm interested in perception-aware planning, safety-critical autonomy, and building systems that work reliably when things get unpredictable.`;

const ADDITIONAL_CONTENT = (
  <div className="about-sections">
    <section className="highlights">
      <h3>Highlights</h3>
      <div className="highlight-item">
        <strong>Rales Fellow, CMU Robotics (2025-2027)</strong>
        <p>Selected as 1 of 34 recipients from 400+ applicants for full-tuition fellowship supporting graduate research in robotics.</p>
      </div>
      <div className="highlight-item">
        <strong>ETH Zurich Robotics Summer School (June 2025)</strong>
        <p>Participated in intensive field deployment training for autonomous systems in search and rescue scenarios. 1 of 50 students selected globally from 292 applicants.</p>
      </div>
      <div className="highlight-item">
        <strong>IEEE SII 2026 Conference Volunteer</strong>
        <p>Supported conference operations at the IEEE Symposium on Intelligent Informatics in Cancun, engaging with researchers in autonomous systems and safety-critical robotics.</p>
      </div>
      <div className="highlight-item">
        <strong>Humanoids 2026 Student Volunteer Lead (Upcoming)</strong>
        <p>Selected to organize and coordinate student volunteers for the IEEE-RAS International Conference on Humanoid Robots in California.</p>
      </div>
    </section>

    <section className="currently">
      <h3>Currently</h3>
      <p><strong>Graduate Research Assistant, CMU AirLab</strong> — Developing benchmark framework for evaluating adaptive safety in autonomous navigation under uncertainty. Details forthcoming in publication.</p>
      <p><strong>Coursework:</strong> Machine Learning, Advanced Computer Vision (Spring 2026), Reinforcement Learning (Spring 2026)</p>
    </section>

    <section className="previously">
      <h3>Previously</h3>
      <ul>
        <li><strong>Wildfire Detection Research</strong> — Built FIReVision, a photorealistic thermal infrared sensing simulator generating 15,000+ multimodal training images for autonomous wildfire detection systems.</li>
        <li><strong>MSK Cancer Center Software Engineering Intern</strong> — Developed AI chatbot interface for patient portal serving 170,000+ users. Won 1st place in intern hackathon.</li>
        <li><strong>Human-Robot Interaction Research</strong> — Investigated accent variability and speaker distance effects on robot speech recognition systems for hearing-impaired educational applications.</li>
        <li><strong>Study Bearbot Capstone</strong> — Designed interactive desktop companion with user study demonstrating measurable stress reduction for students.</li>
      </ul>
    </section>
  </div>
);

// Typewriter hook
const useTypewriter = (text: string, speed: number = 30, initialDelay: number = 1500) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const skip = useCallback(() => {
    setDisplayedText(text);
    setIsTyping(false);
    setIsLoading(false);
  }, [text]);

  useEffect(() => {
    if (!isLoading) return;
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setIsTyping(true);
    }, initialDelay);
    return () => clearTimeout(timeout);
  }, [isLoading, initialDelay]);

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

  return { displayedText, isTyping, isLoading, skip };
};

const MyInfo = () => {
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

  // Spacebar to skip bio
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
    <div style={{ cursor: 'pointer' }}>
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
          
          {showAdditional && ADDITIONAL_CONTENT}
        </div>
      )}
    </div>
  );
};

export default MyInfo;