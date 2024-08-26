import { BiWindow } from "react-icons/bi";
import { useRef } from 'react';
import Draggable from '../utils/Draggable';
import '../styles/Windows.css';

type WindowProps = {
  title: string;
  children: React.ReactNode;
  setOpenWindows: React.Dispatch<React.SetStateAction<{ title: string; content: JSX.Element }[]>>;
};

function Window({ title, children, setOpenWindows}: WindowProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const closeWindow = () => {
  };
  const minimizeWindow = () => {

  };
  const maximizeWindow = () => {
    
  };

  return (
    <Draggable dragHandleRef={bannerRef}>
      <div className='window-container'>
        <div className='banner' ref={bannerRef}>
          <h3 className='title'> {title} </h3>
          <div className='window-controls'>
            <button> _ </button>
            <button> <BiWindow /> </button>
            <button onClick={closeWindow}> X </button>
          </div>
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
    </Draggable>
  );
}

export default Window;
