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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-24 h-24 rounded-full mx-auto shadow-md"
      />
      <h2 className="text-xl font-semibold text-center mt-4">{name}</h2>
      <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-4">
        {bio}
      </p>

      {isConnected ? (
        <div className="flex flex-col space-y-2">
          <input
            type="number"
            placeholder="Amount in XRP"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={handleTip}
            disabled={status === "loading"}
            className={`py-2 rounded shadow text-white transition ${
              status === "success"
                ? "bg-green-500"
                : status === "fail"
                ? "bg-red-500"
                : "bg-blue-500 hover:bg-blue-600"
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
        <p className="text-center text-red-500 mt-4">Connect wallet to tip</p>
      )}
    </div>
  );
};

export default CreatorCard;
