// src/pages/Diary.jsx
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Notebook } from "lucide-react"; // ✔️ replaced NotebookPen with Notebook
import axios from "axios";

const Diary = () => {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const res = await axios.get("/api/diary");
    setEntries(res.data);
  };

  const saveEntry = async () => {
    await axios.post("/api/diary", { text });
    setText("");
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Write your diary..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={saveEntry}>
          <Download className="mr-2" /> Save Entry
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        {entries.map((e, idx) => (
          <div key={idx} className="p-4 bg-white dark:bg-zinc-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Notebook className="text-purple-500" />
              <span className="font-semibold">Entry {idx + 1}</span>
            </div>
            <p className="whitespace-pre-wrap">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary
