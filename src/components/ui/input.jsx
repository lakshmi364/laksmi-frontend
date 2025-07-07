import React from 'react';

const Input = React.forwardRef(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`w-full px-4 py-2 border border-pink-300 rounded-xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200 ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
