import React, { createContext, useState, useEffect } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal"
import { DateTime } from "luxon"
import { ethers } from "ethers"

import tournamentContract from "../contracts/tournament.json"
import daiContract from "../contracts/dai.json"
import tournamentFactoryContract from "../contracts/tournamentFactory.json"

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState(null)
  const [_signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)

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

    const web3Provider = new ethers.providers.Web3Provider(web3ModalConnection)
    setProvider(web3Provider)

    const signer = web3Provider.getSigner()
    setSigner(signer)

    const accounts = await web3Provider.listAccounts()
    setAddress(accounts[0])

    return signer
  }
  
  const getSigner = async () => {
    return _signer || connectWallet()
  }

  const getSignedContract = async (address) => {
    const signer = await getSigner()
    return new ethers.Contract(address, tournamentContract.abi, signer);
  }

  const approveDai = async (contractAddress, amount) => {
    const signer = await getSigner()
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

  const createTournament = async (start, end, price) => {
    if (!provider) {
      return connectWallet()
    }

    const currentBlock = await provider.getBlockNumber()
    console.log(start)
    console.log(DateTime.now().diff(DateTime.fromISO(start)))
    console.log(currentBlock)
    // const signer = await getSigner()
    // const factory = new ethers.Contract(tournamentFactoryContract.address, tournamentFactoryContract.abi, signer)
    // await factory.CreateTournament(start, end, price, daiContract.address, tournamentContract.address)
  }

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        address,
        joinContest,
        swapToken,
        claimReward,
        createTournament
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};