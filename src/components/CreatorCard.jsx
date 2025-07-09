import React, { useState } from "react";
import { useWallet } from "../wallet/WalletProvider";
import { submitXrpTip } from "../utils/submitXrpTip";

const CreatorCard = ({ name, bio, avatar, xrpAddress }) => {
  const { isConnected } = useWallet();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | fail

  const handleTip = async () => {
    if (!amount || isNaN(amount)) {
      alert("Enter a valid XRP amount");
      return;
    }

    setStatus("loading");

    try {
      const result = await submitXrpTip(xrpAddress, amount);

      if (result.success) {
        setStatus("success");
        console.log("✅ Tip sent successfully:", result.payload);
      } else {
        setStatus("fail");
        console.warn("❌ Tip declined or failed");
      }

      setAmount("");
    } catch (err) {
      console.error("Error tipping:", err);
      setStatus("fail");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      className="flex flex-col items-center p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <img
        src={avatar || "/default-avatar.png"}
        alt={`${name}'s avatar`}
        onError={(e) => (e.target.src = "/default-avatar.png")}
        className="w-24 h-24 rounded-full object-cover shadow-md"
      />

      <h2 className="text-xl font-semibold text-center mt-4 dark:text-white">
        {name}
      </h2>

      <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-4">
        {bio}
      </p>

      {isConnected ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 mt-3">
            <input
              type="number"
              placeholder="Amount (XRP)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleTip}
              disabled={status === "loading"}
              className={`px-4 py-2 rounded-lg shadow transition-colors ${
                status === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : status === "fail"
                  ? "bg-red-500 hover:bg-red-600"
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
        </div>
      ) : (
        <p className="text-center text-red-500 mt-4">Connect wallet to tip</p>
      )}
    </div>
  );
};

export default CreatorCard;
