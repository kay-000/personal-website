import type { Note } from '../types';

const note: Note = {
  id: 'fzi-kit-2026',
  filename: 'walking_robots_summer_school.txt',
  title: 'Towards Walking Robots in Domestic Environments',
  date: 'August 3–7, 2026, Karlsruhe, Germany',
  summary:
    'A week of legged-robot autonomy with FZI and KIT, ending in a live challenge.',
  tags: ['summer school', 'legged robots', 'ROS 2', 'germany'],
  draft: false,
  order: ['5n3a5002.jpg'],
  captions: {
    '5n3a5002.jpg': 'Kayla kneeling between a Spot and a Go2 in front of the RimA Summer School banner.',
    '5n3a4999.jpg': 'Kayla standing between a Spot with an arm and a Go2 in the RimA test area.',
    '5n3a4940.jpg': 'Kayla\'s group crouching with a Spot and a Go2 in front of the RimA banner.',
    '5n3a4543.jpg': 'The RimA 2026 participants and organizers with a Spot and four Go2s outside FZI.',
    '5n3a4397.jpg': 'A speaker giving a talk to participants in the atrium.',
    '5n3a4357.jpg': 'Two instructors demonstrating a red quadruped robot to participants in a classroom.',
    '23a74feb-6312-445f-b05c-c862cf8f6fd7.jpg': 'Kayla\'s group crouching around a Go2 in the lab while a teammate holds its controller.',
    '4d7ce61e-2b32-4c8d-b3f1-290d5bcb6641.jpg': 'Kayla and her group with a Go2 in the lab.',
    '5n3a4931.jpg': 'Kayla\'s group standing with a Spot and a Go2 in the RimA test area.',
  },
  sections: [
    {
      heading: 'What it was',
      paragraphs: [
        'A five-day summer school in Karlsruhe run by the FZI Research Center for Information Technology in cooperation with the Karlsruhe Institute of Technology, on making walking robots work in domestic environments — 3D mapping, semantics, machine learning, ROS 2, and behavior trees for unknown and dynamic spaces.',
        'It was fully funded, and I was one of the participants selected from 450 applicants worldwide. The week was hands-on, deploying on Boston Dynamics Spot and Unitree Go2.',
        // '[Add: how you found it, why you applied, and what it meant to get in as a first-year MS student when the target group was PhD and final-year MSc.]',
      ],
    },
    // Unwritten sections — uncomment once the prose replaces the prompts.
    // {
    //   heading: 'What I did',
    //   paragraphs: [
    //     '[Which group you were on, and which of the domestic problems you tackled — the challenges were framed around things like clothes and shoes as obstacles on the floor.]',
    //     '[The hardware: Unitree Go2 and Boston Dynamics Spot with an arm, for navigation, perception and manipulation. Say what you actually got running on them.]',
    //     '[The Friday challenge: what your group presented in the mock domestic course, and how it went.]',
    //   ],
    // },
    // {
    //   heading: 'What I learned',
    //   paragraphs: [
    //     '[The important one. Talks that stuck: Sven Behnke (Bonn) on structured perception and planning for cognitive service robots, Barbara Bruno (KIT) on socially-aware navigation for everyday robots, Philip Arm on legged robots from space to industry.]',
    //     '[This connects directly to your SAFE work — domestic environments are exactly the "uncertain, dynamic" case. What did a week of watching legged robots fail in a living room teach you about evaluating safe navigation? That link is the most valuable thing you can write here.]',
    //   ],
    // },
  ],
};

export default note;
