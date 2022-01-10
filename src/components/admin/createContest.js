import { DateTimePicker } from '@mui/lab';
import { Box, Button, InputAdornment, Menu, MenuItem, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DateTime } from "luxon";
import React, { useContext, useState } from 'react';
import { Web3Context } from '../../contexts/web3Context';

const entryTokens = ['DAI', 'MATIC']

export function CreateContest(props) {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = useState('Test')
  const [entryFee, setEntryFee] = useState(0.01)
  const [apeTax, setApeTax] = useState(10)
  const [start, setStart] = useState(DateTime.now().plus({ hours: 5 }))
  const [end, setEnd] = useState(DateTime.now().plus({ days: 7 }))
  const [entryToken, setEntryToken] = useState('DAI')
  const [tradeRouteToken, setTradeRouteToken] = useState('ETH')

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createTourney = () => {
    web3.createTournament(name, start, end, entryFee, entryToken, apeTax, tradeRouteToken)
  }

  return (
    <Box className={classes.container}>

      <Typography variant='h6'>Create Contest</Typography>

      <TextField
        color='secondary'
        label="Name"
        fullWidth
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <TextField
        color='secondary'
        label="Entry fee"
        fullWidth
        value={entryFee}
        onChange={(event) => setEntryFee(event.target.value)}
        InputProps={{
          endAdornment: <Box onClick={(event) => setAnchorEl(event.currentTarget)}>
            <InputAdornment position="start">
              {entryToken}
            </InputAdornment>
          </Box>,
        }}
      />

      <TextField
        color='secondary'
        label="Ape tax %"
        fullWidth
        value={apeTax}
        onChange={(event) => setApeTax(event.target.value)}
      />

      <TextField
        color='secondary'
        label="Trade route token"
        fullWidth
        value={tradeRouteToken}
        onChange={(event) => setTradeRouteToken(event.target.value)}
      />

      <DateTimePicker
        label="Start date"
        value={start}
        onChange={(date) => setStart(date)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />

      <DateTimePicker
        label="End date"
        value={end}
        onChange={(date) => setEnd(date)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />

      <Button variant='contained' color='secondary' onClick={createTourney}>Create</Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {React.Children.toArray(
          entryTokens.map(token => <MenuItem
            onClick={() => { setEntryToken(token); handleClose(); }}>
            {token}
          </MenuItem>)
        )}
      </Menu>
    </Box>
  )
}



const useStyles = makeStyles({
  container: {
    marginTop: '30px',
    width: '300px',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#231E2F'
  },
});