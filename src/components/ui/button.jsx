import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button
