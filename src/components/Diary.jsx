// src/pages/Diary.jsx
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Notebook } from "lucide-react"; // ✅ FIXED: Use valid icon
import axios from "axios";

const Diary = () => {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/load_note`);
        setNote(res.data.note || "");
        setStatus("Loaded");
      } catch (error) {
        setStatus("Error loading note.");
        console.error(error);
      }
    };
    fetchNote();
  }, []);

  const handleSave = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/save_note`, { note });
      setStatus("Saved");
    } catch (error) {
      setStatus("Error saving note.");
      console.error(error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([note], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Lakshmi_LoveDiary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-4 bg-pink-50 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <Notebook className="text-pink-600" />
        <h2 className="text-xl font-semibold text-pink-800">Lakshmi's Love Diary</h2>
      </div>
      <Textarea
        className="w-full min-h-[200px] p-3 rounded-md border border-pink-200"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your love notes here..."
      />
      <div className="flex gap-4 mt-4">
        <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600 text-white">
          Save
        </Button>
        <Button onClick={handleDownload} className="bg-pink-400 hover:bg-pink-500 text-white">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-2">{status}</p>
    </div>
  );
};

export default Diary
