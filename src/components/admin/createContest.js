import React, { useState, useContext } from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { DateTime } from "luxon"

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { KeyboardDateTimePicker } from '@material-ui/pickers'

import { Web3Context } from '../../contexts/web3Context'

export function CreateContest(props) {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  const [name, setName] = useState('Test')
  const [entryFee, setEntryFee] = useState(0.01)
  const [start, setStart] = useState(DateTime.now().plus({ hours: 5 }))
  const [end, setEnd] = useState(DateTime.now().plus({ days: 7 }))
  const [entryToken] = useState('DAI')

  const createTourney = () => {
    web3.createTournament(name, start, end, entryFee, entryToken)
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
          endAdornment: <InputAdornment position="start">MATIC</InputAdornment>,
        }}
      />

      <KeyboardDateTimePicker
        disableToolbar
        fullWidth
        variant="inline"
        color='secondary'
        format="MM/dd/yyyy HH:mm"
        margin="normal"
        label="Start "
        value={start}
        onChange={(date) => setStart(date)}
      />

      <KeyboardDateTimePicker
        disableToolbar
        fullWidth
        variant="inline"
        color='secondary'
        format="MM/dd/yyyy HH:mm"
        margin="normal"
        label="End "
        value={end}
        onChange={(date) => setEnd(date)}
      />

      <Button variant='contained' color='secondary' onClick={createTourney}>Create</Button>
    </Box>
  )
}



const useStyles = makeStyles({
  container: {
    marginTop: '30px',
    width: '300px',
    minHeight: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#231E2F'
  },
});