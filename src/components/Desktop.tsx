import { useState } from 'react';
import Window from './Window.tsx';
import '../styles/Desktop.css';

function Desktop() {
  const [openWindows, setOpenWindows] = useState([
    { title: "Kayla_info.txt", content: <p>Blah</p> }
  ]);

  return (
    <>
      <div className="desktop-screen">
        {openWindows.map((window, index) => (
          <Window key={index} title={window.title}>
            {window.content}
          </Window>
        ))}
      </div>
      <Bar openWindows={openWindows} setOpenWindows={setOpenWindows} />
    </>
  );
}

export default Desktop;

// Define the props type for Bar
type BarProps = {
  openWindows: { title: string; content: JSX.Element }[];
  setOpenWindows: React.Dispatch<React.SetStateAction<{ title: string; content: JSX.Element }[]>>;
};

function Bar({ openWindows, setOpenWindows }: BarProps) {
  const addWindow = () => {
    const newWindow = {
      title: `New Window ${openWindows.length + 1}`,
      content: <p>New Window</p>,
    };
    setOpenWindows([...openWindows, newWindow]);
  };

  return (
    <div className="desktop-bar">
      <button onClick={addWindow}>Click to add new window</button>
      {openWindows.map((window, index) => (
        <div key={index} className="window-title">
          {window.title}
        </div>
      ))}
      <div className="time-block">{getTime()}</div>
    </div>
  );
}

function getTime() {
  const date = new Date();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
}
