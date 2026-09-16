import type { Note } from '../types';

const note: Note = {
  id: 'sii-2026',
  filename: 'ieee_sice_sii.txt',
  title: 'Volunteering at IEEE/SICE SII 2026',
  date: 'January 2026 · Cancún, Mexico',
  summary:
    'IEEE/SICE International Symposium on System Integration — conference volunteer.',
  tags: ['conference', 'service', 'mexico'],
  order: ['96901018-f147-4470-a0d8-c017b1edfafb.jpg'],
  captions: {
    '96901018-f147-4470-a0d8-c017b1edfafb.jpg':
      'The volunteer team under the SII 2026 banner in Cancún.',
    'dsc_0159.jpg': 'Working the registration desk, handing out attendee badges.',
    'dsc_1254.jpg':
      'An attendee teleoperating a humanoid robot through a VR headset at one of the demo stands.',
    'dsc_1108.jpg': 'The volunteer team on the rooftop at the end of a long day.',
    'dsc_1297.jpg': 'Dinner with the other volunteers.',
    'dsc_2260.jpg': 'The volunteers at the beach reception.',
    'dsc_2287.jpg': 'At the beach reception on the last night.',
    '1bce553f-3214-4af4-9383-911f4bae84e9.jpg':
      'Obligatory stop at the Cancún sign with two of the other volunteers.',
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
