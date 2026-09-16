import type { Note } from '../types';

const note: Note = {
  id: 'rales-inauguration',
  filename: 'rales_induction.txt',
  title: 'Rales Fellows Induction Ceremony',
  date: 'October 2025',
  summary: 'Welcome reception and induction for the 2025 cohort of CMU Rales Fellows.',
  tags: ['rales fellowship', 'cmu'],
  draft: false,
  // Hero the cohort photo rather than the screen recording
  order: ['img_4692.jpg'],
  captions: {
    'img_4692.jpg':
      'The 2025 cohort of Carnegie Mellon Rales Fellows on stage at the welcome reception and induction ceremony.',
    'img_4783.jpg':
      'Being welcomed on stage, with my School of Computer Science and Robotics affiliation up on the screen behind.',
    'img_4712.jpg': 'Signing the Rales Fellows book during the ceremony.',
    'img_4900.jpg': 'Shaking hands at the podium after being inducted.',
    // Original, pending the third person's name:
    // 'With Josh Rales, President of the Rales Foundation, and [name], in front of the CMU Rales Fellows banner.'
    'img_4806.jpg':
      'With Josh Rales, President of the Rales Foundation, in front of the CMU Rales Fellows banner.',
    'img_4798.jpg':
      'Josh Rales, President of the Rales Foundation, addressing the incoming cohort.',
    'img_4791.jpg': 'Gifts laid out for the incoming fellows.',
    'img_4772.jpg': 'Fellows and program staff at the reception beforehand.',
    'img_4738.jpg':
      'Dinner conversation with Martial Hebert, Dean of the School of Computer Science.',
    // 'img_4854.jpg': 'More of the dinner, talking with [name].',
    'img_4854.jpg': 'More of the dinner.',
    // 'img_3364.jpg': 'With Josh Rales and [name] at the reception.',
    'img_3364.jpg': 'With Josh Rales at the reception.',
    'd4bb1fb9-0058-47e6-9716-270e24b4fad2.jpg':
      'A group of us from the cohort with Josh Rales.',
    // Uncaptioned until you say what it is — renders with no caption.
    // 'screenrecording_10-02-2025-16-56-19_1.mp4': '[What is this clip?]',
  },
  sections: [
    {
      paragraphs: [
        'In October 2025 Carnegie Mellon held the welcome reception and induction ceremony for the 2025 cohort of Rales Fellows, the second cohort of the program. Each of us was introduced by school and program, signed the fellows book, and was welcomed on stage by Josh Rales, President of the Rales Foundation.',
        // '[What the evening was actually like, and who you met. The cohort is the point of the fellowship, so a sentence on that goes further than a description of the ceremony.]',
      ],
    },
  ],
};

export default note;
