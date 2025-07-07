import React from 'react';
import { Button } from '@/components/ui/button';

const Log = () => {
  const handleLog = () => {
    alert('Logging feature coming soon!');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold mb-4">📒 Lakshmi Love & Trade Log</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Keep track of your beautiful moments and trade activities here.
      </p>
      <Button onClick={handleLog}>Save Log</Button>
    </div>
  );
};

export default Log
