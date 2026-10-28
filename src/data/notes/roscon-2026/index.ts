import type { Note } from '../types';

const note: Note = {
  id: 'roscon-2026',
  filename: 'roscon_global.txt',
  title: 'ROSCon Global 2026 Scholarship',
  date: 'September 2026, Toronto',
  summary:
    'Scholarship to attend the fifteenth ROSCon Global, the developer conference for the Robot Operating System.',
  tags: ['scholarship', 'conference', 'ROS 2', 'canada'],
  draft: false,
  order: ['img_2525.jpg'],
  captions: {
    'img_2525.jpg': 'Kayla holding her badge in front of the ROSCon Global 2026 Toronto backdrop.',
    'img_7255.jpg': 'The 2026 ROSCon scholarship recipients, including Kayla, in front of the conference screen.',
  },
  sections: [
    {
      paragraphs: [
        'I received a ROSCon Global 2026 scholarship covering full conference registration, accommodation, and travel to attend the fifteenth ROSCon in Toronto, a three-day developer conference on the Robot Operating System.',
        'Alongside the main conference I took the workshop "Mastering the Jazzy RMW: A Performance-Driven Framework for ROS 2 Middleware Selection and Tuning."',
      ],
    },
  ],
};

export default note;
