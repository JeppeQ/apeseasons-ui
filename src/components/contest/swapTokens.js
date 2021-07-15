import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDown from '@material-ui/icons/ArrowDownward'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import CurrencyIcon from '@material-ui/icons/MonetizationOn'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import { SelectTokenDialog } from '../dialogs/selectTokenDialog'

export function SwapTokens(props) {
  const classes = useStyles()
  const [selectToken, setSelectToken] = useState(false)

  function Input() {
    const [amount, setAmount] = useState()

    const handleChange = (event) => {
      setAmount(event.target.value)
    }

    return (
      <TextField
        className={classes.input}
        placeholder={0}
        value={amount}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <Box>
              <Box display='flex' alignItems='center'>
                <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginRight: '3px' }} />
                <Typography variant='subtitle2'>
                  <NumberFormat value={0.00058231} displayType={'text'} />
                </Typography>
              </Box>
              <Box display='flex' alignItems='center'>
                <Typography variant='subtitle2' style={{ color: 'rgba(255, 255, 255, 0.4)' }}>≈ 0.23 USDC</Typography>
              </Box>
            </Box>
          ),
          classes: { notchedOutline: classes.inputFieldSet }
        }}
        inputProps={{
          style: { height: '1.8em', fontSize: '18px' }
        }}
      />
    )
  }

  function TokenBox(props) {
    return (
      <Box className={classes.tokenBox}>
        <Box display='flex'>
          <CurrencyIcon style={{ fontSize: '50px' }} />
          <Box ml={1} mr={3} width='140px'>
            <Typography variant='subtitle1'>{props.text}</Typography>
            <Box display='flex' onClick={() => setSelectToken(true)}>
              <Typography variant='h3' style={{ fontSize: '22px' }} noWrap>{props.token}</Typography>
              <KeyboardArrowDownIcon />
            </Box>
          </Box>
        </Box>
        {<Input />}
      </Box>
    )
  }

  return (
    <Box className={classes.mainContainer}>
      <TokenBox text='swap from' token='ETH' />
      {/* <ArrowDown /> */}
      <TokenBox text='swap to' token='DAI' />
      <Box mt={2}>
        <Button variant='contained' color='primary'>SWAP</Button>
      </Box>
      {selectToken && <SelectTokenDialog
        open={selectToken}
        close={() => setSelectToken(false)}
        playerTokens={props.playerTokens} />
      }
    </Box>
  )
}


const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenBox: {
    width: '550px',
    height: '100px',
    borderRadius: '5px',
    backgroundColor: 'rgba(70, 45, 130, 0.5)',
    display: 'flex',
    padding: '0 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0'
  },
  input: {
    backgroundColor: '#231E2F',
    borderRadius: '10px',
    width: '280px'
  },
  inputFieldSet: {
    border: 'none'
  }
});