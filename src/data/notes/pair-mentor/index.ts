import type { Note } from '../types';

const note: Note = {
  id: 'pair-mentor',
  filename: 'pair_mentoring.txt',
  title: 'Mentoring with Paths to AI Research (PAIR)',
  date: 'Fall 2025 – present',
  summary: 'Mentoring students through the PAIR program at CMU.',
  tags: ['mentoring', 'cmu'],
  // Hidden until the write-up exists — every section is still a bracketed prompt.
  // Flip back to false to publish; the timeline row in data/timeline.ts
  // has its `link` commented out to match.
  draft: true,
  sections: [
    {
      heading: 'What it is',
      paragraphs: [
        // '[What PAIR does, who it serves, and why you joined as a mentor.]',
      ],
    },
    {
      heading: 'What I do',
      paragraphs: [
        // '[How mentoring actually works — how many students, how often you meet, what you help them with.]',
      ],
    },
    {
      heading: 'What I have learned',
      paragraphs: [
        // '[What mentoring has taught you about research itself, or about what you wish someone had told you earlier.]',
      ],
    },
  ],
};

export default note;
