import type { Note } from '../types';

const note: Note = {
  id: 'swe-outreach',
  filename: 'swe_outreach.txt',
  title: 'SWE Outreach Committee',
  date: '2024', // TODO(kayla): set the real date range
  summary: 'Society of Women Engineers — outreach committee member.',
  tags: ['outreach', 'swe'],
  // Hidden until the write-up exists — every section is still a bracketed prompt.
  // Flip back to false to publish; the timeline row in data/timeline.ts
  // has its `link` commented out to match.
  draft: true,
  sections: [
    {
      heading: 'What it was',
      paragraphs: [
        // '[What the outreach committee did and what your term looked like.]',
      ],
    },
    {
      heading: 'What I did',
      paragraphs: [
        // '[Events you ran or helped run, and who they reached.]',
      ],
    },
    {
      heading: 'What I learned',
      paragraphs: [
        // '[If this one turns out to be thin, it is fine to delete this note and drop the link — a short honest timeline row beats a padded write-up.]',
      ],
    },
  ],
};

export default note;
