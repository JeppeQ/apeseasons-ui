import React, { createContext, useState, useEffect } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal"
import { ethers } from "ethers"

import tournamentContract from "../contracts/tournament.json"
import daiContract from "../contracts/dai.json"

export const TournamentContext = createContext()

export const TournamentProvider = ({ children }) => {
  const [address, setAddress] = useState(null)
  const [signer, setSigner] = useState(null)

  const infuraId = 'f80d51814eef48c3b911ed0f0b52507c'
  const gasOptions = {gasPrice: 1000000000, gasLimit: 850000, nonce: 45, value: 0}

  const connectWallet = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: "goerli", // optional
      cacheProvider: false, // optional
      providerOptions,
      theme: 'dark',
    });

    const web3ModalConnection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(web3ModalConnection)
    setSigner(provider.getSigner())

    const accounts = await provider.listAccounts()
    setAddress(accounts[0])
  }
  
  const getSignedContract = (address) => {
    return new ethers.Contract(address, tournamentContract.abi, signer);
  }

  const approveDai = async (contractAddress, amount) => {
    const dai = new ethers.Contract(daiContract.address, daiContract.abi, signer);
    await dai.approve(contractAddress, amount)
  }

  const joinContest = async (contestId, price) => {
    await approveDai(contestId, price)

    const contract = getSignedContract(contestId)
    await contract.buy_ticket(gasOptions)
  }
  
  const swapToken = async (contestId, token, swapTo) => {
    const contract = getSignedContract(contestId)
    await contract.trade(token, swapTo, gasOptions)
  }
  
  const claimReward = async (contestId) => {
    const contract = getSignedContract(contestId)
    await contract.withdrawWinnings(gasOptions)
  }

  return (
    <TournamentContext.Provider
      value={{
        connectWallet,
        address,
        joinContest,
        swapToken,
        claimReward
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};