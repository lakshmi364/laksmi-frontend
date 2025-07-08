// src/pages/Chat.jsx
import React from "react";
import ChatInterface from "../components/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-zinc-800 dark:text-zinc-100">
          💬 Talk with Lakshmi
        </h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat
