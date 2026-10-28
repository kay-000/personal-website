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
        id: 'firevision',
        name: 'FIReVision',
        type: 'project',
        content: (
          <>
            <p>
              FIReVision is a photorealistic thermal infrared wildfire simulator,
              built on AirSim and Unreal Engine 5 as part of the AirLab Wildfire
              Project, which aims to give firefighters real-time situational
              awareness during wildfires.
            </p>
            <p>
              Drones are a natural fit for watching a fire, but the simulators
              available to train and test them were thin. Most were 2D, lacked
              realistic drone dynamics, had no camera-based perception, and left
              out the things that matter on a fireline, like crews and vehicles.
              FIReVision renders realistic RGB and thermal imagery with dynamic
              smoke, so navigation and detection get tested in degraded,
              hazardous conditions, and it labels its own data for object
              detection and depth estimation.
            </p>
            <p>
              I built the automated synthetic-data pipeline that generated more
              than 15,000 RGB, thermal, depth and segmentation images for
              training perception models, along with the Python tools for drone
              control, real-time object detection, data collection and pipeline
              validation. I also made the smoke, using FluidNinja in Unreal
              Engine, so perception could be tested under degraded visibility.
            </p>
            <p>
              I presented FIReVision as a poster at CMU's Meeting of the Minds
              Undergraduate Research Symposium in May 2024, and put together the
              technical demos used in stakeholder and grant presentations.
            </p>
          </>
        ),
        techStack: ['Python', 'Unreal Engine 5', 'AirSim', 'FluidNinja'],
        // Video lives in src/assets/pictures/firevision/ and leads the page
        captions: {
          'firevision_demo.mp4': 'Demo video of FIReVision showing simulated forest scenes with thermal, depth, and object detection views.',
        },
        children: [
          { id: 'firevision-poster', name: 'Poster.pdf', type: 'file' as const, fileSrc: asset('projects/firevision/Poster.pdf') },
          { id: 'firevision-slides', name: 'Presentation.pdf', type: 'file' as const, fileSrc: asset('projects/firevision/Presentation.pdf') },
          { id: 'firevision-slides-short', name: '3-Minute Talk.pdf', type: 'file' as const, fileSrc: asset('projects/firevision/3-Minute Talk.pdf') },
        ],
      },
      /* Hidden for now. Uncomment to bring Inverse Rendering back.
      {
        id: 'inverse-rendering',
        name: 'Inverse Rendering',
        type: 'project',
        content: (
          <>
            <p>
              Part of the AirLab Wildfire Project, fall 2023. I built small
              vegetation scenes in Blender, with grass, shrubs and bare trees,
              and rendered each scene from many camera angles.
            </p>
            <p>
              I also set up the plant materials, mapping a leaf color texture
              and a leaf translucency texture onto Blender's Principled BSDF
              shader.
            </p>
          </>
        ),
        techStack: ['Python', 'Blender'],
        // Renders live in src/assets/pictures/inverse-rendering/
        order: ['view-08.jpg', 'plant-render.jpg', 'leaf-material-nodes.jpg'],
        captions: {
          'view-08.jpg': 'Blender render of a vegetation patch with grass, shrubs and bare trees, seen from above at an angle.',
          'plant-render.jpg': 'Test render of a potted plant in Blender.',
          'leaf-material-nodes.jpg': 'Blender shader nodes mapping leaf color and leaf translucency textures onto a Principled BSDF.',
          'view-00.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-01.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-02.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-03.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-06.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-07.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-10.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-12.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-13.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-14.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-15.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-18.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-19.jpg': 'The vegetation scene rendered from another camera angle.',
          'view-21.jpg': 'The vegetation scene rendered from another camera angle.',
        },
      }, */
      {
        id: 'ipp',
        name: 'Informative Path Planning (IPP)',
        type: 'project',
        content: (
          <>
            <p>
              Part of the AirLab Wildfire Project, 2023. I designed wireframes
              for an interface to plan and monitor drone missions over a
              wildfire.
            </p>
            <p>
              On the Mission Design screen, the user uploads a map of the fire
              area and sets the mission parameters. The Mission Execution
              screen shows an interactive map of the drones and fires beside a
              camera and parameter panel. Clicking a drone or a fire zooms the
              map to that area and narrows the panel to its details, including
              assets near the heat such as people and trucks. Parameters can
              also be edited while the mission runs.
            </p>
          </>
        ),
        techStack: ['Python'],
        children: [
          {
            id: 'ipp-wireframes',
            name: 'IPP GUI Wireframes.pdf',
            type: 'file' as const,
            fileSrc: asset('projects/ipp/IPP GUI Wireframes.pdf'),
          },
        ],
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
            'The Infernot team presenting the opening slide of their pitch at the Swartz Center.',
          'img_7313.mp4': 'The team presenting the wildfire threat slide during the Infernot pitch.',
          'img_5606.jpg':
            'The five-person Infernot team in front of Swartz Center for Entrepreneurship banners.',
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
          'img_3540.jpg': 'Kayla and four teammates in Wireless Innovation Hackathon shirts.',
          'img_3533.mp4': 'Teammates at the hackathon, followed by Nightingale running at the demo table.',
          'img_3512.jpg':
            'The first Nightingale prototype on a breadboard with buttons, a microphone, and a speaker.',
          'img_3522.jpg':
            'Terminal output from Nightingale recording, cleaning, and transcribing audio.',
          'img_3523.jpg':
            'Kayla taking a selfie with the team at the demo table.',
          'img_3515.jpg': 'The team\'s table with laptops and boxes of electronic parts.',
          'img_3508.jpg': 'Kayla taking a selfie with the team at a cafe.',
        },
      },
      {
        id: 'vivian',
        name: 'Project Vivian — A Caribbean Voice Assistant',
        type: 'project',
        content: (
          <>
            <p>
              Vivian is a voice assistant for Caribbean English-based
              languages, built with Julie Lawler and Brandon Yasin at the
              SheInnovates Hackathon in February 2024. Most speech-to-text
              systems fail on Caribbean creoles, which leaves a lot of people
              shut out of voice technology.
            </p>
            <p>
              You speak to Vivian in creole. She transcribes it, translates it
              into standard English, works out a response, and answers out loud.
              I led the technical design of the speech pipeline, built on
              Whisper for transcription and ElevenLabs for her voice.
            </p>
            <p>
              The hardest part was data. There isn't enough recorded Caribbean
              speech to train a model properly, which showed how much more
              collection and fine-tuning underrepresented dialects still need.
            </p>
          </>
        ),
        techStack: ['Python', 'Whisper', 'ElevenLabs', 'Pygame'],
        children: [
          {
            id: 'vivian-deck',
            name: 'SheInnovates Presentation.pdf',
            type: 'file' as const,
            fileSrc: asset('projects/vivian/SheInnovates Presentation.pdf'),
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
        techStack: ['React', 'Typescript', 'C#', '.NET', 'SQL'],
        github: 'https://github.com/kay-000/msk-chatbot-app',
        // Lead with the cohort photo rather than the farewell video
        order: ['20240610_170321583_ios.jpg'],
        captions: {
          '20240610_170321583_ios.jpg':
            'The 2024 MSK DigITs interns, including Kayla, in the office.',
          'thank-you-interns-digits-internship-2024.mp4':
            'The DigITs team\'s 2024 thank-you video for the interns.',
          'img_8733.jpg':
            'Kayla and other interns building a structure out of pencils during a team-building exercise.',
          'img_8885.jpg': 'Kayla and other interns at an outdoor table by the water.',
          'ffb9f1cf-88fe-45d8-aa60-1fcd5543592c.jpg':
            'Interns clapping at an outdoor table during an outing.',
          'image-1-.jpg': 'Kayla and six others on a video call.',
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
