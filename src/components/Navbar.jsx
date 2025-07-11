import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../wallet/WalletProvider";
import { toast, ToastContainer } from "react-toastify";
import XrpPriceWidget from "./XrpPriceWidget";

const shortenAddress = (addr) => (addr ? `${addr.slice(0, 5)}...${addr.slice(-4)}` : "");

const Navbar = () => {
  const { walletAddress, login, logout, isConnected, loading } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await login();
      toast.success("✅ Wallet Connected!");
    } catch {
      toast.error("❌ Wallet Connection Failed");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info("👋 Wallet Disconnected");
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-900/80 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-4 px-6">
        {/* Brand + Mobile Menu */}
        <div className="flex justify-between w-full md:w-auto items-center">
          <Link to="/" className="text-2xl font-bold text-brand-primary dark:text-brand-primary">
            StroviaX
          </Link>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Navigation Links & Actions */}
        <div
          className={`w-full md:flex md:items-center md:space-x-6 ${
            menuOpen ? "block mt-4" : "hidden"
          } md:mt-0`}
        >
          <nav className="flex flex-col md:flex-row gap-3 md:gap-6 text-base">
            <Link to="/" className="hover:text-brand-primary dark:hover:text-brand-primary">Home</Link>
            <Link to="/about" className="hover:text-brand-primary dark:hover:text-brand-primary">About</Link>
          </nav>

          <button
            onClick={toggleDarkMode}
            className="mt-3 md:mt-0 bg-yellow-400 text-black px-3 py-1 rounded shadow hover:bg-yellow-500"
          >
            🌗 Toggle Mode
          </button>

          <div className="hidden md:block">
            <XrpPriceWidget />
          </div>

          <div className="mt-3 md:mt-0">
            {loading ? (
              <span className="text-gray-500 dark:text-gray-300 animate-pulse">Loading...</span>
            ) : isConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {shortenAddress(walletAddress)}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      {isConnected && walletAddress && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow animate-pulse">
          Connected: {shortenAddress(walletAddress)}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </header>
  );
};

export default Navbar;
