/* global BigInt */
import React, { createContext, useEffect, useState } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"

import tournamentContract from "../contracts/tournament.json"
import tokenContracts from "../contracts/tokens.json"
import tournamentFactoryContract from "../contracts/tournamentFactory.json"
import { MetaMaskDialog } from "../components/dialogs/metamaskDialog"

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState(null)
  const [_signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [networkSupported, setNetworkSupported] = useState(true)
  const [forceAccount, setForceAccount] = useState(false)
  const [metaMaskDialog, openMetaMaskDialog] = useState(false)

  const gasOptions = { gasPrice: 1000000000, gasLimit: 10000000, nonce: 45, value: 0 }
  const supportedChainIds = [137]

  useEffect(() => {
    if (!window.ethereum) {
      return
    }

    connectWallet()
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    // eslint-disable-next-line
  }, [])

  const disconnectWallet = () => {
    setAddress(null)
    setForceAccount(true)
  }

  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      openMetaMaskDialog(true)
      return
    }

    const web3Modal = new Web3Modal({
      network: "matic", // optional
      cacheProvider: true, // optional
      theme: 'dark',
    });

    if (forceAccount) {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
      setForceAccount(false)
    }

    const web3ModalConnection = await web3Modal.connect();

    const web3Provider = new ethers.providers.Web3Provider(web3ModalConnection)

    const network = await web3Provider.getNetwork()
    if (!supportedChainIds.includes(network.chainId)) {
      setNetworkSupported(false)
    }

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

  const approveToken = async (token, contractAddress, amount) => {
    const signer = await getSigner()
    const contract = new ethers.Contract(tokenContracts[token], tokenContracts.abi, signer);
    await contract.approve(contractAddress, String(amount*2))
  }

  const joinContest = async (contestId, price, entryToken) => {
    await approveToken(entryToken, contestId, price)
    const contract = await getSignedContract(contestId)
    await contract.buyTicket(gasOptions)
  }

  const swapToken = async (contestId, tokenIn, tokenOut, amountIn) => {
    const contract = await getSignedContract(contestId)

    const amount = BigInt(10 ** 18 * amountIn)
    console.log(tokenIn, tokenOut, amount)
    await contract.trade(tokenIn, tokenOut, amount, 1, gasOptions)
  }

  const claimReward = async (contestId, playerPos) => {
    const contract = await getSignedContract(contestId)
    await contract.withdrawWinnings(playerPos, gasOptions)
  }

  const createTournament = async (name, start, end, price, entryToken) => {
    if (!provider) {
      return connectWallet()
    }

    const currentBlock = await provider.getBlockNumber()
    const startBlock = currentBlock + Math.round(start.diffNow('seconds').seconds / 15)
    const endBlock = currentBlock + Math.round(end.diffNow('seconds').seconds / 15)
    const entry = BigInt(10 ** 18 * price)
    const prizeStructureAddress = '0xA728e789f6c65aA75bD77844D0ea81C9c4D43950'
    const rewardDistributorAddress = '0x0dea4Be9B1E4f4E8E4cdf53A1d3736Fff0f337C3'

    const signer = await getSigner()
    const factory = new ethers.Contract(tournamentFactoryContract.address, tournamentFactoryContract.abi, signer)
    await factory.createTournament(startBlock, endBlock, entry, tokenContracts[entryToken], address,
      prizeStructureAddress, rewardDistributorAddress, name, gasOptions)
  }

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        address,
        joinContest,
        swapToken,
        claimReward,
        createTournament,
        networkSupported,
        disconnectWallet,
      }}
    >
      {children}
      <MetaMaskDialog open={metaMaskDialog} close={() => openMetaMaskDialog(false)} />
    </Web3Context.Provider>
  );
};