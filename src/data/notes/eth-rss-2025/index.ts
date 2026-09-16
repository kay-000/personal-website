import type { Note } from '../types';

// TODO(kayla): unverified — I never checked this against an official
// page. Confirm the real name, dates and length before publishing.
const note: Note = {
  id: 'eth-rss-2025',
  filename: 'eth_summer_school.txt',
  title: 'ETH Zurich Robotics Summer School',
  date: 'June 2025',
  // summary: '[One line on what it was.]',
  summary: '',
  tags: ['summer school', 'switzerland'],
  // Hidden until the write-up exists — every section is still a bracketed prompt.
  // Flip back to false to publish; the timeline row in data/timeline.ts
  // has its `link` commented out to match.
  draft: true,
  captions: {
    // 'f246327e-e9cb-4a2a-8652-04589bb6cb48-2.mp4':
    //   '[Aerial footage of the campus. Is this yours, or from the school? Worth saying either way.]',
  },
  sections: [
    {
      heading: 'What it was',
      paragraphs: [
        // '[What the summer school covered, who taught it, how long it ran, and how you got in.]',
      ],
    },
    {
      heading: 'What I did',
      paragraphs: [
        // '[Which labs you worked in, what robots you touched, what the project was.]',
      ],
    },
    {
      heading: 'What I learned',
      paragraphs: [
        // '[What shifted in your thinking. Tie it to your safety and navigation interests if it connects — and to the Karlsruhe school a year later, if the two built on each other.]',
      ],
    },
  ],
};

export default note;
