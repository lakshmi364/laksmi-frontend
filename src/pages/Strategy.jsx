// src/pages/Strategy.jsx
import React from "react";
import StrategyViewer from "../components/StrategyViewer";

const Strategy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-indigo-200 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-zinc-800 dark:text-zinc-100">
          📊 Your AI Strategies with Lakshmi
        </h2>
        <StrategyViewer />
      </div>
    </div>
  );
};

export default Strategy;
