import React, { useEffect, useState } from "react";
import CreatorCard from "../components/CreatorCard";
import TipFeed from "../components/TipFeed"; // 🆕 Import the new feed

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

  // TEMP fallback for blank API
  const fallback = [
    {
      _id: "1",
      username: "artbyzoe",
      avatar: "/default-avatar.png",
      bio: "Digital painter & NFT enthusiast",
    },
  ];

  const displayList = creators.length > 0 ? creators : fallback;

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
      ) : (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mb-12">
            {displayList.map((creator) => (
              <CreatorCard key={creator._id || creator.username} creator={creator} />
            ))}
          </div>

          {/* 🆕 Tip Activity Feed */}
          <TipFeed />
        </>
      )}
    </div>
  );
};

export default Home;
