// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lakshmi_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { username, password }
      );
      if (response.data.success) {
        setUser({ username });
        localStorage.setItem('lakshmi_user', JSON.stringify({ username }));
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Login error: ' + error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lakshmi_user');
    navigate('/');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('lakshmi_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
