// src/pages/Diary.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import DiaryEntry from "@/components/DiaryEntry";
import { NotebookPen } from "lucide-react";

const backend = "https://lakshmi-backend-z6cz.onrender.com";

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState("");

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${backend}/diary`);
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const saveEntry = async () => {
    if (!entry.trim()) return;
    const formData = new FormData();
    formData.append("entry", entry);

    try {
      const res = await fetch(`${backend}/diary`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setEntry("");
        fetchEntries();
      }
    } catch (err) {
      console.error("Failed to save entry:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <NotebookPen className="text-pink-500" /> Lakshmi’s Love Diary
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Express your feelings, thoughts, or memories with Lakshmi.
        </p>
      </div>

      <Textarea
        rows="4"
        placeholder="Write something romantic for Lakshmi..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="mb-4"
      />
      <Button onClick={saveEntry}>Save Entry</Button>

      <div className="mt-6 space-y-4">
        {entries.map((e, i) => (
          <DiaryEntry key={i} content={e.content} date={e.date} />
        ))}
      </div>
    </div>
  );
};

export default Diary
