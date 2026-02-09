import { useState, useEffect, useCallback } from 'react';

// Content (separated from logic)
// const BIO_TEXT = `Hi, hello there! My name is Kayla McFarlane and I am 
// currently a 1st year Master's Student studying Robotics at Carnegie Mellon University. 
// Previously, I studied and obtained my Bachelor's in Electrical & Computer Engineering 
// at Carnegie Mellon University.`;

// Previously, I have worked on FIReViSION (a photorealistic thermal
// infrared simulator), explored human-robot interaction through accent recognition research and emotional regulation for young children, and developed AI-powered tools at Memorial Sloan Kettering Cancer Center.




// const BIO_TEXT = `Hi, hello there! I'm Kayla McFarlane, a graduate student interested in enabling safe autonomous navigation in uncertain, dynamic environments.

// I am currently pursuing my MS in Robotics at Carnegie Mellon University as a Rales Fellow and I work in the AirLab developing an evaluation framework for adaptive safety behavior in autonomous navigation systems.

// I'm interested in perception-aware planning, safety-critical autonomy, and building systems that work reliably when things get unpredictable!`;



const BIO_TEXT = `Hi, hello there! I'm Kayla McFarlane.`;



const ADDITIONAL_CONTENT = (
  <div className="about-sections">

    <h3>Who Am I? </h3>
     <img src="/pfp.jpeg" alt="A professional headshot" />
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
          Here's a list of the many things I have worked on, created, or was part of!
          More details can be found in the Projects folder! :D 
      </p>

      <section className="timeline">
        <pre className="ascii-timeline">
          {`   
              |
              |-- 2026
              |    ├─ Graduate Research Assistant, AirLab - SAFE Benchmark (Present)
              |    ├─ Graduate Research Assistant, AirLab - Adversial AI Project(Present)
              |    ├─ IEEE SII Conference Volunteer (Jan 2026)
              |    └─ Courses: Robot Learning (Deep Reinforcement Learning), Embodied AI Safety
              |
              |-- 2025
              |    ├─ Joined a startup: INFERNOT. Competed & won 4th place in Hack-A-Startup at CMU (Oct - Nov)
              |    ├─ Wireless Innovation Hackathon for Accessibility, produced Nightingale: Voice Cleaner and Transcriber (Oct)
              |    ├─ Rales Inauguration Ceremony (Oct)
              |    ├─ Joined Paths to AI Research (PAIR) Program as a Mentor
              |    ├─ Started MS Robotics, CMU (Aug - Present)
              |    ├─ Rales Fellowship (Aug 2025 - Aug 2027)
              |    ├─ Graduate Research Assistant, AirLab - SAFE Benchmark (May - Present)
              |    ├─ ETH Zurich Robotics Summer School (June)
              |    ├─ Graduated BS ECE, CMU (May)
              |    ├─ Study Bearbot Capstone (Jan - May)
              |    └─ Courses: Mobile Robots, Machine Learning, Math Fundamentals for Robotics, Applied Cryptography, ECE Capstone, Fundamentals of Semiconductor Devices
              |
              |-- 2024
              |    ├─ Up2 Web App Project (Nov - Dec)
              |    ├─ SWE Outreach Committee Member 
              |    ├─ MSK Software Engineering Intern (Jun - Aug)
              |    ├─ SheInnovates Hackathon, produced Project Vivian: A Caribbean Voice Assistant (Feb)
              |    ├─ AirLab, Undergrad Research Assistant - SAFE Project (Mar - May)
              |    └─ Courses: Concepts of Robotics, Ethics & Robotics, Computer Systems, Computer Security, Signals & Systems, Web Application Development, Experimental Physics
              |
              |-- 2023
              |    ├─ HRI Research Project (Nov - Dec)
              |    ├─ AirLab, Wildfire Project: Inverse Rendering Project (Sept - Dec)
              |    ├─ AirLab, Wildfire Project: FIReVision (May - Sept)
              |    ├─ AirLab, Informative Path Planning (IPP) Project (Jan - May)
              |    ├─ Joined AirLab as an Undergraduate Research Assistant via HURAY (Jan)
              |    └─ Courses: Computer Vision, Human-Robot Interaction Data Structures & Algorithms, Physics III, Linear Algebra, Probability & Statistics, Data-focused Python
              |
              |-- 2022
              |    ├─ JADA House Website Redesign (Oct - Dec)
              |    └─ Courses: Intro to ECE, Physics II, Discrete Math, Information Assurance, StuCo: Fun with Robots
              |
              |-- 2021
              |    ├─ Started at Carnegie Mellon University (Aug)
              |    ├─ Courses: Intro to MechE, Calculus II, Physics I
              |    ├─ Graduated from North Babylon Highschool (June)
              |    └─ Awarded Suffolk County Highway Superintendent Scholarship (June)
              |
              └───`}
        </pre>
      </section>
          
      <p id="miffy!">
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠋⠉⠳⡄⠀⠀⠀⠀⢠⠴⠒⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
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
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠈⠙⠁⠀
      </p>
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
            
          {showAdditional && ADDITIONAL_CONTENT}
        </div>
      )}
    </div>
  );
};

export default MyInfo;
