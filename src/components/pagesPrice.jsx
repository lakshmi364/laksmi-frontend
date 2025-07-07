// src/pages/Price.jsx
import React, { useEffect, useState } from "react";
import { RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const backend = "https://lakshmi-backend-z6cz.onrender.com";

const Price = () => {
  const [ltp, setLtp] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  const fetchLTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backend}/get_price`);
      const data = await res.json();
      setLtp(data.ltp);
      setStatus(data.status);
    } catch (err) {
      console.error("Error fetching price:", err);
      setStatus("❌ Failed to fetch price");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLTP();
    const interval = setInterval(fetchLTP, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <TrendingUp className="text-pink-500" /> Price Tracker
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Live price updates fetched from backend every 10 seconds.
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
        <p className="text-sm text-gray-500">Last Traded Price (LTP)</p>
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-300">
          ₹ {ltp !== null ? ltp : "Loading..."}
        </h1>
        <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
          {status}
        </p>
      </div>

      <div className="mt-5 flex justify-center">
        <Button onClick={fetchLTP} disabled={loading}>
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Price
