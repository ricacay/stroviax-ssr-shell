import React, { useEffect, useState } from "react";

const XrpPriceWidget = () => {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd&include_24hr_change=true"
      );
      const data = await res.json();
      const xrp = data?.ripple?.usd;
      const xrpChange = data?.ripple?.usd_24h_change;

      setPrice(xrp?.toFixed(4));
      setChange(xrpChange?.toFixed(2));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching XRP price:", err);
      setPrice(null);
      setChange(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice(); // Fetch on mount
    const interval = setInterval(fetchPrice, 60000); // Refresh every 60 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm px-3 py-1 rounded-full shadow bg-white dark:bg-gray-800 flex items-center space-x-2">
      <span className="font-semibold">XRP:</span>
      {loading ? (
        <span className="text-gray-400 animate-pulse">Loading...</span>
      ) : (
        <>
          <span>${price}</span>
          <span
            className={`text-xs ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </span>
        </>
      )}
    </div>
  );
};

export default XrpPriceWidget;
