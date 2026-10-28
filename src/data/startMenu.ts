// Start menu contents, shared by the desktop taskbar and the
// Pocket bar. `null` renders a separator.
export type MenuItem = { id: string; label: string; icon: string };

export const START_MENU_ITEMS: (MenuItem | null)[] = [
  { id: 'readme', label: 'README', icon: 'icons/person_icon.svg' },
  { id: 'kayla_info', label: 'About Me', icon: 'icons/person_icon.svg' },
  { id: 'projects', label: 'Projects', icon: 'icons/folder.svg' },
  { id: 'pictures', label: 'My Pictures', icon: 'icons/folder.svg' },
  { id: 'notes', label: 'Notes', icon: 'icons/file.svg' },
  { id: 'kayla_resume', label: 'Resume', icon: 'icons/file.svg' },
  { id: 'kayla_cv', label: 'CV', icon: 'icons/file.svg' },
  null,
  { id: 'contact', label: 'Contact', icon: 'icons/email.svg' },
  { id: 'github', label: 'GitHub', icon: 'icons/github_icon.svg' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'icons/linkedin_icon.svg' },
  null,
  { id: 'system', label: 'System Properties', icon: 'icons/computer.svg' },
];
