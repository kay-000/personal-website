import React from 'react';
import '../styles/LinkedinProfile.css';

const LinkedInProfile: React.FC = () => {
  return (
    <div className="linkedin-profile">
      <div className="profile-header">
        <img src="/public/pfp.jpeg" alt="Profile Picture of Kayla McFarlane" className="profile-picture" />
        <h2>Kayla McFarlane</h2>
        <p>Graduate Student</p>
      </div>
      <div className="profile-summary">
        <h3>About</h3>
        <p>A brief professional summary about yourself...</p>
      </div>
      <div className="profile-experience">
        <h3>Experience</h3>
        <ul>
          <li>
            <h4>Job Title</h4>
            <p>Company Name</p>
            <p>Date Range</p>
            <p>Brief description of your role and achievements...</p>
          </li>
          {/* Add more list items for additional experiences */}
        </ul>
      </div>
      <div className="profile-education">
        <h3>Education</h3>
        <ul>
          <li>
            <h4>Degree Name</h4>
            <p>Institution Name</p>
            <p>Graduation Year</p>
          </li>
          {/* Add more list items for additional education */}
        </ul>
      </div>
      <div className="profile-skills">
        <h3>Skills</h3>
        <ul>
          <li>Skill 1</li>
          <li>Skill 2</li>
          <li>Skill 3</li>
          {/* Add more skills */}
        </ul>
      </div>
      <a href="https://www.linkedin.com/in/kayla-mcfarlane28/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
        View full profile on LinkedIn
      </a>
    </div>
  );
};

export default LinkedInProfile;