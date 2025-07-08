// src/components/VoiceRecorder.jsx
import React, { useState } from "react";
import { UploadCloud, Mic } from "lucide-react";
import axios from "axios";

const VoiceRecorder = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a voice file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://lakshmi-ai-wife.onrender.com/upload_voice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUploadSuccess(response.data); // Optionally update UI after success
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Voice upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md mb-6 max-w-xl mx-auto border dark:border-zinc-700">
      <div className="flex items-center gap-3 mb-4 text-zinc-700 dark:text-zinc-200">
        <Mic className="text-pink-500" />
        <h3 className="text-lg font-semibold">Upload Your Voice Note</h3>
      </div>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-2 block w-full text-sm text-zinc-600 dark:text-zinc-300"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-all text-sm"
      >
        {uploading ? "Uploading..." : (
          <span className="flex items-center gap-1 justify-center">
            <UploadCloud size={16} /> Upload
          </span>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default VoiceRecorder
