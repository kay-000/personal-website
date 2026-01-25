import { useState, useEffect } from 'react';
import '../styles/SystemProperties.css';

const SystemProperties = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.body.classList.contains('dark-mode');
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="system-properties">
      <div className="system-header">
        <div className="system-logo">
          <span className="logo-text">Kayla</span>
          <span className="logo-os">OS</span>
        </div>
        <div className="system-version">Version 1.0 (Build 2025)</div>
      </div>

      <div className="system-section">
        <h3>K.A.Y.L.A. Core Specs:</h3>
        <table className="specs-table">
          <tbody>
            <tr>
              <td>Model:</td>
              <td>Kayla McFarlane v25.0</td>
            </tr>
            <tr>
              <td>Processor:</td>
              <td>CMU Robotics Neural Engine</td>
            </tr>
            <tr>
              <td>Memory:</td>
              <td>ECE + Robotics Knowledge Base</td>
            </tr>
            <tr>
              <td>Skills:</td>
              <td>Problem Solving, Circuit Design, Building Cool Stuff</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="system-section">
        <h3>Registered to:</h3>
        <p>Kayla McFarlane</p>
        <p>Robotics Graduate Student</p>
        <p>Carnegie Mellon University</p>
      </div>

      <div className="system-section">
        <h3>Current Status:</h3>
        <div className="status-bar">
          <div className="status-label">Creativity:</div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: '92%' }}></div>
          </div>
          <span className="status-percent">92%</span>
        </div>
        <div className="status-bar">
          <div className="status-label">Curiosity:</div>
          <div className="progress-container">
            <div className="progress-bar caffeine" style={{ width: '100%' }}></div>
          </div>
          <span className="status-percent">MAX</span>
        </div>
        <div className="status-bar">
          <div className="status-label">Building Mode:</div>
          <div className="progress-container">
            <div className="progress-bar snacks" style={{ width: '88%' }}></div>
          </div>
          <span className="status-percent">ACTIVE</span>
        </div>
      </div>

      <div className="system-section">
        <h3>Display Settings:</h3>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="system-footer">
        <p>* No actual robots were harmed in the making of this website</p>
      </div>
    </div>
  );
};

export default SystemProperties;
