// src/components/ui/Card.jsx
import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl shadow-lg bg-white dark:bg-zinc-800 p-4 border dark:border-zinc-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
