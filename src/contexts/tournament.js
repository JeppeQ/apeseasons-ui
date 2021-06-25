import React, { createContext, useState } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal"
import { ethers } from "ethers"

import tournamentContract from "../contracts/tournament.json"

export const TournamentContext = createContext()

export const TournamentProvider = ({ children }) => {
  const [address, setAddress] = useState(null)

  const infuraId = 'f80d51814eef48c3b911ed0f0b52507c'
  const contract = ''

  const connect = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions,
      theme: 'dark'
    });

    const web3ModalConnection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(web3ModalConnection)
    const accounts = await provider.listAccounts()
    setAddress(accounts[0])
  }

  const joinContest = async (contestId) => {
    const tx = await contract.buy_ticket()
    const receipt = await tx.wait()
  }

  const swapToken = async (token, swapTo) => {
    const tx = await contract.trade()
    const receipt = await tx.wait()
  }

  const claimReward = async () => {
    const tx = await contract.withdrawWinnings()
    const receipt = await tx.wait()
  }

  return (
    <TournamentContext.Provider
      value={{
        connect,
        address
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};