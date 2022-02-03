import WalletIcon from '@mui/icons-material/AccountBalanceWallet'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CurrencyIcon from '@mui/icons-material/MonetizationOn'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import NumberFormat from 'react-number-format'
import Logos from '../../helpers/logos'



export default function TokenBox(props) {
  const playerToken = props.playerToken
  const classes = useStyles()

  const handleChange = (e) => {
    props.setAmount(e.target.value)
  }

  const handleBlur = (e) => {
    if (e.target.value > playerToken?.amountRounded) {
      props.setAmount(playerToken?.amountRounded)
    }
  }


  return (
    <Box className={classes.tokenBox}>
      <Box display='flex' onClick={props.selectToken}>
        {props.token
          ? <img src={Logos[props.token.symbol]} style={{ width: '50px', height: '50px' }} alt='tokenSymbol' />
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
        placeholder={"0"}
        value={props.amount}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        disabled={props.disabled}
        InputProps={{
          startAdornment: <InputAdornment>{props.disabled ? '≈' : ''}</InputAdornment>,
          endAdornment: (
            <React.Fragment>
              {!props.disabled && <Box>
                <Box style={{ cursor: 'pointer' }} display='flex' alignItems='center' onClick={() => props.setAmount(playerToken ? playerToken.amountRounded : 0)}>
                  <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginRight: '3px' }} />
                  <Typography variant='subtitle2'>
                    {playerToken ? playerToken.amountRounded : 0}
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