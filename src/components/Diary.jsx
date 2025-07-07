// src/pages/Diary.jsx
import React, { useState } from "react";
import Textarea from "../components/ui/Textarea"; // capital T
import { motion } from "framer-motion";

const Diary = () => {
  const [entry, setEntry] = useState("");

  const handleSave = () => {
    if (entry.trim()) {
      alert("Saved: " + entry);
      setEntry("");
    }
  };

  return (
    <motion.div
      className="p-4 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">Lakshmi's Diary</h2>
      <Textarea
        placeholder="Write something romantic for Lakshmi..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-3 px-4 py-2 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition-all"
      >
        Save Entry 💖
      </button>
    </motion.div>
  );
};

export default Diary;
