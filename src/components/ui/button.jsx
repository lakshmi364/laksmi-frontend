import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
