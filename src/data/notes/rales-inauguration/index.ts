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
      'The 2025 Rales Fellows and university leaders on stage at the induction ceremony.',
    'img_4783.jpg':
      'Kayla shaking hands with Josh Rales on stage as she is introduced.',
    'img_4712.jpg': 'Kayla signing the Rales Fellows book on stage.',
    'img_4900.jpg': 'Kayla shaking hands with the speaker at the podium.',
    // Original, pending the third person's name:
    // 'With Josh Rales, President of the Rales Foundation, and [name], in front of the CMU Rales Fellows banner.'
    'img_4806.jpg':
      'Kayla on stage with Josh Rales and another guest in front of the CMU Rales Fellows banner.',
    'img_4798.jpg':
      'Josh Rales speaking to the audience from the podium.',
    'img_4791.jpg': 'Wrapped gifts with CMU Rales Fellows tags laid out on a table.',
    'img_4772.jpg': 'Kayla and other guests standing around a cocktail table at the reception.',
    'img_4738.jpg':
      'Kayla seated with Martial Hebert and other guests at a dinner table.',
    // 'img_4854.jpg': 'More of the dinner, talking with [name].',
    'img_4854.jpg': 'Kayla talking with Martial Hebert across the dinner table.',
    // 'img_3364.jpg': 'With Josh Rales and [name] at the reception.',
    'img_3364.jpg': 'Kayla taking a selfie with Josh Rales and another guest at the reception.',
    'd4bb1fb9-0058-47e6-9716-270e24b4fad2.jpg':
      'Kayla and other Rales Fellows posing with Josh Rales at the reception.',
    // Uncaptioned until you say what it is — renders with no caption.
    'screenrecording_10-02-2025-16-56-19_1.mp4':
      'Livestream footage of Kayla being introduced, signing the fellows book, and posing on stage with Josh Rales.',
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
