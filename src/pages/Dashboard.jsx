// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [mood, setMood] = useState('💖');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [manualLtp, setManualLtp] = useState('');
  const [ltpData, setLtpData] = useState({ ltp: '-', status: '-' });
  const [diary, setDiary] = useState('');
  const [voiceFiles, setVoiceFiles] = useState([]);

  const backend = "https://lakshmi-ai-wife.onrender.com";

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message.trim();
    setChatLog((prev) => [...prev, { sender: 'You', text: userMsg }]);
    setMessage('');

    try {
      const res = await axios.post(`${backend}/chat`, new URLSearchParams({ message: userMsg }));
      const reply = res.data.reply;
      setMood(res.data.mood);
      setChatLog((prev) => [...prev, { sender: 'Lakshmi', text: reply }]);
    } catch {
      setChatLog((prev) => [...prev, { sender: 'Lakshmi', text: 'Error responding 😢' }]);
    }
  };

  const fetchLTP = async () => {
    try {
      const res = await axios.get(`${backend}/get_price`);
      setLtpData(res.data);
    } catch {
      setLtpData({ ltp: '-', status: 'Error fetching price' });
    }
  };

  const handleManualLTP = async () => {
    try {
      await axios.post(`${backend}/update_manual_ltp`, new URLSearchParams({ manual_ltp: manualLtp }));
      fetchLTP();
    } catch {
      alert('Invalid LTP');
    }
  };

  const handleDiarySave = async () => {
    try {
      await axios.post(`${backend}/save_diary`, new URLSearchParams({ entry: diary }));
      setDiary('');
      alert('Diary saved 💌');
    } catch {
      alert('Error saving diary 😢');
    }
  };

  const fetchVoices = async () => {
    try {
      const res = await axios.get(`${backend}/voice_list`);
      setVoiceFiles(res.data);
    } catch {
      setVoiceFiles([]);
    }
  };

  const handleVoiceUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('voice_file', file);
    try {
      await axios.post(`${backend}/upload_voice`, formData);
      fetchVoices();
      alert('Voice uploaded 🎤');
    } catch {
      alert('Upload failed 💔');
    }
  };

  useEffect(() => {
    fetchLTP();
    fetchVoices();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-100 min-h-screen">
      <h2 className="text-3xl font-bold text-rose-600 mb-4">Lakshmi Dashboard {mood}</h2>

      {/* Chat Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Romantic Chat 💬</h3>
        <div className="h-64 overflow-y-auto border rounded p-2 bg-pink-50 mb-2">
          {chatLog.map((entry, idx) => (
            <div key={idx} className={`mb-1 ${entry.sender === 'Lakshmi' ? 'text-rose-500' : 'text-gray-800'}`}>
              <strong>{entry.sender}:</strong> {entry.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSend} className="bg-rose-500 text-white px-4 rounded hover:bg-rose-600">
            Send
          </button>
        </div>
      </div>

      {/* Price & Diary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Live Price 📈</h3>
          <p><strong>LTP:</strong> {ltpData.ltp}</p>
          <p><strong>Status:</strong> {ltpData.status}</p>
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              className="p-2 border rounded w-full"
              placeholder="Set manual LTP"
              value={manualLtp}
              onChange={(e) => setManualLtp(e.target.value)}
            />
            <button onClick={handleManualLTP} className="bg-rose-400 text-white px-4 rounded hover:bg-rose-500">Update</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Diary 💌</h3>
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="Write your heart out..."
            rows="5"
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
          />
          <button onClick={handleDiarySave} className="w-full bg-rose-400 text-white py-2 rounded hover:bg-rose-500">
            Save Diary
          </button>
        </div>
      </div>

      {/* Voice Notes */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Voice Notes 🎙️</h3>
        <input type="file" onChange={handleVoiceUpload} className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {voiceFiles.map((file, idx) => (
            <audio key={idx} controls className="w-full">
              <source src={`${backend}/static/voice_notes/${file}`} />
              Your browser does not support audio.
            </audio>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
