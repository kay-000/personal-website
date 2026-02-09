import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';

// Import project .ts json-style files
import studybearbot from '../../public/projects/studybearbot/studybearbot.tsx';

// Folder structure types
type FolderItem = {
  id: string;
  name: string;
  type: 'folder' | 'project' | 'file';
  children?: FolderItem[];

  // Project-specific fields (when type is 'project')
  content?: React.ReactNode;
  techStack?: string[];
  github?: string;
  demo?: string;
  localDemo?: string;  // Path to local demo (opens in window)
  screenshots?: string[];

  // File-specific fields (when type is 'file')
  fileSrc?: string;  // Path to file (PDF, image, etc.)
};

type ProjectsProps = {
  onOpenFile?: (id: string, title: string, src: string) => void;
  onOpenDemo?: (id: string, title: string, src: string) => void;
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
        content: <p><i>This project is a work in progress — details coming soon, I promise!</i></p>,
        techStack: ['Python', 'ROS'],
      },
      {
        id: 'wildfire',
        name: 'The Wildfire Project',
        type: 'project',
        content: <p><i>This project is a work in progress — details coming soon, I promise!</i></p>,
        techStack: ['Python'],
      },
      {
        id: 'hri',
        name: 'Exploring Accent Variability, Phrase Difficulty, and Speaker Distance in Robot-Enabled Speech Recognition',
        type: 'project',
        content: (
        <> 
          <p>
           This research investigates the performance of an open-source Audio 
           Speech Recognition (ASR) model on a robot in various linguistic and 
           social contexts, focusing on accents, phrase difficulty, and speaker distance.
          </p> 
            
          <p>
            The study examines ASR applications in educational settings for 
            hearing-impaired individuals, using the Google Speech Recognition 
            model to present results on user challenges, translation accuracy, 
            and listener comprehension. Findings suggest that on a larger scale, 
            accuracy may <i>decrease</i> with accented English, increased phrase 
            difficulty, and speaker distance.
          </p> 
        </>),

        techStack: ['Python'],
        children: [
          {
            id: 'hri-final-report',                                                                                               
            name: 'Final Report',                                                                                                
            type: 'file' as const,                                                                                                   
            fileSrc: '/projects/hri_project/HRI Final Report.pdf',                                                 
          },
          {                                                                                                                          
            id: 'hri-final-pres',                                                                                               
            name: 'Presentation',                                                                                                
            type: 'file' as const,                                                                                                   
            fileSrc: '/projects/hri_project/HRI Final Project Presentation.pdf',                                                 
          },
        ],
      },
    ],
  },
  {
    id: 'industry',
    name: 'Industry',
    type: 'folder',
    children: [
      {
        id: 'msk',
        name: 'Memorial Sloan Kettering',
        type: 'project',
        content: (
        <>
        <p>
          From June to August 2024, I served as a Full-Stack Engineering Intern
           at Memorial Sloan Kettering Cancer Center 
          <a href="https://www.mskcc.org/" target="_blank"> (MSKCC)</a> in 
          New York City, within the Digital Informatics & Technology Solutions 
          <a href="https://careers.mskcc.org/career-areas/digital-informatics-technology-solutions/" 
          target="_blank">(DigITs)</a>  Department. 
          This work supported MSK's mission of <i>ending cancer for life.</i>
        </p>


        <p> 
          I worked on the MyMSK self-scheduling application, a platform that 
          enables patients to book appointments at Memorial Sloan Kettering. 
          The application uses a React front end and a C#/.NET back end, and 
          supports a large set of appointment workflows to ensure accurate 
          scheduling and confirmation email generation. Throughout the summer, 
          I received structured technical guidance to understand the system's 
          architecture and workflows, building the foundation to independently 
          develop and integrate new React components into the application.
        </p>

        <p> 
          Through specialized LinkedIn Learning courses provided by MSKCC, I 
          developed technical skills in SQL, React, C#, and .NET, with a focus 
          on object-oriented programming, asynchronous programming, debugging, 
          testing, and back-end web development.
        </p>

        </>
        ),
        techStack: ['React', 'Typescript'],
        github: 'https://github.com/kay-000/msk-chatbot-app',
      },
    ],
  },
  {
    id: 'prototypes',
    name: 'Prototypes',
    type: 'folder',
    children: [
      studybearbot as FolderItem,
    ],
  },
  {
    id: 'archive',
    name: 'Archive',
    type: 'folder',
    children: [
      {
        id: 'archive-placeholder',
        name: 'Nothing here yet!',
        type: 'project',
        content: <p><i>Older projects will live here eventually. Stay tuned!</i></p>,
      },
    ],
  },
];

// Helper to find item by ID in nested structure
const findItemById = (items: FolderItem[], id: string): FolderItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

const Projects: React.FC<ProjectsProps> = ({ onOpenFile, onOpenDemo }) => {
 const [navigationPath, setNavigationPath] = useState<FolderItem[]>(() => {  
  // Restore navigation from sessionStorage on mount                                                                                                                                                           
  const saved = sessionStorage.getItem('projectsNavigation');                                                                                                                                                  
  if (saved) {                                                                                                                                                                                                 
    try {                                                                                                                                                                                                      
      const ids: string[] = JSON.parse(saved);                                                                                                                                                                 
      const path: FolderItem[] = [];  

      for (const id of ids) {                                                                                                                                                                                  
        const item = findItemById(projectStructure, id);                                                                                                                                                       
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
      return projectStructure;
    }
    const currentFolder = navigationPath[navigationPath.length - 1];
    return currentFolder.children || [];
  };

  // Navigate into a folder or project, or open a file
  const handleItemClick = (e: React.MouseEvent, item: FolderItem) => {
    e.stopPropagation();
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
          <div className="project-folders">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="project-folder"
                onClick={(e) => handleItemClick(e, item)}
              >
                {item.type === 'file' ? (
                  // File icon
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="#F2BED1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"/>
                  </svg>
                ) : (
                  // Folder icon
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="#F2BED1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z"/>
                  </svg>
                )}
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
