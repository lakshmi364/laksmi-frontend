// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-pink-500 dark:bg-gray-900 text-white dark:text-gray-200 shadow p-4 flex justify-between items-center">
      <div className="flex space-x-4 text-sm md:text-base font-semibold">
        <Link to="/dashboard" className="hover:text-yellow-200">Dashboard</Link>
        <Link to="/chat" className="hover:text-yellow-200">Chat</Link>
        <Link to="/strategy" className="hover:text-yellow-200">Strategy</Link>
        <Link to="/price" className="hover:text-yellow-200">Price</Link>
        <Link to="/signal" className="hover:text-yellow-200">Signal</Link>
        <Link to="/voice" className="hover:text-yellow-200">Voice</Link>
        <Link to="/log" className="hover:text-yellow-200">Logs</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="hover:text-yellow-300 focus:outline-none"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar
