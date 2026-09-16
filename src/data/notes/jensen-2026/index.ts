import type { Note } from '../types';

// Date confirmed from the photo filenames (260510F_Commencement_*).
const note: Note = {
  id: 'jensen-2026',
  filename: 'meeting_jensen_huang.txt',
  title: 'Welcoming Jensen Huang to Carnegie Mellon',
  date: 'May 10, 2026',
  summary:
    'Representing the Rales Fellowship when NVIDIA’s CEO visited campus before commencement.',
  tags: ['nvidia', 'cmu', 'rales fellowship', 'robot safety'],
  draft: false,
  captions: {
    'jensen-huang-cmu.mp4':
      'Walking into Margaret Morrison Neighborhood Commons with Jensen Huang, Dean Martial Hebert and Dean Burcu Akinci.',
    'commencement-1.jpg': 'With Jensen Huang before the demos began.',
    'commencement-3.jpg':
      'Talking through the student demos with him, robot controller on the table between us.',
    'commencement.jpg':
      'The full group of CMU robotics students who showed their work that day, with one of the humanoids off to the left.',
  },
  sections: [
    {
      paragraphs: [
        'A few hours before Carnegie Mellon’s 2026 commencement, Jensen Huang came to campus. Amy Burkert, our Vice Provost for Education, put my name forward to help welcome him and to represent the Rales Fellowship while I was there.',
        'I walked him into Margaret Morrison Neighborhood Commons with Martial Hebert, who deans the School of Computer Science, and Burcu Akinci, who deans the College of Engineering. Students from all over the robotics community had taken over the space with demos of what they had been building.',
        'When we got a chance to talk, I told him about the safety evaluation benchmark I am building for autonomous robots in the AirLab with Professor Sebastian Scherer. He said that evaluation is going to be very important in the future for robotics.',
        'That is the whole premise of what I work on, handed back to me by someone building the hardware this field runs on. The better these systems get, the less interesting it becomes to ask whether a robot can finish the task. The real question is whether anybody can show it stayed safe while doing it, and that is a much harder thing to prove than to claim. Hearing it treated as a priority instead of a box to tick afterward is the part of the day I keep turning over.',
        'Thanks to Pam Eichenbaum, Chelsea Blackburn Cohen, and everyone else who put the visit together.',
      ],
    },
  ],
};

export default note;
