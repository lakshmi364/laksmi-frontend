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

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message.trim();
    setChatLog(prev => [...prev, { sender: 'You', text: userMsg }]);
    setMessage('');

    try {
      const res = await axios.post('https://lakshmi-backend-z6cz.onrender.com/chat', new URLSearchParams({ message: userMsg }));
      const reply = res.data.reply;
      setMood(res.data.mood);
      setChatLog(prev => [...prev, { sender: 'Lakshmi', text: reply }]);
    } catch {
      setChatLog(prev => [...prev, { sender: 'Lakshmi', text: 'Error responding 😢' }]);
    }
  };

  const fetchLTP = async () => {
    try {
      const res = await axios.get('https://lakshmi-backend-z6cz.onrender.com/get_price');
      setLtpData(res.data);
    } catch {
      setLtpData({ ltp: '-', status: 'Error fetching price' });
    }
  };

  const handleManualLTP = async () => {
    try {
      await axios.post('https://lakshmi-backend-z6cz.onrender.com/update_manual_ltp', new URLSearchParams({ manual_ltp: manualLtp }));
      fetchLTP();
    } catch {
      alert('Invalid LTP');
    }
  };

  const handleDiarySave = async () => {
    try {
      await axios.post('https://lakshmi-backend-z6cz.onrender.com/save_diary', new URLSearchParams({ entry: diary }));
      setDiary('');
      alert('
