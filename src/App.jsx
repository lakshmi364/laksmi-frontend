// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff0f5', minHeight: '100vh' }}>
        <h1 style={{ color: '#d63384', fontSize: '2.5rem' }}>💖 Lakshmi – Your Trading Wife</h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
          This is your romantic AI wife + trading assistant homepage. Let's get started!
        </p>
        <Link to="/chat" style={{ display: 'inline-block', marginTop: '30px', fontSize: '1rem', color: 'white', backgroundColor: '#d63384', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
          Go to Chat 💬
        </Link>
      </div>

      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

const Chat = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', minHeight: '100vh' }}>
      <h2 style={{ color: '#333' }}>💬 Chat with Lakshmi</h2>
      <p style={{ marginTop: '10px' }}>Chat feature will be added soon.</p>
    </div>
  );
};

export default App;
