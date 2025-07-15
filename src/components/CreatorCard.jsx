import React, { useState } from "react";
import { useWallet } from "../wallet/WalletProvider";
import { toast } from "react-toastify";
import { useTipStore } from "../store/useTipStore";

export default function CreatorCard({ creator }) {
  const { isConnected, walletAddress } = useWallet();
  const [tipAmount, setTipAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [tipHistory, setTipHistory] = useState([]);

  const { addTip: logGlobalTip } = useTipStore();

  const handleTip = async () => {
    const amount = parseFloat(tipAmount);

    if (!amount || amount <= 0) {
      toast.error("🚫 Enter a valid XRP amount");
      return;
    }

    if (!isConnected) {
      toast.error("❌ Connect your wallet first");
      return;
    }

    setSending(true);

    // Simulated async tip
    setTimeout(() => {
      toast.success(`✅ Sent ${amount} XRP to @${creator?.username || "unknown"}`);

      const newTip = {
        id: Date.now(),
        amount,
        from: walletAddress,
      };

      // Add to local tip history (on this card)
      setTipHistory((prev) => [newTip, ...prev.slice(0, 4)]);

      // Add to global tip history (for TipFeed)
      logGlobalTip({
        amount,
        from: walletAddress,
        creator: creator?.username || "unknown",
      });

      setSending(false);
      setTipAmount("");
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={creator?.avatar || "/default-avatar.png"}
          alt={creator?.username || "Creator"}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            @{creator?.username || "unknown"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {creator?.bio || "Support my content with XRP ❤️"}
          </p>
        </div>
      </div>

      {/* Tip input */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="number"
          min="0"
          placeholder="Amount (XRP)"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleTip}
          disabled={sending}
          className={`px-4 py-2 rounded-lg text-white shadow transition ${
            sending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sending ? "Sending..." : "Tip"}
        </button>
      </div>

      {/* Tip history */}
      {tipHistory.length > 0 && (
        <div className="mt-4 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
          <p className="font-semibold text-gray-700 dark:text-white">Recent Tips:</p>
          {tipHistory.map((tip) => (
            <div
              key={tip.id}
              className="flex justify-between text-gray-800 dark:text-gray-200"
            >
              <span>✔️ {tip.amount} XRP</span>
              <span className="font-mono text-xs">
                {tip.from?.slice(0, 5)}...{tip.from?.slice(-4)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
