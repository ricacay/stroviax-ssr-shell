import { useEffect, useState } from "react";
import { useWalletStore } from "../store/walletStore";

let xumm = null;

export const useXamanAuth = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const {
    walletAddress,
    setWalletAddress,
    clearWalletAddress,
  } = useWalletStore();

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") return;

      const { XummPkce } = await import("xumm-oauth2-pkce");

      const app = new XummPkce({
        clientId: import.meta.env.VITE_XUMM_CLIENT_ID,
        redirectUrl: window.location.href,
      });

      setClient(app);

      // Try to restore session
      const isAuthorized = await app.isAuthorized();
      if (isAuthorized) {
        const user = await app.user();
        if (user?.sub) {
          setWalletAddress(user.sub);
        }
      }

      setLoading(false);
    };

    init();
  }, [setWalletAddress]);

  const login = async () => {
    if (!client) return;
    await client.authorize();
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
