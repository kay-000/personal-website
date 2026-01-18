import React, { useState } from 'react';
import '../styles/Projects.css';

// Folder structure types
type FolderItem = {
  id: string;
  name: string;
  type: 'folder' | 'project';
  children?: FolderItem[];
  
  // Project-specific fields (when type is 'project')
  description?: string;
  techStack?: string[];
  github?: string;
  demo?: string;
  screenshots?: string[];
};

// Your folder structure
const projectStructure: FolderItem[] = [
  {
    id: 'research',
    name: 'Research',
    type: 'folder',
    children: [
      {
        id: 'safe',
        name: 'The SAFE Project',
        type: 'project',
        description: 'Description of your first web project',
        techStack: ['React', 'TypeScript', 'Node.js'],
        github: 'https://github.com/yourusername/project1',
        demo: 'https://project1-demo.com',
        children: [
          {
            id: 'project1-screenshots',
            name: 'Screenshots',
            type: 'folder',
            children: [], // Add screenshot items here
          },
          {
            id: 'project1-docs',
            name: 'Documentation',
            type: 'folder',
            children: [], // Add documentation items here
          },
        ],
      },
      {
        id: 'wildfire',
        name: 'The Wildfire Project',
        type: 'project',
        description: 'Another web project',
        techStack: ['Vue', 'JavaScript'],
        github: 'https://github.com/yourusername/project2',
      },
    ],
  },
  {
    id: 'industry',
    name: 'Industry',
    type: 'folder',
    children: [
      {
        id: 'project3',
        name: 'Mobile App 1',
        type: 'project',
        description: 'A mobile application',
        techStack: ['React Native', 'Firebase'],
        github: 'https://github.com/yourusername/project3',
      },
    ],
  },
  {
    id: 'prototypes',
    name: 'Prototypes',
    type: 'folder',
    children: [
      {
        id: 'project3',
        name: 'Mobile App 1',
        type: 'project',
        description: 'A mobile application',
        techStack: ['React Native', 'Firebase'],
        github: 'https://github.com/yourusername/project3',
      },
    ],
  },
   {
    id: 'archive',
    name: 'Archive',
    type: 'folder',
    children: [
      {
        id: 'project3',
        name: 'Mobile App 1',
        type: 'project',
        description: 'A mobile application',
        techStack: ['React Native', 'Firebase'],
        github: 'https://github.com/yourusername/project3',
      },
    ],
  },
];

const Projects: React.FC = () => {
  const [navigationPath, setNavigationPath] = useState<FolderItem[]>([]);

  // Get current folder items
  const getCurrentItems = (): FolderItem[] => {
    if (navigationPath.length === 0) {
      return projectStructure;
    }
    const currentFolder = navigationPath[navigationPath.length - 1];
    return currentFolder.children || [];
  };

  // Navigate into a folder or project
  const handleItemClick = (e: React.MouseEvent, item: FolderItem) => {
    e.stopPropagation();
    setNavigationPath([...navigationPath, item]);
  };

  // Go back one level
  const handleBackClick = () => {
    setNavigationPath(navigationPath.slice(0, -1));
  };

  // Navigate to a specific level in breadcrumb
  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setNavigationPath([]);
    } else {
      setNavigationPath(navigationPath.slice(0, index + 1));
    }
  };

  const currentItems = getCurrentItems();
  const currentItem = navigationPath.length > 0 ? navigationPath[navigationPath.length - 1] : null;
  const isProject = currentItem?.type === 'project';

  return (
    <div className="projects-container" onClick={(e) => e.stopPropagation()}>
      {/* Breadcrumb navigation */}
      {navigationPath.length > 0 && (
        <div className="breadcrumb">
          <button onClick={handleBackClick} className="back-btn">← Back</button>
          <div className="breadcrumb-path">
            <span onClick={() => handleBreadcrumbClick(-1)} className="breadcrumb-link">Projects</span>
            {navigationPath.map((item, index) => (
              <span key={item.id}>
                {' > '}
                <span
                  onClick={() => handleBreadcrumbClick(index)}
                  className={index === navigationPath.length - 1 ? 'breadcrumb-current' : 'breadcrumb-link'}
                >
                  {item.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Show project details if current item is a project */}
      {isProject && currentItem && (
        <div className="project-details">
          <h2>{currentItem.name}</h2>
          {currentItem.description && <p className="description">{currentItem.description}</p>}

          {currentItem.techStack && currentItem.techStack.length > 0 && (
            <div className="tech-stack">
              <h3>Tech Stack:</h3>
              <div className="tech-tags">
                {currentItem.techStack.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {(currentItem.github || currentItem.demo) && (
            <div className="project-links">
              {currentItem.github && (
                <a href={currentItem.github} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              )}
              {currentItem.demo && (
                <a href={currentItem.demo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Show folders/subfolders if they exist */}
      {currentItems.length > 0 && (
        <>
          {!isProject && <h2>{currentItem ? currentItem.name : 'My Projects'}</h2>}
          {isProject && currentItems.length > 0 && <h3 style={{ marginTop: '20px' }}>Subfolders:</h3>}
          <div className="project-folders">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="project-folder"
                onClick={(e) => handleItemClick(e, item)}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#F2BED1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z"/>
                </svg>
                <span className="folder-name">{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
