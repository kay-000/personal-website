import AutoLoopVideo from '../../../src/components/AutoLoopVideo';
import { asset } from '../../../src/utils/asset';

export default {
  id: "studybearbot",
  name: "Study Bearbot",
  type: "project" as const,
  content: (
    <>
      {/* Was a Google Drive iframe, which cannot autoplay or loop and
          depends on an external service. This is the local showcase
          clip that already ships with the demo site. */}
      <AutoLoopVideo
        src={asset('projects/studybearbot/studybear_site/client/videos/bearbot_showcase.mp4')}
      />

      <p>
        Studying is a stressful endeavor. Whether it's for a final exam at
        university or for a weekly quiz in middle school, everyone needs a short break
        every now and then. For those who get stressed out easily and have shorter
        attention spans, what better way to take your mind off of learning briefly
        than a friend waiting to comfort you?
      </p>

      <p>
        This is why we created StudyBearBot, a robot that serves as an interactive
        desktop companion designed to alleviate stress while keeping users engaged in
        their study space. This study robot has reactive sensors, fidget device
        components, a soft squeezable exterior, the option for soothing music, and
        a built-in scent diffuser for light aromatherapy to calm the users nerves
        without removing them from the studying headspace.
      </p>

      <p>
        Built for the ECE 18-500 capstone course.
        Check out the <a href="https://course.ece.cmu.edu/~ece500/projects/s25-teame6/introduction-and-project-summary/" target="_blank">website</a> for more info on the design process.
      </p>

    </>
  ),
  techStack: ["React", "TypeScript"],
  // The built companion web app, opened in its own window. Run
  // `npm run fix-demo` if you change vite's base or rebuild it.
  localDemo: asset('projects/studybearbot/studybear_site/client/index.html'),
  github: "https://github.com/kay-000/study-bear-bot",
  children: [
    {
      id: 'studybearbot-report',
      name: 'Final Report.pdf',
      type: 'file' as const,
      fileSrc: asset('projects/studybearbot/Final Report.pdf'),
    },
    {
      id: 'studybearbot-schematic',
      name: 'Poster.pdf',
      type: 'file' as const,
      fileSrc: asset('projects/studybearbot/PublicDemo_StudyBearbot_S25.pdf'),
    },
  ],
};
