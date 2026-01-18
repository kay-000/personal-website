import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Window from './Window.tsx';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fullUsername = 'Kayla McFarlane';
  const fullPassword = 'mockpassword';

  useEffect(() => {
    const typeText = (text: string, setText: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, delay);
    };

    typeText(fullUsername, setUsername, 100);
    setTimeout(() => typeText(fullPassword, setPassword, 100), fullUsername.length * 100 + 500);
  }, []);

  const handleLogin = () => {

    if(username === fullUsername && password === fullPassword) {
      navigate('/desktop');
    }
  };

  return(
    <div className="login-container">
      <Window title="Booting up Kayla.exe" id="login"  isMinimized={false} onClose={() => {}} onMinimize={() => {}}>
        <p>Type a user name and password to log on to Kayla.exe</p>
        <form>
          <div className="form-group">
            <label htmlFor="username"><u>U</u>sername:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              readOnly 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><u>P</u>assword:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              readOnly 
            />
          </div>
        </form>
        <div className="button-group">
          <button onClick={handleLogin}>Login</button>
          <button>Cancel</button>
        </div>
      </Window>
    </div>
  )
}

export default Login