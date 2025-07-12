import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="p-4 max-w-6xl mx-auto">
        <AppRoutes />
      </main>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default App;
