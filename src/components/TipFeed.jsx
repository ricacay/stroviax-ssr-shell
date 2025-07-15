import React from "react";
import { useTipStore } from "../store/useTipStore";

export default function TipFeed() {
  const tipHistory = useTipStore((state) => state.tipHistory);

  if (tipHistory.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
        No recent tips yet.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Tips
      </h2>
      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {tipHistory.map((tip, idx) => (
          <li
            key={idx}
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center text-sm"
          >
            <div>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {tip.from?.slice(0, 5)}...{tip.from?.slice(-4)}
              </span>{" "}
              tipped{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                {tip.amount} XRP
              </span>{" "}
              to{" "}
              <span className="text-gray-500 dark:text-gray-300">
                @{tip.creator}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(tip.timestamp).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
