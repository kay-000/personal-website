import type { Note } from '../types';

const note: Note = {
  id: 'mpowerhouse',
  filename: 'teaching_robotics.txt',
  title: 'Teaching Robotics with MPowerhouse',
  date: '2026', // TODO(kayla): set the real date range
  summary: 'Volunteering to teach robotics to kids.',
  tags: ['outreach', 'teaching'],
  // Hidden until the write-up exists — every section is still a bracketed prompt.
  // Flip back to false to publish; the timeline row in data/timeline.ts
  // has its `link` commented out to match.
  draft: true,
  sections: [
    {
      heading: 'What it was',
      paragraphs: [
        // '[What MPowerhouse is, what the program looked like, how often you went, and the ages of the kids.]',
      ],
    },
    {
      heading: 'What I did',
      paragraphs: [
        // '[What you actually taught, how you structured a session, and what the kids built.]',
      ],
    },
    {
      heading: 'What I learned',
      paragraphs: [
        // '[Teaching forces you to understand something differently — what did explaining robotics to kids clarify for you? Outreach reads as generic on most sites; a specific answer here is what makes it land.]',
      ],
    },
  ],
};

export default note;
