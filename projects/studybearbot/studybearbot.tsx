export default {
  id: "studybearbot",
  name: "Study Bearbot",
  type: "project" as const,
  content: (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <iframe
          src="https://drive.google.com/file/d/1dhykhD6Cyhup7EtJELKrepAxROEMVOA2/preview"
          allow="autoplay"
          style={{
            width: '100%',
            maxWidth: '640px',
            aspectRatio: '16/9',
            border: 'none',
            borderRadius: '8px',
          }}
        />

      </div>
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
  localDemo: "/projects/studybearbot/studybearbot_website_demo.mov",
  github: "https://github.com/kay-000/study-bear-bot",
  children: [                                                                                                                  
    {                                                                                                                          
      id: 'studybearbot-report',                                                                                               
      name: 'Final Report.pdf',                                                                                                
      type: 'file' as const,                                                                                                   
      fileSrc: '/projects/studybearbot/Final Report.pdf',                                                 
    },                                                                                                                         
    {                                                                                                                          
      id: 'studybearbot-schematic',                                                                                            
      name: 'Poster.pdf',                                                                                                   
      type: 'file' as const,                                                                                                   
      fileSrc: '/projects/studybearbot/PublicDemo_StudyBearbot_S25.pdf',                                       
    },                                                                                                                         
  ],     
};
