import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import { useQuery } from '@apollo/client'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { PlayerContest } from '../components/playerContest'
import { ContestFilter } from '../components/contestFilter'
import { fadeVariant } from '../helpers/variants'
import { Web3Context } from '../contexts/web3'
import { PlayerTournamentsQuery } from '../api/queries'

const competitions = [
  { name: 'Ape Season #1', players: 150, netWorth: '100 USD', status: 'ongoing', endTime: '7 Days' },
  { name: 'Ape', players: 120, netWorth: '100 USD', status: 'ongoing', endTime: '7 Days' },
  { name: 'huiji', players: 150, startTime: '2 hours', status: 'upcoming', duration: '7 Days' },
  { name: 'Ape Season Beta', netWorth: '100 USD', players: 150, position: 2, status: 'completed', prize: '100$', prizeStatus: 'unclaimed' },
  { name: 'Ape Season Beta', netWorth: '100 USD', players: 150, position: 2, status: 'completed', prize: '320$', prizeStatus: 'claimed' },
  { name: 'Ape Season Beta', netWorth: '100 USD', players: 150, position: 2, status: 'completed', prize: '0$', prizeStatus: 'none' }
]

function MyContests() {
  const classes = useStyles()
  const [filter, setFilter] = useState('ongoing')
  const web3 = useContext(Web3Context)

  const { loading, error, data } = useQuery(PlayerTournamentsQuery, {
    variables: {
      id: web3.address
    }
  });

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
        <Grid container direction='column' alignItems='flex-start' justify='center' className={classes.mainContainer}>
          <ContestFilter filter={filter} change={setFilter} />

          {!web3.address &&
            <Box mt={2} ml={2}>
              <Typography variant='subtitle1'>No wallet connected</Typography>
            </Box>
          }
          
          {!loading && !error && data.players.map(player => {
            return <PlayerContest contest={player.tournament} tokens={player.tokensBalances} />
          })}

        </Grid >
      </motion.div>
    </Scrollbars>
  )
}

export default MyContests

const useStyles = makeStyles({
  mainContainer: {
    width: '900px',
    margin: 'auto',
    marginTop: '150px',
    marginBottom: '50px',
    padding: '0 10px',
  },
  ContestFilter: {

  }
});