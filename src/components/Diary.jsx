import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Notebook } from "lucide-react"; // ✅ FIXED ICON IMPORT
import axios from "axios";

const Diary = () => {
  const [note, setNote] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-note`);
      setNote(res.data.note || "");
    } catch (err) {
      console.error("Failed to fetch note:", err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/save-note`, { note });
      setSavedMessage("Saved successfully 💖");
      setTimeout(() => setSavedMessage(""), 2000);
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/download-note`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownloadUrl(url);
    } catch (err) {
      console.error("Failed to download:", err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Notebook className="w-6 h-6 text-pink-500" />
        Lakshmi's Love Diary 💌
      </h2>

      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={15}
        placeholder="Write your heart out, darling..."
        className="mb-4"
      />

      <div className="flex gap-3 items-center">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>

        <Button onClick={handleDownload} variant="outline">
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="Lakshmi_Love_Diary.txt"
            className="text-sm text-blue-600 underline"
          >
            Click to download 💖
          </a>
        )}
      </div>

      {savedMessage && <p className="text-green-600 mt-2">{savedMessage}</p>}
    </div>
  );
};

export default Diary;
