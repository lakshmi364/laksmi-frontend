// src/components/DiaryEntry.jsx
import React from "react";
import { motion } from "framer-motion";
import { BookHeart } from "lucide-react";

const DiaryEntry = ({ content, date }) => {
  if (!content) return null;

  return (
    <motion.div
      className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md mb-6 max-w-xl mx-auto border dark:border-zinc-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-2 text-zinc-700 dark:text-zinc-200">
        <BookHeart className="text-pink-500" />
        <h3 className="text-lg font-semibold">Lakshmi’s Diary - {date}</h3>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </motion.div>
  );
};

export default DiaryEntry;
