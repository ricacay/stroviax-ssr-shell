import React, { createContext, useContext } from "react";
import { useXamanAuth } from "../hooks/useXamanAuth";

// Create context
const WalletContext = createContext();

// Wrap with provider
export const WalletProvider = ({ children }) => {
  const {
    walletAddress,
    login,
    logout,
    isConnected,
    loading,
  } = useXamanAuth();

  return (
    <WalletContext.Provider
      value={{ walletAddress, login, logout, isConnected, loading }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Use hook for accessing wallet state
export const useWallet = () => useContext(WalletContext);
