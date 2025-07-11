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
    <div className="min-h-screen py-10 px-6 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Support Your Favorite Creators
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
          Loading creators...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      ) : creators.length === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-500">
          No creators available.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {creators.map((creator) => (
            <CreatorCard key={creator._id} {...creator} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
