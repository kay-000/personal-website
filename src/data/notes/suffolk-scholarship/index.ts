import type { Note } from '../types';

// Source: Town of Babylon, June 16 2021
// https://www.instagram.com/p/CQMJP7oLRiz/
const note: Note = {
  id: 'suffolk-scholarship',
  filename: 'suffolk_scholarship.txt',
  title: 'Suffolk County Highway Superintendent Association Scholarship',
  date: 'June 2021',
  summary: 'The 2021 recipient, awarded through an essay contest.',
  tags: ['scholarship', 'north babylon'],
  draft: false,
  captions: {
    'award.jpg':
      'Kayla holding her scholarship check with Town of Babylon officials, June 2021.',
  },
  attachments: [
    {
      name: 'A Trivial Matter Of The Mind',
      src: 'notes/suffolk-scholarship/a-trivial-matter-of-the-mind.pdf',
    },
  ],
  sections: [
    {
      paragraphs: [
        'The Suffolk County Highway Superintendent Association runs this scholarship each year as an essay contest, open to graduating seniors living in the Town of Babylon who intend to study engineering, public works or public administration. Applicants write about why they are pursuing that field, and are encouraged to describe a local government project that impressed them or one they would like to see built.',
        'I was named the 2021 recipient as a senior at North Babylon High School, recognized by Town Supervisor Rich Schaffer, Deputy Supervisor Tony Martinez and the Town Board.',
        'The essay is attached below.',
      ],
    },
  ],
};

export default note;
