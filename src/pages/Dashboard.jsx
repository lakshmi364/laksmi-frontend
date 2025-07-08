import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [ltp, setLtp] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLTP = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ltp`);
      setLtp(res.data?.ltp || "Not found");
    } catch (error) {
      setLtp("Error fetching LTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLTP();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">📊 Lakshmi Trading Dashboard</h1>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="text-xl">📈 Latest BankNIFTY Price:</p>
          <div className="text-3xl font-semibold mt-2 text-purple-700">
            {loading ? "Loading..." : ltp}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={fetchLTP} className="bg-pink-500 hover:bg-pink-600 text-white">
          Refresh Price
        </Button>
      </div>
    </div>
  );
};

export default Dashboard
