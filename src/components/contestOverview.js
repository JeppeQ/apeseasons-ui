import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NumberFormat from 'react-number-format'
import { DateTime } from 'luxon'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PlayersIcon from '@material-ui/icons/Person'
import ScheduleIcon from '@material-ui/icons/Schedule'
import NetWorthIcon from '@material-ui/icons/AccountBalanceWallet'
import PlaceIcon from '@material-ui/icons/Place'

import { formatTime } from '../helpers/utilities'
import Medal from '../assets/images/medal.svg'
import logo from '../assets/images/logo.png'
import Logos from '../helpers/logos'
import { Web3Context } from '../contexts/web3Context'

export default function ContestOverview(props) {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  const { startTime, endTime, startBlock, endBlock, ticketPriceFloat,
    ticketTokenSymbol, playerCount, prizePool, name } = props.data

  const { rank, netWorth, prize, prizeStatus } = props.playerData || {}

  function Section(data) {
    return (
      <Box className={classes.section} width={data.width || '20%'}>
        <Box display='flex' alignItems='center'>
          {data.icon}
          <Box ml={1.5} textAlign={'center'}>
            <Typography variant='subtitle2'>{data.text}</Typography>
            <Typography variant='h5'>{data.value}</Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  const claimReward = () => {
    web3.claimReward(props.data.id, rank - 1)
  }

  return (
    <React.Fragment>

      <Box className={classes.section} mr={1} justifyContent={'center'}>
        <img src={logo} style={{ width: '80%' }} alt='contestImage' />
      </Box>

      <Box className={classes.section} width={'35%'}>
        <Typography variant='h5' className={classes.contestTitle}>{name}</Typography>
        {props.startingIn && <Typography variant='subtitle2'>{`Starting in: ${formatTime(DateTime.fromMillis(startTime), DateTime.utc())}`}</Typography>}
        {props.runningFor && <Typography variant='subtitle2'>{`Running for: ${formatTime(DateTime.utc(), DateTime.fromMillis(startTime))}`}</Typography>}
        {props.endingIn && <Typography variant='subtitle2'>{`Ending in: ${formatTime(DateTime.fromMillis(endTime), DateTime.utc())}`}</Typography>}
        {props.gameOver && <Typography variant='subtitle2'>{prize > 0 ? `Ape gone wild` : 'No luck this time'}</Typography>}
      </Box>


      {props.entry &&
        <Section text={"Entry"} value={`${ticketPriceFloat} ${ticketTokenSymbol}`} icon={<img src={Logos[ticketTokenSymbol]} height={32} alt='tokenSymbol' />} />
      }

      {props.players &&
        <Section text={"Players"} value={playerCount} icon={<PlayersIcon style={{ fontSize: '32px' }} />} />
      }

      {props.duration &&
        <Section text={"Duration"} value={`${Math.round((endBlock - startBlock) / 5760)} days`} icon={<ScheduleIcon style={{ fontSize: '32px' }} />} />
      }

      {props.netWorth &&
        <Section text={"Net worth"}
          value={<NumberFormat value={netWorth} displayType={'text'} prefix={'$'} thousandSeparator />}
          icon={<NetWorthIcon style={{ fontSize: '32px' }} />}
        />
      }

      {props.position &&
        <Section text={"Position"} value={`${rank} / ${playerCount}`} icon={<PlaceIcon style={{ fontSize: '32px' }} />} />
      }

      {props.prizePool &&
        <Section text={"Prize pool"}
          value={<NumberFormat value={prizePool} displayType={'text'} prefix={'$'} thousandSeparator />}
          icon={<img src={Medal} width={'32px'} alt='prize' />}
        />
      }

      {props.prize &&
        <Section text={"Prize"}
          value={<NumberFormat value={prize} displayType={'text'} prefix={'$'} thousandSeparator />}
          icon={<img src={Medal} width={'32px'} alt='prize' />}
        />
      }

      {props.prizeWithStatus &&
        <Box className={classes.section} width={'30%'}>
          <Box display='flex' alignItems='center'>
            <img src={Medal} width={'32px'} alt='prize' />
            <Box ml={1.5} mr={3} textAlign={'center'}>
              <Typography variant='subtitle2'>Prize</Typography>
              <Typography variant='h5'><NumberFormat value={prize} displayType={'text'} prefix={'$'} thousandSeparator /></Typography>
            </Box>
          </Box>
          {prize > 0 && prizeStatus === 'unclaimed' && <Button variant='contained' color='secondary' fullWidth onClick={claimReward}>CLAIM</Button>}
          {prizeStatus === 'claimed' && <Typography variant='subtitle2'>Prize Claimed</Typography>}
        </Box>
      }

    </React.Fragment>
  )
}

const useStyles = makeStyles({
  contestOverview: {
    width: '100%',
    display: 'flex',
    padding: '20px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden'
  },
});