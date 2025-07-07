import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-all duration-300 shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
