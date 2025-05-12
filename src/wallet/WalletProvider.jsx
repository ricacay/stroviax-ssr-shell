import React, { useEffect, useState } from 'react'

const WalletProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false)
  const [xumm, setXumm] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
      console.log('Client-side wallet logic mounted')
      console.log('Client ID from .env:', import.meta.env.VITE_XAMAN_CLIENT_ID)

      const loadXumm = async () => {
        try {
          const { XummPkce } = await import('xumm-oauth2-pkce')
          const xummClient = new XummPkce(import.meta.env.VITE_XAMAN_CLIENT_ID)
          setXumm(xummClient)
          console.log('✅ Xumm client initialized:', xummClient)
        } catch (err) {
          console.error('❌ Failed to initialize Xumm SDK:', err)
        }
      }

      loadXumm()
    }
  }, [])

  if (!isClient) return null

  return (
    <>
      {children}
    </>
  )
}

export default WalletProvider
