import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Notebook } from "lucide-react"; // ✅ Fixed here
import axios from "axios";

const Diary = () => {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");

  const fetchNote = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/diary`);
      setNote(res.data.note || "");
    } catch (error) {
      console.error("Error fetching diary note:", error);
    }
  };

  const saveNote = async () => {
    setStatus("saving");
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/diary`, { note });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving diary note:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 rounded-xl bg-white shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Notebook className="w-6 h-6 text-pink-600" /> Your Love Diary 💖
      </h2>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={12}
        placeholder="Write your romantic memories here..."
        className="mb-4"
      />
      <div className="flex gap-4">
        <Button onClick={saveNote} disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : "Save"}
        </Button>
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(note)}`}
          download="love_diary.txt"
        >
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </a>
      </div>
      {status === "saved" && (
        <p className="text-green-500 mt-2">Note saved successfully! 💗</p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-2">Failed to save. Try again. 😢</p>
      )}
    </div>
  );
};

export default Diary
