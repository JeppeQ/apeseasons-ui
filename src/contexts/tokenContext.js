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