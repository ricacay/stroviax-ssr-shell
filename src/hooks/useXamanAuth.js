// useXamanAuth.js
import { useEffect, useState } from "react";
import { useWalletStore } from "../store/walletStore";

export const useXamanAuth = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const { walletAddress, setWalletAddress, clearWalletAddress } = useWalletStore();

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") return;

      try {
        const { XummPkce } = await import("xumm-oauth2-pkce");

        const app = new XummPkce({
          clientId: import.meta.env.VITE_XUMM_CLIENT_ID,
          redirectUrl: window.location.origin,
        });

        setClient(app);

        // Auto-authorize if possible
        const state = await app.state();
        if (state?.me?.sub) {
          setWalletAddress(state.me.sub);
        }

        setLoading(false);
      } catch (error) {
        console.error("Xaman initialization failed:", error);
        setLoading(false);
      }
    };

    init();
  }, [setWalletAddress]);

  const login = async () => {
    if (!client) return;
    try {
      setLoading(true);
      const token = await client.authorize();
      if (token?.access_token) {
        const user = await client.user();
        if (user?.sub) {
          setWalletAddress(user.sub);
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!client) return;
    try {
      await client.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      clearWalletAddress();
    }
  };

  return {
    walletAddress,
    login,
    logout,
    isConnected: !!walletAddress,
    loading,
  };
};
