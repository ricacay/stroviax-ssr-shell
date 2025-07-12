import { useEffect, useState } from "react";
import { mockTips } from "../data/mockTips";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const aggregateBy = (key) => {
  const map = {};
  mockTips.forEach((tip) => {
    const id = tip[key];
    map[id] = (map[id] || 0) + tip.amount;
  });
  return Object.entries(map).map(([id, total]) => ({
    name: id,
    total,
  }));
};

const AdminDashboard = () => {
  const [tips, setTips] = useState([]);
  const [sortKey, setSortKey] = useState("timestamp");

  const topCreators = aggregateBy("creator");
  const topTippers = aggregateBy("from");

  useEffect(() => {
    // Simulate fetch
    setTips(mockTips);
  }, []);

  const sortedTips = [...tips].sort((a, b) => {
    if (sortKey === "amount") return b.amount - a.amount;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h1>

      {/* Sort controls */}
      <div className="mb-4 space-x-2">
        <label className="text-sm">Sort by:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border dark:border-gray-700 px-3 py-1 rounded bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="timestamp">Most Recent</option>
          <option value="amount">Tip Amount</option>
        </select>
      </div>

      {/* Tip history table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-2">Creator</th>
              <th className="p-2">From</th>
              <th className="p-2">Amount (XRP)</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedTips.map((tip) => (
              <tr
                key={tip.id}
                className="border-t border-gray-200 dark:border-gray-600"
              >
                <td className="p-2">@{tip.creator}</td>
                <td className="p-2 font-mono text-xs">{tip.from}</td>
                <td className="p-2 font-semibold">{tip.amount}</td>
                <td className="p-2">
                  {new Date(tip.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Earning Creators */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">🏆 Top Earning Creators</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCreators}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#34D399" name="Total XRP" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Tippers */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">💸 Top Tippers</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topTippers}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#60A5FA" name="Total XRP" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
