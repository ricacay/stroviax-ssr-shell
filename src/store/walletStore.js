import { create } from "zustand";

export const useWalletStore = create((set) => ({
  walletAddress: null,
  isConnected: false,
  setWalletAddress: (addr) => set({ walletAddress: addr }),
  setConnected: (status) => set({ isConnected: status }),
}));
