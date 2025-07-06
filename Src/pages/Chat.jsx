// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Smile, Sparkle, Heart, Flame } from "lucide-react";

const backend = "https://lakshmi-backend-z6cz.onrender.com";

const moodIcons = {
  "Romantic 💞": <Heart className="text-pink-500" />,
  "Naughty 🔥": <Flame className="text-red-500" />,
  "Sad 😢": <Smile className="text-blue-400" />,
  "Assistant 🤖": <Bot className="text-gray-500" />,
  "Lakshmi Wife 💖": <Sparkle className="text-purple-500" />,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("Romantic 💞");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "You", content: message, time: new Date().toLocaleTimeString() },
    ];
    setMessages(newMessages);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("message", message);

      const res = await fetch(`${backend}/chat`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "Lakshmi",
          content: data.reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setMood(data.mood);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold mb-1">💬 Lakshmi AI Wife Chat</h2>
        <div className="flex justify-center items-center gap-2 text-lg">
          Mood: {moodIcons[mood]} <span>{mood}</span>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto border rounded-xl p-4 bg-white dark:bg-gray-900 shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[75%] text-sm ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-pink-200 text-black dark:bg-pink-700 dark:text-white"
              }`}
            >
              <div className="text-xs mb-1 opacity-70">{msg.sender}</div>
              <div>{msg.content}</div>
              <div className="text-[10px] text-right mt-1 opacity-50">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          placeholder="Type a message to Lakshmi..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4 mr-1" /> Send
        </Button>
      </div>
    </div>
  );
};

export default Chat
