import React, { createContext, useState, useEffect } from "react"

import * as tokenApi from '../api/token'

export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    async function getCurrentPrices() {
      const data = await tokenApi.getTokens()

      if (data && data.length > 0) {
        setTokens(data)
      }
    }

    getCurrentPrices()

    const periodicFetch = setInterval(() => {
      getCurrentPrices()
    }, 60000)

    return () => clearInterval(periodicFetch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TokenContext.Provider
      value={{
        tokens
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};