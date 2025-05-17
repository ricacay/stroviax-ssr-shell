import React, { useEffect, useState } from "react";
import CreatorCard from "../components/CreatorCard";

const Home = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/creators`);
        if (!res.ok) throw new Error("Failed to fetch creators");
        const data = await res.json();
        setCreators(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to load creators.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Support Your Favorite Creators</h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading creators...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : creators.length === 0 ? (
        <p className="text-center text-gray-400">No creators available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {creators.map((creator) => (
            <CreatorCard key={creator._id} {...creator} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
