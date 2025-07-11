# 🔦 Known Issues - StroviaX Wallet Integration

## Issue: Xumm / Xaman OAuth2 PKCE SDK - Session Handling

### ⚠️ Problem Summary

When integrating the [`xumm-oauth2-pkce`](https://www.npmjs.com/package/xumm-oauth2-pkce) package in StroviaX, several SDK methods caused **runtime crashes** during app initialization:

* `.isAuthorized()` ➖❌ `TypeError: isAuthorized is not a function`
* `.hasSession()` ➖❌ `TypeError: hasSession is not a function`
* `.getUserToken()` ➖❌ `TypeError: getUserToken is not a function`

The OAuth2 PKCE SDK **does not expose reliable session check methods** for restoring sessions after a page reload, despite misleading examples in some community discussions.

---

### ✅ Current Working Solution (as of July 2025)

* ✅ Skip session restore on app load.
* ✅ Require manual login using `.authorize()` every time the user visits the app.
* ✅ Safely retrieve user info **after login is successful.**

#### Stable `useXamanAuth.js` Implementation:

```jsx
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

    const token = await client.authorize(); // Opens the Xumm login popup

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
```

---

### 🔧 Future Fix Recommendations

* Monitor `xumm-oauth2-pkce` updates for session restore improvements.
* Consider custom token/session handling with localStorage:

  * Save and retrieve tokens manually.
  * Refresh token as needed via OAuth2 flows.
  * Add your own `hasSession()` wrapper.

---

### ✅ Current Status

✔️ App is stable using **manual login**.
✔️ No session restore on page load.
✔️ Xumm OAuth2 flow works reliably when triggered explicitly by the user.

---

*Last updated: July 2025*
