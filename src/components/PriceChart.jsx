// src/components/PriceChart.jsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const PriceChart = () => {
  const [priceData, setPriceData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(
          `https://lakshmi-ai-wife.onrender.com/get_prices`
        );
        setPriceData(response.data);
      } catch (err) {
        console.error("Error fetching price data:", err);
        setError("Failed to load price chart.");
      }
    };

    fetchPriceData();
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md mb-6 max-w-4xl mx-auto border dark:border-zinc-700">
      <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
        📈 Lakshmi Price Chart
      </h3>

      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#f472b6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PriceChart;
