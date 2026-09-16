import React, { useState, useEffect } from 'react';
import {
  PROJECT_TREE,
  findItemById,
  findPath,
  type FolderItem,
} from '../data/projects';
import FileTile from './FileTile';
import PhotoGallery from './PhotoGallery';
import '../styles/Projects.css';

type ProjectsProps = {
  onOpenFile?: (id: string, title: string, src: string) => void;
  onOpenDemo?: (id: string, title: string, src: string) => void;
  /** Open straight to a project/folder by id (used by timeline deep links) */
  initialItemId?: string;
};

const Projects: React.FC<ProjectsProps> = ({ onOpenFile, onOpenDemo, initialItemId }) => {
 const [navigationPath, setNavigationPath] = useState<FolderItem[]>(() => {
  // A deep link wins over whatever was last open
  if (initialItemId) {
    const path = findPath(PROJECT_TREE, initialItemId);
    if (path) return path;
  }

  // Restore navigation from sessionStorage on mount
  const saved = sessionStorage.getItem('projectsNavigation');
  if (saved) {
    try {
      const ids: string[] = JSON.parse(saved);
      const path: FolderItem[] = [];

      for (const id of ids) {
        const item = findItemById(PROJECT_TREE, id);
        if (item) path.push(item);
        }
        return path;
    } catch (e) {return [];}
  }
  return [];
  });

  // Save navigation to sessionStorage when it changes
  useEffect(() => {
    const ids = navigationPath.map(item => item.id);
    sessionStorage.setItem('projectsNavigation', JSON.stringify(ids));
  }, [navigationPath]);

  // Reset navigation when window closes (component unmounts)
  useEffect(() => {return () => {
      sessionStorage.removeItem('projectsNavigation');
    };
   }, []);

  // Get current folder items
  const getCurrentItems = (): FolderItem[] => {
    if (navigationPath.length === 0) {
      return PROJECT_TREE;
    }
    const currentFolder = navigationPath[navigationPath.length - 1];
    return currentFolder.children || [];
  };

  // Navigate into a folder or project, or open a file
  const handleItemClick = (item: FolderItem) => {
    if (item.type === 'file' && item.fileSrc && onOpenFile) {
      onOpenFile(item.id, item.name, item.fileSrc);
    } else {
      setNavigationPath([...navigationPath, item]);
    }
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

          {/* Photos from src/assets/pictures/<id>/, video first */}
          <PhotoGallery photos={currentItem.photos ?? []} />

          {currentItem.content && <div className="description">{currentItem.content}</div>}


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

          {(currentItem.github || currentItem.demo || currentItem.localDemo) && (
            <div className="project-links">
              {currentItem.github && (
                <a href={currentItem.github} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              )}
              {currentItem.localDemo && onOpenDemo ? (
                <button
                  className="demo-button"
                  onClick={() => onOpenDemo(currentItem.id + '-demo', currentItem.name + ' Demo', currentItem.localDemo!)}
                >
                  Live Demo
                </button>
              ) : currentItem.demo && (
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
          {isProject && currentItems.length > 0 && <h3 style={{ marginTop: '20px' }}>Contents:</h3>}
          <div className="file-tiles">
            {currentItems.map((item) => (
              <FileTile
                key={item.id}
                name={item.name}
                kind={item.type === 'file' ? 'file' : 'folder'}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
