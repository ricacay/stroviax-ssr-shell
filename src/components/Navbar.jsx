import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../wallet/WalletProvider";
import { toast, ToastContainer } from "react-toastify";
import XrpPriceWidget from "./XrpPriceWidget";

const shortenAddress = (addr) =>
  addr ? `${addr.slice(0, 5)}...${addr.slice(-4)}` : "";

const Navbar = () => {
  const { walletAddress, login, logout, isConnected, loading } = useWallet();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await login();
      toast.success("✅ Wallet Connected!");
    } catch (err) {
      toast.error("❌ Wallet Connection Failed");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info("👋 Wallet Disconnected");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-md p-4 flex flex-col md:flex-row justify-between items-center`}
    >
      {/* Brand + Mobile Toggle */}
      <div className="flex justify-between w-full md:w-auto items-center">
        <Link to="/" className="text-xl font-bold">
          StroviaX
        </Link>
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Right Side Section */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex items-center space-x-4 mt-2 md:mt-0`}
      >
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>

        <button
          onClick={toggleDarkMode}
          className="bg-yellow-400 text-black px-3 py-1 rounded shadow"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* XRP Price Widget */}
        <div className="hidden md:block">
          <XrpPriceWidget />
        </div>

        {/* Wallet Actions */}
        <div className="mt-2 md:mt-0">
          {loading ? (
            <span className="text-gray-500 animate-pulse">Loading...</span>
          ) : isConnected ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono bg-gray-100 text-black px-2 py-1 rounded">
                {shortenAddress(walletAddress)}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Floating Wallet Badge */}
      {isConnected && walletAddress && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md animate-pulse">
          Connected: {shortenAddress(walletAddress)}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </nav>
  );
};

export default Navbar;
