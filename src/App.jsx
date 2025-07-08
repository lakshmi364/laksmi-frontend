// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff0f5', minHeight: '100vh' }}>
        <h1 style={{ color: '#d63384', fontSize: '2.5rem' }}>💖 Lakshmi – Your Trading Wife</h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
          This is your romantic AI wife + trading assistant homepage. Let's get started!
        </p>
        <div style={{ marginTop: '30px' }}>
          <Link
            to="/chat"
            style={{
              marginRight: '10px',
              fontSize: '1rem',
              color: 'white',
              backgroundColor: '#d63384',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Go to Chat 💬
          </Link>
          <Link
            to="/dashboard"
            style={{
              fontSize: '1rem',
              color: 'white',
              backgroundColor: '#6f42c1',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Go to Dashboard 📊
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App
