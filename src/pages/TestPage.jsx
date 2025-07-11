import React from "react";
import CreatorCard from "../components/CreatorCard"; // Update the path if needed

const TestPage = () => {
  const testCreators = [
    {
      name: "Eco Annie",
      bio: "Sustainable living advocate 🌱",
      avatar: "https://i.pravatar.cc/150?img=10",
      xrpAddress: "rTestAddress1234Annie",
    },
    {
      name: "Green Greg",
      bio: "Recycling tips & green tech 🌍",
      avatar: "https://i.pravatar.cc/150?img=12",
      xrpAddress: "rTestAddress5678Greg",
    },
    {
      name: "Plant Paula",
      bio: "Indoor plants & garden vibes 🌿",
      avatar: "https://i.pravatar.cc/150?img=15",
      xrpAddress: "rTestAddress9012Paula",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        CreatorCard Test Page
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {testCreators.map((creator) => (
          <CreatorCard
            key={creator.xrpAddress}
            name={creator.name}
            bio={creator.bio}
            avatar={creator.avatar}
            xrpAddress={creator.xrpAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default TestPage;
