import { useEffect, useState } from "react";
import { useWalletStore } from "../store/walletStore";

export const useXamanAuth = () => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(null);
  const { walletAddress, setWalletAddress, clearWalletAddress } = useWalletStore();

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") return;

      const { XummPkce } = await import("xumm-oauth2-pkce");

      const app = new XummPkce({
        clientId: import.meta.env.VITE_XUMM_CLIENT_ID,
        redirectUrl: window.location.href,
      });

      setClient(app);
    };

    init();
  }, []);

  const login = async () => {
    if (!client) return;

    const token = await client.authorize(); // triggers login popup
    if (token?.access_token) {
      const user = await client.user();
      if (user?.sub) {
        setWalletAddress(user.sub);
      }
    }
  };

  const logout = async () => {
    if (!client) return;
    await client.logout();
    clearWalletAddress();
  };

  return {
    walletAddress,
    login,
    logout,
    isConnected: !!walletAddress,
    loading,
  };
};
