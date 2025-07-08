import React, { useEffect, useState } from "react";
import axios from "axios";

const StrategyViewer = () => {
  const [strategies, setStrategies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get_strategies`
        );
        setStrategies(res.data);
      } catch (err) {
        console.error("Error fetching strategies:", err);
        setError("Failed to load strategies.");
      }
    };

    fetchStrategies();
  }, []);

  const downloadStrategy = (strategyText, index) => {
    const blob = new Blob([strategyText], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `strategy_${index + 1}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md mb-6 max-w-4xl mx-auto border dark:border-zinc-700">
      <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
        🧠 Lakshmi's AI Strategies
      </h3>

      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : strategies.length === 0 ? (
        <p className="text-zinc-500 text-sm">No strategies found yet.</p>
      ) : (
        <ul className="space-y-3">
          {strategies.map((strategy, index) => (
            <li
              key={index}
              className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl flex justify-between items-center"
            >
              <div className="text-zinc-700 dark:text-zinc-100 text-sm w-5/6 truncate">
                {strategy.slice(0, 100)}...
              </div>
              <button
                onClick={() => downloadStrategy(strategy, index)}
                className="text-xs px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StrategyViewer
