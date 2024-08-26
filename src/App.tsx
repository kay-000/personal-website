import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Desktop from './components/Desktop.tsx'

// import Window from './components/Window.tsx'
import Login from './components/Login.tsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </Router>
  )
}

export default App
