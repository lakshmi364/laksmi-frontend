import React, { useState } from 'react';
import Input from '@/components/ui/input'; // ✅ FIXED: default import
import { Button } from '@/components/ui/button';

const Chat = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    alert(`Lakshmi received: ${message}`);
    setMessage('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">💬 Chat with Lakshmi</h1>
      <div className="flex gap-2 items-center justify-center">
        <Input
          type="text"
          placeholder="Type your romantic message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
