import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Web3Context } from '../../contexts/web3Context'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


import Medal from '../../assets/images/medal.svg'

export default function SideBar(props) {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  const { id, prizePool, ticketPrice } = props.tournament
  return (
    <Box className={classes.signupContainer}>
      <Box display='flex' alignItems='center' flexDirection='column'>

        <img src={Medal} width={'40%'} alt='prize' />

        <Box my={2} />
        <Typography variant='subtitle1'>Prize pool</Typography>
        <Typography variant='h5'><NumberFormat value={prizePool} displayType={'text'} prefix={'$'} thousandSeparator /></Typography>

        <Box my={2} />
        <Typography variant='subtitle1'>Places paid</Typography>
        <Typography variant='h5'>32</Typography>

      </Box>

      {props.signup && <Box display='flex' alignItems='center' flexDirection='column'>

        <Typography variant='subtitle1'>Sign up bonus</Typography>
        <Typography variant='h5'>2 Banana</Typography>

        <Box width={'100%'} mt={5}>
          <Button fullWidth variant='contained' color='secondary' onClick={() => web3.joinContest(id, ticketPrice)}>
            ENTER
          </Button>
        </Box>

      </Box>}

    </Box>
  )
}

const useStyles = makeStyles({
  signupContainer: {
    height: '500px',
    width: '205px',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0 50px'
  }
});