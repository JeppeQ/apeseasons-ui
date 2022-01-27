import NetWorthIcon from '@mui/icons-material/AccountBalanceWallet';
import PlayersIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { DateTime } from 'luxon';
import React from 'react';
import NumberFormat from 'react-number-format';
import logo from '../assets/images/logo.png';
import Medal from '../assets/images/medal.svg';
import Logos from '../helpers/logos';
import { dateDiff, formatTime } from '../helpers/utilities';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ContestOverview(props) {
  const classes = useStyles()

  const { startTime, endTime, ticketPriceFloat,
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
        <Section text={"Duration"} value={`${dateDiff(endTime, startTime)} days`} icon={<ScheduleIcon style={{ fontSize: '32px' }} />} />
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
        <Box className={classes.section} width={'20%'}>
          <Box display='flex' alignItems='center'>

            <img src={Medal} width={'32px'} alt='prize' />
            <Box ml={1.5} mr={3} textAlign={'center'}>
              <Typography variant='subtitle2'>Prize</Typography>
              <Typography variant='h5'>
                <NumberFormat value={prize} displayType={'text'} prefix={'$'} thousandSeparator />
              </Typography>
            </Box>

            {prizeStatus === 'claimed' && <CheckCircleIcon color='secondary' />}
            {prize > 0 && prizeStatus === 'unclaimed' && <PendingActionsIcon color='info' />}
          </Box>
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