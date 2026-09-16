/* ============================================================
   Timeline content.

   This file is the ONLY place you edit to update the timeline —
   layout lives in components/Timeline.tsx. To add an entry, drop
   a new object into ENTRIES. Order within a year doesn't matter;
   it renders newest-year-first and preserves array order inside
   each year.

   LINKING RULE
   ------------
   Research / project / industry work links to its folder in
   Projects. Everything else — training, service, awards — links
   to its write-up in Notes. Education milestones are plain facts
   and stay unlinked.

     { kind: 'window', id: 'projects' }   → opens a desktop window
     { kind: 'note',   id: 'eth-rss-2025' } → opens that note
     { kind: 'album',  id: 'sii-2026' }   → opens that photo album
   ============================================================ */

export type EntryType =
  | 'research'
  | 'education'
  | 'award'
  | 'training'
  | 'project'
  | 'industry'
  | 'service';

export type TimelineLink =
  | { kind: 'window'; id: string }
  | { kind: 'project'; id: string }
  | { kind: 'note'; id: string }
  | { kind: 'album'; id: string };

export type TimelineEntry = {
  id: string;
  year: number;
  /** Short date shown in the left column: 'Jan', 'May–Aug', 'Present' */
  date: string;
  title: string;
  /** Optional second line, kept short */
  detail?: string;
  type: EntryType;
  /** Renders a "NOW" badge */
  present?: boolean;
  link?: TimelineLink;
};

export const TYPE_LABELS: Record<EntryType, string> = {
  research: 'Research',
  education: 'Education',
  award: 'Award',
  training: 'Training',
  project: 'Project',
  industry: 'Industry',
  service: 'Service',
};

/** Deep link into the Projects tree. The id must match an item id in
    components/Projects.tsx — a project, or a folder to land on. */
const project = (id: string): TimelineLink => ({ kind: 'project', id });

