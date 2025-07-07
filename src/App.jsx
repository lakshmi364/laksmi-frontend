import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Diary from "./pages/Diary";
import Log from "./pages/Log";
import Login from "./pages/Login";
import Price from "./pages/Price";
import Signal from "./pages/Signal";
import Strategy from "./pages/Strategy";
import Voice from "./pages/Voice";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext"; // ✅ Correct path
import "./styles/global.css";

const App = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <ThemeProvider>
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/log" element={<Log />} />
          <Route path="/price" element={<Price />} />
          <Route path="/signal" element={<Signal />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/voice" element={<Voice />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App
