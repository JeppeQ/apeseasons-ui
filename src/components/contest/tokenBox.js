import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import CurrencyIcon from '@material-ui/icons/MonetizationOn'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import InputAdornment from '@material-ui/core/InputAdornment'

import Logos from '../../helpers/logos'

export default function TokenBox(props) {
  const classes = useStyles()
  
  const handleChange = (e) => {
    props.setAmount(e.target.value)
  }
  
  const playerToken = props.playerToken
  return (
    <Box className={classes.tokenBox}>
      <Box display='flex' onClick={props.selectToken}>
        {props.token
          ? <img src={Logos[props.token.symbol]} style={{ width: '50px', height: '50px' }} />
          : <CurrencyIcon style={{ fontSize: '50px' }} />
        }
        <Box ml={1} mr={3} width='140px'>
          <Typography variant='subtitle1'>{props.text}</Typography>
          <Box display='flex'>
            <Typography variant='h3' style={{ fontSize: '22px' }} noWrap>
              {props.token ? props.token.symbol : 'SELECT'}
            </Typography>
            <KeyboardArrowDownIcon />
          </Box>
        </Box>
      </Box>

      <TextField
        className={classes.input}
        placeholder={0}
        value={props.amount}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        disabled={props.disabled}
        InputProps={{
          startAdornment: <InputAdornment>{props.disabled ? '≈' : ''}</InputAdornment>,
          endAdornment: (
            <React.Fragment>
              {!props.disabled && <Box>
                <Box style={{ cursor: 'pointer' }} display='flex' alignItems='center' onClick={() => props.setAmount(playerToken ? playerToken.amountFloat : 0)}>
                  <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginRight: '3px' }} />
                  <Typography variant='subtitle2'>
                    <NumberFormat value={playerToken ? playerToken.amountFloat : 0} displayType={'text'} />
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                  <Typography noWrap variant='subtitle2' style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    {<NumberFormat value={playerToken ? playerToken.amountFloat * props.token.price : 0} displayType={'text'} prefix={'≈ $'} decimalScale={2} thousandSeparator />}
                  </Typography>
                </Box>
              </Box>
              }
            </React.Fragment>
          ),
          classes: { notchedOutline: classes.inputFieldSet }
        }}
        inputProps={{
          style: { height: '1.8em', fontSize: '18px' }
        }}
      />
    </Box>
  )
}

const useStyles = makeStyles({
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