import React, { useState } from "react";
import { useWallet } from "../wallet/WalletProvider";
import { submitXrpTip } from "../utils/submitXrpTip";

const CreatorCard = ({ name, bio, avatar, xrpAddress }) => {
  const { isConnected } = useWallet();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | fail

  const handleTip = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid XRP amount");
      return;
    }

    setStatus("loading");
    try {
      const result = await submitXrpTip(xrpAddress, amount);
      setStatus(result.success ? "success" : "fail");
      setAmount("");
    } catch (err) {
      console.error("Tip error:", err);
      setStatus("fail");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-xl transform transition-transform duration-200">
      <img
        src={avatar || "/default-avatar.png"}
        alt={`${name}'s avatar`}
        onError={(e) => (e.target.src = "/default-avatar.png")}
        className="w-24 h-24 rounded-full object-cover shadow"
      />

      <h2 className="text-xl font-semibold mt-4 text-center dark:text-white">{name}</h2>

      <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-1">{bio}</p>

      {isConnected ? (
        <div className="flex flex-col w-full mt-4 gap-3">
          <input
            type="number"
            placeholder="Amount (XRP)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <button
            onClick={handleTip}
            disabled={status === "loading"}
            className={`px-4 py-2 rounded-lg font-semibold shadow transition-colors ${
              status === "success"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : status === "fail"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {status === "loading"
              ? "Sending..."
              : status === "success"
              ? "✅ Tip Sent!"
              : status === "fail"
              ? "❌ Failed"
              : "💸 Send Tip"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-red-500 mt-4">Connect your wallet to tip</p>
      )}
    </div>
  );
};

export default CreatorCard;
