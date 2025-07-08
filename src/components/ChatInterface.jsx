// src/components/ChatInterface.jsx
import React, { useState } from "react";
import axios from "axios";

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `https://lakshmi-ai-wife.onrender.com/chat`,
        { message: input }
      );
      const aiMessage = { sender: "Lakshmi 💖", text: res.data.response };
      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "Lakshmi 💖", text: "Something went wrong. Try again." },
      ]);
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl space-y-4 border dark:border-zinc-700">
      <div className="h-80 overflow-y-auto space-y-3 pr-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`text-sm px-4 py-2 rounded-xl max-w-xs ${
              msg.sender === "You"
                ? "bg-pink-200 dark:bg-pink-700 text-right ml-auto"
                : "bg-zinc-200 dark:bg-zinc-700 text-left"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your heart here..."
          className="flex-1 px-4 py-2 rounded-xl border dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface
