import React, { createContext, useState, useEffect } from "react"

export const UpdateContext = createContext()

export const UpdateProvider = ({ children }) => {
  const [tournamentId, setTournamentId] = useState()
  const [tradeInProgress, setTradeInProgress] = useState()

  useEffect(() => {
  }, [])

  return (
    <UpdateContext.Provider
      value={{
        tournamentId,
        setTournamentId,
        tradeInProgress,
        setTradeInProgress,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};