// src/components/ui/input.jsx
import React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
