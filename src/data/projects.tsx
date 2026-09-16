import React from 'react';
import { attachPhotos } from './photos';
import { asset } from '../utils/asset';
import type { Photo } from './notes/types';

// Import project .ts json-style files
import studybearbot from '../../public/projects/studybearbot/studybearbot.tsx';

/* ============================================================
   The Projects tree.

   Photos work the same way they do for notes: drop files into
   src/assets/pictures/<item-id>/ and they attach to the item with
   that id automatically. Caption them with a `captions` map keyed
   by filename. See src/data/photos.ts.
   ============================================================ */

export type FolderItem = {
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

  /** Captions keyed by filename, for photos in src/assets/pictures/<id>/ */
  captions?: Record<string, string>;
  /** Filenames pinned to the front. The first one becomes the hero. */
  order?: string[];
  /** Filled in automatically from the photo folder. Do not set by hand. */
  photos?: Photo[];
};

/* One honest line for projects without a write-up yet. The photos,
   tech stack and links still render, so the page stands on its own
   instead of looking half-built. Replace with real JSX when you get
   to it, following Problem, Approach, Result. */
// const TODO = (what: string) => (
//   <p className="project-stub">{what}</p>
// );

// Your folder structure
const TREE: FolderItem[] = [
  {
    id: 'research',
    name: 'Research',
    type: 'folder',
    children: [
      {
        id: 'safe',
        name: 'The SAFE Project',
        type: 'project',
        // content: TODO('SAFE Benchmark — AirLab. Evaluation framework for adaptive safety behavior in autonomous navigation.'),
        techStack: ['Python', 'ROS'],
      },
      {
        id: 'adversarial',
        name: 'Adversarial AI Project',
        type: 'project',
        // content: TODO('Adversarial AI — AirLab, 2026–present.'),
        techStack: ['Python'],
      },
      {
        id: 'firevision',
        name: 'FIReVision',
        type: 'project',
        // content: TODO('AirLab Wildfire Project, May–Sept 2023. A photorealistic thermal infrared simulator.'),
        techStack: ['Python'],
      },
      {
        id: 'inverse-rendering',
        name: 'Inverse Rendering',
        type: 'project',
        // content: TODO('AirLab Wildfire Project, Sept–Dec 2023.'),
        techStack: ['Python'],
      },
      {
        id: 'ipp',
        name: 'Informative Path Planning (IPP)',
        type: 'project',
        // content: TODO('AirLab, Jan–May 2023. Your first project after joining via HURAY.'),
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
            fileSrc: asset('projects/hri_project/HRI Final Report.pdf'),
          },
          {
            id: 'hri-final-pres',
            name: 'Presentation',
            type: 'file' as const,
            fileSrc: asset('projects/hri_project/HRI Final Project Presentation.pdf'),
          },
        ],
      },
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    children: [
      studybearbot as FolderItem,
      {
        id: 'up2',
        name: 'Up2',
        type: 'project',
        // content: TODO('Web app project, Nov–Dec 2024.'),
        // techStack: ['[stack]'],
      },
      {
        id: 'jada-house',
        name: 'JADA House Website Redesign',
        type: 'project',
        // content: TODO('Website redesign, Oct–Dec 2022.'),
        // techStack: ['[stack]'],
      },
    ],
  },
  {
    id: 'hackathons',
    name: 'Hackathons',
    type: 'folder',
    children: [
      {
        id: 'infernot',
        name: 'INFERNOT',
        type: 'project',
        content: (
          <>
            <p>
              INFERNOT is a climate resilience venture applying AI and robotics
              to protect homes and communities threatened by wildfires.
            </p>
            <p>
              The team formed at Carnegie Mellon's Hack-A-Startup in October
              2025, an event run by the Swartz Center for Entrepreneurship that
              drew more than 250 students across over 30 teams. We were selected
              as one of the top 15 teams and finished in 4th place, then carried
              on for a further two weeks refining the prototype and speaking
              with wildfire experts.
            </p>
            <p>
              I joined as the robotics lead alongside Shreyas Chavan (MS
              Mechanical Engineering), John Sparks (MS AI Engineering) and
              Andrew Noble (MS Robotic Systems Development). My prior wildfire
              research at the AirLab fed directly into the work, having built
              FIReVision, a photorealistic thermal infrared simulator, and
              worked on inverse rendering for the same project.
            </p>
            {/* <p>
              <i>
                [Add what you specifically owned on the prototype, and where the
                venture stands now.]
              </i>
            </p> */}
          </>
        ),
        // techStack: ['[stack]'],
        children: [
          {
            id: 'infernot-deck',
            name: 'Hack-A-Startup Deck.pdf',
            type: 'file' as const,
            fileSrc: asset('projects/infernot/INFERNOT_HackAStartup.pdf'),
          },
        ],
        captions: {
          'img_7312.mp4':
            'Pitching Infernot as a wildfire defense system at the Swartz Center.',
          // 'img_7313.mp4': '[What is happening in this clip?]',
          'img_5606.jpg':
            'The team at the Swartz Center for Entrepreneurship after the pitch.',
        },
      },
      {
        id: 'nightingale',
        name: 'Nightingale — Voice Cleaner & Transcriber',
        type: 'project',
        content: (
          <>
            <p>
              Nightingale is a voice cleaner and transcriber, built in a weekend
              at the Wireless Innovation Hackathon for Accessibility in October
              2025. It was aimed at making speech easier to capture accurately
              in noisy rooms, where ordinary transcription tends to fall apart.
            </p>
            <p>
              The device runs on a Raspberry Pi with a microphone, speaker and a
              single record button. Pressing it captures ten seconds of audio,
              passes it through SoX to strip out background noise, then hands the
              cleaned track to Whisper for transcription and writes the result to
              a text file. Cleaning before transcribing rather than leaning on
              the model alone was the decision that made the difference.
            </p>
            {/* <p>
              <i>[How it placed, and what you would fix given more than a weekend.]</i>
            </p> */}
          </>
        ),
        // Read off the photos: a Pi running DietPi, SoX for noise
        // reduction, Whisper for transcription. Confirm and extend.
        techStack: ['Python', 'Whisper', 'SoX', 'Raspberry Pi'],
        // Default would hero img_3533.mp4, since videos sort first.
        // Pinning a still here makes it the hero instead.
        order: ['img_3540.jpg'],
        captions: {
          'img_3540.jpg': 'The team at the Wireless Innovation Hackathon.',
          'img_3533.mp4': 'Hands in before the final presentations.',
          'img_3512.jpg':
            'The prototype on the breadboard, with the record button, microphone and speaker wired up.',
          'img_3522.jpg':
            'The pipeline running end to end. Record for ten seconds, clean the background noise with SoX, then transcribe with Whisper.',
          'img_3523.jpg':
            'Working through the build docs on the projector late in the night.',
          'img_3515.jpg': 'The workbench partway through the build.',
          'img_3508.jpg': 'Coffee break with the team.',
        },
      },
      {
        id: 'vivian',
        name: 'Project Vivian — A Caribbean Voice Assistant',
        type: 'project',
        // content: TODO('SheInnovates Hackathon, Feb 2024.'),
        // techStack: ['[stack]'],
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
        techStack: ['React', 'Typescript', 'C#', '.NET', 'SQL'],
        github: 'https://github.com/kay-000/msk-chatbot-app',
        // Lead with the cohort photo rather than the farewell video
        order: ['20240610_170321583_ios.jpg'],
        captions: {
          '20240610_170321583_ios.jpg':
            'The 2024 DigITs intern cohort at Memorial Sloan Kettering in New York.',
          'thank-you-interns-digits-internship-2024.mp4':
            'The thank-you video DigITs put together for the 2024 interns.',
          'img_8733.jpg':
            'A team-building exercise during the internship, building a structure out of pencils.',
          'img_8885.jpg': 'Interns at a summer social along the water.',
          'ffb9f1cf-88fe-45d8-aa60-1fcd5543592c.jpg':
            'More of the same afternoon.',
          // 'image-1-.jpg': '[What is this one?]',
        },
      },
    ],
  },
];

// Helper to find item by ID in nested structure
export const findItemById = (items: FolderItem[], id: string): FolderItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Full breadcrumb trail to an item, so deep links land inside the tree
export const findPath = (items: FolderItem[], id: string, trail: FolderItem[] = []): FolderItem[] | null => {
  for (const item of items) {
    const next = [...trail, item];
    if (item.id === id) return next;
    if (item.children) {
      const found = findPath(item.children, id, next);
      if (found) return found;
    }
  }
  return null;
};


/** Attach discovered photos, honoring each item's order and captions. */
const withPhotos = (items: FolderItem[]): FolderItem[] =>
  items.map((item) => {
    const photos = attachPhotos(item.id, {
      captions: item.captions,
      order: item.order,
    });
    return {
      ...item,
      ...(photos.length ? { photos } : {}),
      ...(item.children ? { children: withPhotos(item.children) } : {}),
    };
  });

export const PROJECT_TREE: FolderItem[] = withPhotos(TREE);

/** Every id in the tree, so photo folders can be matched against it. */
export const PROJECT_IDS: string[] = (function collect(items): string[] {
  return items.flatMap((i) => [i.id, ...(i.children ? collect(i.children) : [])]);
})(PROJECT_TREE);
