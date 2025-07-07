import React from 'react';
import { Card } from '../components/ui/card'; // or '@/components/ui/card' if using aliases

const Strategy = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card title="Strategy Builder" subtitle="Create your own trading strategy">
        <p className="text-gray-700">Start customizing your trading logic here...</p>
      </Card>
    </div>
  );
};

export default Strategy;
