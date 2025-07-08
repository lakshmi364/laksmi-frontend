// src/pages/Voice.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Music2, RefreshCcw } from "lucide-react";
import axios from "axios";

const Voice = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [voiceList, setVoiceList] = useState([]);

  const fetchVoices = async () => {
    try {
      const res = await axios.get("https://lakshmi-ai-wife.onrender.com/voice_list");
      setVoiceList(res.data.reverse());
    } catch (error) {
      console.error("Error fetching voice notes", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("voice_file", file);
    try {
      await axios.post("https://lakshmi-ai-wife.onrender.com/upload_voice", form);
      setUploaded(true);
      setFile(null);
      fetchVoices();
      setTimeout(() => setUploaded(false), 2000);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">🎙️ Lakshmi's Voice Notes</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded-md w-full sm:w-auto"
        />
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          Upload
        </Button>
        <Button onClick={fetchVoices} variant="secondary" className="flex items-center gap-2">
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {uploaded && (
        <p className="text-green-600 text-sm text-center">✅ Voice uploaded successfully!</p>
      )}

      <div className="space-y-4 mt-6">
        {voiceList.map((name, index) => (
          <div key={index} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow">
            <Music2 className="text-pink-600" />
            <audio controls className="w-full">
              <source
                src={`https://lakshmi-ai-wife.onrender.com/static/voice_notes/${name}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
            <span className="text-xs text-gray-500">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voice;
