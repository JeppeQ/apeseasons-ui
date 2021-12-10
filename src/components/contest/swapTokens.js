import React, { useContext, useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import makeStyles from '@mui/styles/makeStyles';
import { SelectTokenDialog } from '../dialogs/selectTokenDialog'
import { TokenContext } from '../../contexts/tokenContext'
import { Web3Context } from '../../contexts/web3Context'
import TokenBox from './tokenBox'

export function SwapTokens(props) {
  const classes = useStyles()
  const tokenProvider = useContext(TokenContext)
  const web3 = useContext(Web3Context)

  const [selectToken, openSelectToken] = useState(false)
  const [fromToken, setFromToken] = useState()
  const [toToken, setToToken] = useState()
  const [fromAmount, setFromAmount] = useState(props.token ? props.token.amountFloat : undefined)
  const [toAmount, setToAmount] = useState()

  useEffect(() => {
    if (props.token) {
      setFromToken(tokenProvider.tokens.find(token => token.address === props.token.tokenAddress))
    }
  }, [props.token, tokenProvider.tokens])

  useEffect(() => {
    if (!fromToken || !toToken || !fromAmount) {
      return
    }

    setToAmount(fromAmount * fromToken.price / toToken.price)

  }, [fromAmount, fromToken, toToken])

  const swapTokens = () => {
    web3.swapToken(props.id, fromToken.address, toToken.address, fromAmount, toAmount)
  }

  return (
    <Box className={classes.mainContainer} mt={3}>

      <TokenBox
        text='swap from'
        token={fromToken}
        amount={fromAmount}
        setAmount={(value) => setFromAmount(value)}
        playerToken={fromToken && props.playerTokens.find(t => t.tokenAddress.toUpperCase() === fromToken.address.toUpperCase())}
        selectToken={() => openSelectToken('1')}
      />

      <TokenBox
        text='swap to'
        token={toToken}
        amount={toAmount}
        setAmount={(value) => setToAmount(value)}
        playerTokens={props.playerTokens}
        selectToken={() => openSelectToken('2')}
        disabled={true}
      />

      <Box mt={2}>
        <Button variant='contained' color='primary'
          disabled={!fromToken || !toToken}
          onClick={swapTokens}>
          SWAP
        </Button>
      </Box>

      {selectToken && <SelectTokenDialog
        open={Boolean(selectToken)}
        close={() => openSelectToken(false)}
        select={(x) => selectToken === '1' ? setFromToken(x) : setToToken(x)}
        playerTokens={props.playerTokens} />
      }
    </Box>
  )
}

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});