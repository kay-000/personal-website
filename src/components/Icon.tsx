import React from 'react';
import '../styles/Icon.css';

interface IconProps {
  name: string;
  icon: string | React.ReactNode;  // Can be a path string OR a React element (like SVG)
  onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ name, icon, onClick }) => {
  return (
    <div className="desktop-icon" onClick={onClick}>
      <div className="icon-image">
        {typeof icon === 'string' ? (
          <img src={icon} alt={name} />
        ) : (
          icon
        )}
      </div>
      <span className="icon-name">{name}</span>
    </div>
  );
};

export default Icon;