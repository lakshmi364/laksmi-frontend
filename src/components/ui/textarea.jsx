// src/components/ui/textarea.jsx
import React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-4 py-2 border border-pink-300 rounded-xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200 ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea
