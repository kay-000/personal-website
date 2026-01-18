import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Desktop from './components/Desktop.tsx'
import Login from './components/Login.tsx'

function App() {
  return (
    <GoogleOAuthProvider clientId="139036230856-hceg8o39964dvflt7dvp0rpcicl5uopn.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/desktop" element={<Desktop />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
