/* global BigInt */
import { ethers } from "ethers"
import { useSnackbar } from 'notistack'
import React, { createContext, useContext, useEffect, useState } from "react"
import Web3Modal from "web3modal"
import { MetaMaskDialog } from "../components/dialogs/metamaskDialog"
import tokenContracts from "../contracts/tokens.json"
import tournamentContract from "../contracts/tournament.json"
import tournamentFactoryContract from "../contracts/tournamentFactory.json"
import { UpdateContext } from './updateContext'
import { Polygon } from "../helpers/addresses"

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState(null)
  const [_signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [networkSupported, setNetworkSupported] = useState(true)
  const [forceAccount, setForceAccount] = useState(false)
  const [metaMaskDialog, openMetaMaskDialog] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const update = useContext(UpdateContext)

  const gasOptions = { gasLimit: 1000000, nonce: 45, value: 0 }
  const supportedChainIds = [137]

  useEffect(() => {
    if (!window.ethereum) {
      return
    }

    connectWallet(true)
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!networkSupported) {
      enqueueSnackbar('Unsupported network. Please switch to Polygon.', {
        variant: 'error',
        persist: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    } else {
      closeSnackbar()
    }
    // eslint-disable-next-line
  }, [networkSupported])

  const waitTransaction = async (tx, callback) => {
    const key = enqueueSnackbar('Awaiting confirmation...', {
      variant: 'info',
      persist: true
    });

    const receipt = await tx.wait()

    if (receipt) {
      enqueueSnackbar('Transaction successful', { variant: 'success' });

      if (callback) {
        callback()
      }

    } else {
      enqueueSnackbar('Transaction failed', { variant: 'error' });
    }

    closeSnackbar(key)
  }

  const disconnectWallet = () => {
    setAddress(null)
    setForceAccount(true)
  }

  const calculateGasPrice = (gasEstimation) => {
    return BigInt(10 ** 6 * gasEstimation.toNumber() * 2)
  }

  const connectWallet = async (initial) => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      openMetaMaskDialog(true)
      return
    }

    const web3Modal = new Web3Modal({
      network: "matic", // optional
      cacheProvider: true, // optional
      theme: 'dark',
    });

    if (initial && !web3Modal.cachedProvider) {
      return
    }

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
    await contract.approve(contractAddress, String(amount * 2))
  }

  const joinContest = async (contestId, price, entryToken) => {
    await approveToken(entryToken, contestId, price)

    const contract = await getSignedContract(contestId)

    const gasEstimation = await contract.estimateGas.buyTicket()
    const gas = { ...gasOptions, gasPrice: calculateGasPrice(gasEstimation) }

    const tx = await contract.buyTicket(gas)
    waitTransaction(tx, () => update.setTournamentId(contestId))
  }

  const swapToken = async (contestId, tokenIn, tokenOut, amountIn) => {
    try {
      const contract = await getSignedContract(contestId)
      const amount = BigInt(10 ** 18 * amountIn)

      const gasEstimation = await contract.estimateGas.trade(tokenIn, tokenOut, amount, 1)
      const gas = { ...gasOptions, gasPrice: calculateGasPrice(gasEstimation) }

      const tx = await contract.trade(tokenIn, tokenOut, amount, 1, gas)
      waitTransaction(tx)
    } catch (ex) {
      enqueueSnackbar('Something went wrong. Try again.', { variant: 'error' });
    }

    update.setTradeInProgress(false)
  }

  const claimReward = async (contestId, playerPos) => {
    const contract = await getSignedContract(contestId)

    const gasEstimation = await contract.estimateGas.withdrawWinnings(playerPos)
    const gas = { ...gasOptions, gasPrice: calculateGasPrice(gasEstimation) }

    const tx = await contract.withdrawWinnings(playerPos, gas)
    waitTransaction(tx)
  }

  const createTournament = async (name, start, end, price, entryToken, apeTax, tradeRouteToken) => {
    if (!provider) {
      return connectWallet()
    }

    const currentBlock = await provider.getBlockNumber()
    const startBlock = currentBlock + Math.round(start.diffNow('seconds').seconds / 2.1)
    const endBlock = currentBlock + Math.round(end.diffNow('seconds').seconds / 2.1)

    const entry = BigInt(10 ** 18 * price)
    const apeFee = BigInt(10 ** 18 * apeTax)

    const signer = await getSigner()
    const factory = new ethers.Contract(Polygon.tournamentFactory, tournamentFactoryContract.abi, signer)

    await factory.createTournament(startBlock, endBlock, entry, apeFee, tokenContracts[entryToken], address, tokenContracts[tradeRouteToken],
      Polygon.prizeStructure, Polygon.rewardDistributor, name, { ...gasOptions, gasPrice: BigInt(10 ** 12), gasLimit: 10000000 })
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