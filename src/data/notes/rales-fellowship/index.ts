import type { Note } from '../types';

// Covers both the fellowship itself and the October ceremony —
// two timeline rows, one story.
const note: Note = {
  id: 'rales-fellowship',
  filename: 'rales_fellowship.txt',
  title: 'The Rales Fellowship',
  date: 'August 2025 – August 2027',
  // summary: '[One line on what the fellowship is.]',
  summary: 'Carnegie Mellon Rales Fellowship, second cohort, 2025–2027.',
  tags: ['fellowship', 'cmu'],
  draft: false,
  captions: {
    'rales-finalists.jpg':
      'Rales Fellowship finalists on a staircase during the selection weekend, March 2025.',
  },
  sections: [
    // Unwritten sections — uncomment once the prose replaces the prompts.
    // {
    //   heading: 'What it is',
    //   paragraphs: [
    //     '[What the Rales Fellowship is and what it funds. Most readers will not know it — one clear sentence here does a lot of work.]',
    //     '[How you applied, how selective it is, and what you think got you in. You are in the second cohort.]',
    //   ],
    // },
    {
      heading: 'The induction',
      paragraphs: [
        'The October 2025 induction ceremony has its own write-up in Notes.',
      ],
    },
    // {
    //   heading: 'What it has meant',
    //   paragraphs: [
    //     '[What the fellowship actually changed about how you work — research you could take on, people it connected you to, risks it let you take.]',
    //   ],
    // },
  ],
};

export default note;
