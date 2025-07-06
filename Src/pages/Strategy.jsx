// src/pages/Strategy.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Send } from "lucide-react";
import axios from "axios";

const Strategy = () => {
  const [strategies, setStrategies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    entry: "",
    sl: "",
    target: "",
    note: "",
  });

  const fetchStrategies = async () => {
    try {
      const res = await axios.get("https://lakshmi-backend-z6cz.onrender.com/strategy_list");
      setStrategies(res.data.strategies || []);
    } catch (err) {
      console.error("Error fetching strategies", err);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (let key in formData) form.append(key, formData[key]);

      await axios.post("https://lakshmi-backend-z6cz.onrender.com/add_strategy", form);
      setFormData({ name: "", entry: "", sl: "", target: "", note: "" });
      fetchStrategies();
    } catch (err) {
      console.error("Failed to submit strategy", err);
    }
  };

  const handleDownload = () => {
    window.open("https://lakshmi-backend-z6cz.onrender.com/download_strategies", "_blank");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">💼 Strategy Manager</h2>

      {/* --- Form --- */}
      <Card className="mb-6 shadow-xl">
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Strategy Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="entry"
              placeholder="Entry Price"
              value={formData.entry}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="sl"
              placeholder="Stop Loss"
              value={formData.sl}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="target"
              placeholder="Target Price"
              value={formData.target}
              onChange={handleChange}
              required
            />
            <Textarea
              name="note"
              placeholder="Strategy Notes"
              className="md:col-span-2"
              value={formData.note}
              onChange={handleChange}
              required
            />
            <div className="md:col-span-2 flex justify-between items-center">
              <Button type="submit" className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Strategy
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download All
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* --- Strategy List --- */}
      <div className="space-y-3">
        {strategies.length === 0 ? (
          <p className="text-center text-muted-foreground">No strategies saved yet.</p>
        ) : (
          strategies.map((s, i) => (
            <Card key={i} className="shadow">
              <CardContent className="p-4 grid md:grid-cols-2 gap-2 text-sm">
                <div><strong>Name:</strong> {s[0]}</div>
                <div><strong>Entry:</strong> {s[1]}</div>
                <div><strong>SL:</strong> {s[2]}</div>
                <div><strong>Target:</strong> {s[3]}</div>
                <div className="md:col-span-2"><strong>Note:</strong> {s[4]}</div>
                <div className="md:col-span-2 text-right text-xs text-muted-foreground">{s[5]}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Strategy
