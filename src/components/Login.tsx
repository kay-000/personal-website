import { useNavigate } from 'react-router-dom';
import Window from './Window.tsx';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/desktop');
  };

  return(
      <div className="login-container">
        <Window title="Booting up Kayla.exe">
          <p> Type a user name and password to log on to Kayla.exe </p>
          <form>
              <div className="form-group">
                <label htmlFor="username"><u>U</u>sername:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  defaultValue="Kayla McFarlane" 
                  disabled 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"><u>P</u>assword:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  defaultValue="mockpassword" 
                  disabled 
                />
              </div>
          </form>
          <div className="button-group">
            <button onClick={handleLogin}>OK</button>
            <button>Cancel</button>
        </div>
        </Window>
      </div>
  )
}

export default Login
