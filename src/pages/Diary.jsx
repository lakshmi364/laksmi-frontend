// src/pages/Diary.jsx
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, NotebookPen } from "lucide-react";
import axios from "axios";

const Diary = () => {
  const [entry, setEntry] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("entry", entry);

      await axios.post("https://lakshmi-backend-z6cz.onrender.com/save_diary", form);
      setSaved(true);
      setEntry("");
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error saving diary", err);
    }
  };

  const handleDownload = () => {
    window.open("https://lakshmi-backend-z6cz.onrender.com/download_diary", "_blank");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">📖 Love Diary</h2>

      <div className="space-y-4">
        <Textarea
          placeholder="Write your thoughts here..."
          rows={8}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <NotebookPen className="w-4 h-4" />
            Save Entry
          </Button>
          <Button onClick={handleDownload} variant="secondary" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Diary
          </Button>
        </div>
        {saved && (
          <p className="text-green-600 text-sm text-center">💌 Entry saved successfully!</p>
        )}
      </div>
    </div>
  );
};

export default Diary
