// src/components/ChatMessage.jsx
import React from "react";
import { motion } from "framer-motion";

const ChatMessage = ({ message, isUser }) => {
  const bubbleStyle = isUser
    ? "bg-blue-500 text-white self-end rounded-bl-xl rounded-tr-xl"
    : "bg-pink-400 text-white self-start rounded-br-xl rounded-tl-xl";

  return (
    <motion.div
      className={`max-w-[75%] p-3 m-2 text-sm md:text-base shadow-md ${bubbleStyle}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      {message}
    </motion.div>
  );
};

export default ChatMessage;