export const ENTRIES: TimelineEntry[] = [
  // ---------------------------------------------------------- 2026
  {
    id: 'fzi-kit-2026',
    year: 2026,
    date: 'Aug 3–7',
    title: 'Summer School: Towards Walking Robots in Domestic Environments',
    detail: 'FZI Research Center for Information Technology, with KIT — Karlsruhe, Germany',
    type: 'training',
    link: { kind: 'note', id: 'fzi-kit-2026' },
  },
  {
    id: 'safe-2026',
    year: 2026,
    date: 'Present',
    title: 'Graduate Research Assistant — AirLab',
    detail: 'SAFE Benchmark',
    type: 'research',
    present: true,
    link: project('safe'),
  },
  {
    id: 'adversarial-2026',
    year: 2026,
    date: 'Present',
    title: 'Graduate Research Assistant — AirLab',
    detail: 'Adversarial AI Project',
    type: 'research',
    present: true,
    link: project('adversarial'),
  },
  {
    id: 'sii-2026',
    year: 2026,
    date: 'Jan',
    title: 'IEEE/SICE SII Conference — Volunteer',
    type: 'service',
    link: { kind: 'note', id: 'sii-2026' },
  },
  {
    id: 'jensen-2026',
    year: 2026,
    date: 'May 10',
    title: 'Welcomed Jensen Huang to CMU',
    detail: 'Representing the Rales Fellowship',
    type: 'service',
    link: { kind: 'note', id: 'jensen-2026' },
  },
  // TODO(kayla): confirm the real date. Shows '—' until then.
  {
    id: 'mpowerhouse-2026',
    year: 2026,
    date: '—',
    title: 'MPowerhouse — Teaching robotics to kids',
    type: 'service',
    // Note is a draft until it's written up — unlink until then.
    // link: { kind: 'note', id: 'mpowerhouse' },
  },

  // ---------------------------------------------------------- 2025
  {
    id: 'infernot',
    year: 2025,
    date: 'Oct–Nov',
    title: 'INFERNOT — 4th place, Hack-A-Startup at CMU',
    detail: 'Joined as a founding member',
    type: 'project',
    link: project('infernot'),
  },
  {
    id: 'nightingale',
    year: 2025,
    date: 'Oct',
    title: 'Nightingale — Voice Cleaner & Transcriber',
    detail: 'Wireless Innovation Hackathon for Accessibility',
    type: 'project',
    link: project('nightingale'),
  },
  {
    id: 'rales-inauguration',
    year: 2025,
    date: 'Oct',
    title: 'Rales Fellows Induction Ceremony',
    detail: '2025 cohort',
    type: 'award',
    link: { kind: 'note', id: 'rales-inauguration' },
  },
  {
    id: 'pair-mentor',
    year: 2025,
    date: 'Fall',
    title: 'Paths to AI Research (PAIR) — Mentor',
    type: 'service',
    // Note is a draft until it's written up — unlink until then.
    // link: { kind: 'note', id: 'pair-mentor' },
  },
  {
    id: 'ms-robotics',
    year: 2025,
    date: 'Aug',
    title: 'Started MS Robotics, Carnegie Mellon',
    type: 'education',
    present: true,
  },
  {
    id: 'rales-fellowship',
    year: 2025,
    date: 'Aug',
    title: 'Rales Fellowship',
    detail: 'Aug 2025 – Aug 2027',
    type: 'award',
    link: { kind: 'note', id: 'rales-fellowship' },
  },
  {
    id: 'safe-2025',
    year: 2025,
    date: 'May',
    title: 'Graduate Research Assistant — AirLab',
    detail: 'SAFE Benchmark',
    type: 'research',
    link: project('safe'),
  },
  {
    id: 'eth-rss-2025',
    year: 2025,
    date: 'Jun',
    title: 'ETH Zurich Robotics Summer School',
    type: 'training',
    // Note is a draft until it's written up — unlink until then.
    // link: { kind: 'note', id: 'eth-rss-2025' },
  },
  {
    id: 'bs-ece',
    year: 2025,
    date: 'May',
    title: 'Graduated BS ECE, Carnegie Mellon',
    type: 'education',
  },
  {
    id: 'studybearbot',
    year: 2025,
    date: 'Jan–May',
    title: 'Study Bearbot — ECE Capstone',
    type: 'project',
    link: project('studybearbot'),
  },

  // ---------------------------------------------------------- 2024
  {
    id: 'up2',
    year: 2024,
    date: 'Nov–Dec',
    title: 'Up2 — Web App Project',
    type: 'project',
    link: project('up2'),
  },
  {
    id: 'swe-outreach',
    year: 2024,
    date: '—',
    title: 'SWE Outreach Committee Member',
    type: 'service',
    // Note is a draft until it's written up — unlink until then.
    // link: { kind: 'note', id: 'swe-outreach' },
  },
  {
    id: 'msk',
    year: 2024,
    date: 'Jun–Aug',
    title: 'Software Engineering Intern',
    detail: 'Memorial Sloan Kettering Cancer Center',
    type: 'industry',
    link: project('msk'),
  },
  {
    id: 'vivian',
    year: 2024,
    date: 'Feb',
    title: 'Project Vivian — A Caribbean Voice Assistant',
    detail: 'SheInnovates Hackathon',
    type: 'project',
    link: project('vivian'),
  },
  {
    id: 'safe-2024',
    year: 2024,
    date: 'Mar–May',
    title: 'Undergraduate Research Assistant — AirLab',
    detail: 'SAFE Project',
    type: 'research',
    link: project('safe'),
  },

  // ---------------------------------------------------------- 2023
  {
    id: 'hri-2023',
    year: 2023,
    date: 'Nov–Dec',
    title: 'Human-Robot Interaction Research Project',
    detail: 'Accent variability in robot speech recognition',
    type: 'research',
    link: project('hri'),
  },
  {
    id: 'inverse-rendering',
    year: 2023,
    date: 'Sep–Dec',
    title: 'AirLab Wildfire Project — Inverse Rendering',
    type: 'research',
    link: project('inverse-rendering'),
  },
  {
    id: 'firevision',
    year: 2023,
    date: 'May–Sep',
    title: 'AirLab Wildfire Project — FIReVision',
    detail: 'Photorealistic thermal infrared simulator',
    type: 'research',
    link: project('firevision'),
  },
  {
    id: 'ipp',
    year: 2023,
    date: 'Jan–May',
    title: 'AirLab — Informative Path Planning (IPP)',
    type: 'research',
    link: project('ipp'),
  },
  {
    id: 'joined-airlab',
    year: 2023,
    date: 'Jan',
    title: 'Joined AirLab as an Undergraduate Research Assistant',
    detail: 'via HURAY',
    type: 'research',
    link: project('research'),
  },

  // ---------------------------------------------------------- 2022
  {
    id: 'jada-house',
    year: 2022,
    date: 'Oct–Dec',
    title: 'JADA House Website Redesign',
    type: 'project',
    link: project('jada-house'),
  },

  // ---------------------------------------------------------- 2021
  {
    id: 'started-cmu',
    year: 2021,
    date: 'Aug',
    title: 'Started at Carnegie Mellon University',
    type: 'education',
  },
  {
    id: 'suffolk-scholarship',
    year: 2021,
    date: 'Jun',
    title: 'Suffolk County Highway Superintendent Association Scholarship',
    detail: 'Awarded by essay contest, Town of Babylon',
    type: 'award',
    link: { kind: 'note', id: 'suffolk-scholarship' },
  },
  {
    id: 'hs-grad',
    year: 2021,
    date: 'Jun',
    title: 'Graduated North Babylon High School',
    type: 'education',
  },
];

/* Coursework is collapsed by default — present for anyone who
   wants it (PhD apps), invisible during a normal scan. */
export const COURSEWORK: Record<number, string[]> = {
  2026: ['Robot Learning (Deep Reinforcement Learning)', 'Embodied AI Safety'],
  2025: [
    'Mobile Robots',
    'Machine Learning',
    'Math Fundamentals for Robotics',
    'Applied Cryptography',
    'ECE Capstone',
    'Fundamentals of Semiconductor Devices',
  ],
  2024: [
    'Concepts of Robotics',
    'Ethics & Robotics',
    'Computer Systems',
    'Computer Security',
    'Signals & Systems',
    'Web Application Development',
    'Experimental Physics',
  ],
  2023: [
    'Computer Vision',
    'Human-Robot Interaction',
    'Data Structures & Algorithms',
    'Physics III',
    'Linear Algebra',
    'Probability & Statistics',
    'Data-focused Python',
  ],
  2022: [
    'Intro to ECE',
    'Physics II',
    'Discrete Math',
    'Information Assurance',
    'StuCo: Fun with Robots',
  ],
  2021: ['Intro to MechE', 'Calculus II', 'Physics I'],
};
