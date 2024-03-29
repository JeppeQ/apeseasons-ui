import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import React, { useContext, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import Medal from '../../assets/images/medal.svg'
import { Web3Context } from '../../contexts/web3Context'
import { UpdateContext } from '../../contexts/updateContext'
import * as playerApi from '../../api/player'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BigNumber } from 'ethers'

export default function SideBar(props) {
  const classes = useStyles()
  const web3 = useContext(Web3Context)
  const update = useContext(UpdateContext)

  const [join, disableJoin] = useState(false)
  const [approve, disableApprove] = useState(false)

  const [claim, disableClaim] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [hasApproved, setHasApproved] = useState(false)

  const { id, prizePool, placesPaid, ticketPrice, ticketTokenSymbol, finalized } = props.tournament
  const { rank, prize, prizeStatus } = props.player || {}

  useEffect(() => {
    async function get() {
      const participant = await playerApi.isParticipant(web3.address, id)
      setHasJoined(participant)
    }

    if (web3.address) {
      get()
      checkAllowance()
    }

    // eslint-disable-next-line
  }, [web3.address, id])

  async function checkAllowance() {
    const allowance = await web3.getAllowance(web3.address, id, ticketTokenSymbol)
    if (allowance.gt(BigNumber.from(0))) {
      setHasApproved(true)
    } else {
      setHasApproved(false)
      disableApprove(false)
    }
  }

  const approveSpending = () => {
    web3.approveToken(ticketTokenSymbol, id, ticketPrice, () => setHasApproved(true))
    disableApprove(true)
  }

  const joinTournament = () => {
    web3.joinContest(id, ticketPrice, ticketTokenSymbol)
    disableJoin(true)
  }

  const claimReward = () => {
    web3.claimReward(id, rank - 1)
    disableClaim(true)
  }

  return (
    <Box className={classes.signupContainer}>
      <Box display='flex' alignItems='center' flexDirection='column'>

        <img src={Medal} width={'40%'} alt='prize' />

        <Box my={2} />
        <Typography variant='subtitle1'>Prize pool</Typography>
        <Typography variant='h5'><NumberFormat value={prizePool} displayType={'text'} prefix={'$'} thousandSeparator /></Typography>

        <Box my={2} />
        <Typography variant='subtitle1'>Places paid</Typography>
        <Typography variant='h5'>{placesPaid || 0}</Typography>

      </Box>

      {props.signup && <Box display='flex' alignItems='center' flexDirection='column' width={'90%'}>

        {/* <Typography variant='subtitle1'>Sign up bonus</Typography>
        <Typography variant='h5'>2 $APE</Typography> */}

        {(hasJoined || update.tournamentId === id)
          ? <Typography variant='subtitle1'>
            You have joined
          </Typography>
          : <Box width={'100%'} mt={5}>

            <Button
              fullWidth
              variant='contained'
              color='secondary'
              onClick={approveSpending}
              disabled={approve || hasApproved}
              endIcon={hasApproved ? <CheckCircleIcon /> : null}
            >
              approve
            </Button>
            <Box mt={2} width={'100%'} />
            <Button
              fullWidth
              variant='contained'
              color='secondary' onClick={joinTournament} disabled={join || !hasApproved}>
              ENTER
            </Button>

          </Box>
        }
      </Box>}

      {props.prize && <Box display='flex' alignItems='center' flexDirection='column'>

        <Typography variant='subtitle1'>Your prize</Typography>
        <NumberFormat value={prize} displayType={'text'} prefix={'$'} thousandSeparator decimalScale={2} />
        <Box mt={2} />

        {!finalized &&
          <Typography variant='subtitle2'>Contest is being finalized..</Typography>
        }

        {finalized && prize > 0 && prizeStatus === 'unclaimed' &&
          <Button variant='contained' color='secondary' onClick={claimReward} disabled={claim}>
            CLAIM NOW
          </Button>}

        {finalized && prizeStatus === 'claimed' && <Button>Claimed</Button>}
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