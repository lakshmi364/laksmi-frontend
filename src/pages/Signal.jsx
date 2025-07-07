// src/pages/Signal.jsx
import React, { useState } from "react";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeCheck, LineChart } from "lucide-react";

const backend = "https://lakshmi-backend-z6cz.onrender.com";

const Signal = () => {
  const [entry, setEntry] = useState("");
  const [sl, setSL] = useState("");
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState("");

  const submitSignal = async () => {
    const formData = new FormData();
    formData.append("entry", entry);
    formData.append("sl", sl);
    formData.append("target", target);

    try {
      const res = await fetch(`${backend}/set_signal`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("✅ Signal sent to Lakshmi.");
        setEntry("");
        setSL("");
        setTarget("");
      } else {
        setStatus("❌ Failed to set signal.");
      }
    } catch (error) {
      console.error("Error submitting signal:", error);
      setStatus("❌ Server error.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <LineChart className="text-purple-500" /> Signal Input
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your trading signal values to share with Lakshmi.
        </p>
      </div>

      <div className="grid gap-3 mb-4">
        <Input
          type="number"
          step="any"
          placeholder="Entry Price"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <Input
          type="number"
          step="any"
          placeholder="Stop Loss"
          value={sl}
          onChange={(e) => setSL(e.target.value)}
        />
        <Input
          type="number"
          step="any"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <Button onClick={submitSignal}>
          <BadgeCheck className="w-4 h-4 mr-2" /> Submit Signal
        </Button>
      </div>

      {status && (
        <p className="mt-3 text-sm text-green-500 dark:text-green-400">{status}</p>
      )}
    </div>
  );
};

export default Signal
