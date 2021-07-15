import React, { createContext, useState, useEffect } from "react"

import * as coingeckoApi from '../api/coingecko'
const tokenList = require('../whitelists/polygon.json')

export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
  const [tokens, setTokens] = useState(tokenList)

  useEffect(() => {
    async function getCurrentPrices() {
      const data = await coingeckoApi.getTokens(tokenList.map(coin => coin.coingeckoId))
      
      if (data && data.length > 0) {
        const updatedTokens = tokens.map(token => {
          const tokenData = data.find(x => x.id === token.coingeckoId)
          return {
            ...token,
            price: tokenData ? tokenData.current_price : token.price
          }
        })

        console.log(updatedTokens)
        setTokens(updatedTokens)
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