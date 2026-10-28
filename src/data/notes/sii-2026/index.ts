import type { Note } from '../types';

const note: Note = {
  id: 'sii-2026',
  filename: 'ieee_sice_sii.txt',
  title: 'Volunteering at IEEE/SICE SII 2026',
  date: 'January 2026, Cancún, Mexico',
  summary:
    'IEEE/SICE International Symposium on System Integration — conference volunteer.',
  tags: ['conference', 'service', 'mexico'],
  order: ['96901018-f147-4470-a0d8-c017b1edfafb.jpg'],
  captions: {
    '96901018-f147-4470-a0d8-c017b1edfafb.jpg':
      'SII 2026 volunteers, including Kayla, posing inside the conference venue in Cancún.',
    'dsc_0159.jpg': 'Kayla handing out materials to attendees at the registration table.',
    'dsc_1254.jpg':
      'An attendee in a VR headset teleoperating a humanoid robot, both giving a thumbs-up.',
    'dsc_1108.jpg': 'Kayla and the volunteer team posing on a rooftop.',
    'dsc_1297.jpg': 'Kayla and other volunteers eating dinner at a round table.',
    'dsc_2260.jpg': 'Kayla and other volunteers on the beach at the night reception.',
    'dsc_2287.jpg': 'Kayla on the beach on the last night of SII.',
    '1bce553f-3214-4af4-9383-911f4bae84e9.jpg':
      'Kayla and two other volunteers standing behind the Cancún sign at the beach.',
  },
  draft: false,
  sections: [
    {
      heading: 'What it was',
      paragraphs: [
        // Trailing prompt removed for publishing:
        // '... in January. [How you ended up volunteering.]'
        'SII 2026, the IEEE/SICE International Symposium on System Integration, was held in Cancún, Mexico in January.',
      ],
    },
    // Unwritten sections — uncomment once the prose replaces the prompts.
    // {
    //   heading: 'What I did',
    //   paragraphs: [
    //     '[Your actual role — sessions you ran, logistics you handled, people you helped.]',
    //   ],
    // },
    // {
    //   heading: 'What I learned',
    //   paragraphs: [
    //     '[Volunteering puts you in every room. Which talks or posters stuck, and did anything change what you want to work on? Name specific work if you can.]',
    //   ],
    // },
  ],
};

export default note;
