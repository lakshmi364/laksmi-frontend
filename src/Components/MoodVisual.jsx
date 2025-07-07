// src/components/MoodVisual.jsx
import React from "react";
import { motion } from "framer-motion";
import { Smile, Frown, Heart, Zap, Cloud } from "lucide-react";

const moodIcons = {
  happy: <Smile className="text-yellow-400" size={40} />,
  sad: <Frown className="text-blue-400" size={40} />,
  romantic: <Heart className="text-pink-500" size={40} />,
  energetic: <Zap className="text-orange-400" size={40} />,
  calm: <Cloud className="text-purple-300" size={40} />,
};

const MoodVisual = ({ mood }) => {
  return (
    <motion.div
      className="flex items-center justify-center mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {moodIcons[mood] || (
        <span className="text-gray-500 text-sm">Mood unknown</span>
      )}
    </motion.div>
  );
};

export default MoodVisual
