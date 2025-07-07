// src/pages/Log.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const backend = "https://lakshmi-backend-z6cz.onrender.com";

const Log = () => {
  const downloads = [
    {
      label: "📊 Price Log",
      endpoint: "/download_log",
      filename: "price_log.csv",
    },
    {
      label: "💬 Chat Log",
      endpoint: "/download_chat",
      filename: "chat_log.csv",
    },
    {
      label: "📖 Love Diary",
      endpoint: "/download_diary",
      filename: "love_diary.csv",
    },
  ];

  const handleDownload = async (endpoint, filename) => {
    const link = document.createElement("a");
    link.href = `${backend}${endpoint}`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📁 Download Lakshmi Logs</h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {downloads.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex justify-between items-center shadow"
          >
            <span className="text-lg">{item.label}</span>
            <Button
              onClick={() => handleDownload(item.endpoint, item.filename)}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Log
