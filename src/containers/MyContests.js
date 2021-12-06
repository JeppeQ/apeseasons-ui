import React, { useContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress'

import { Contest } from '../components/contest'
import { ContestFilter } from '../components/contestFilter'
import { fadeVariant } from '../helpers/variants'
import { Web3Context } from '../contexts/web3Context'
import * as playerApi from '../api/player'

const filters = ['ONGOING', 'UPCOMING', 'COMPLETED']

function MyContests() {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('ONGOING')
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    async function getTournaments() {
      setLoading(true)
      let data = []
      if (filter === 'UPCOMING') {
        data = await playerApi.getUpcoming(web3.address)
      } else if (filter === 'ONGOING') {
        data = await playerApi.getRunning(web3.address)
      } else if (filter === 'COMPLETED') {
        data = await playerApi.getCompleted(web3.address)
      }

      if (data) {
        setTournaments(data)
      }
      setLoading(false)
    }

    if (web3.address) {
      getTournaments()
    }
  }, [filter, web3.address])

  const changeFilter = (filter) => {
    setLoading(true)
    setFilter(filter)
  }

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
        <Grid container direction='column' alignItems='flex-start' className={classes.mainContainer}>

          <ContestFilter filter={filter} change={changeFilter} filters={filters} />

          {!web3.address &&
            <Box mt={2} ml={2}>
              <Typography variant='subtitle1'>No wallet connected</Typography>
            </Box>
          }

          {web3.address && loading && <CircularProgress color='secondary' style={{ margin: 'auto' }} />}

          {!loading && web3.address && tournaments.length === 0 &&
            <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
              <Box mt={2} ml={2}>
                <Typography variant='subtitle1'>{`you don't have any ${filter} contests`}</Typography>
              </Box>
            </motion.div>
          }

          {!loading && filter === 'ONGOING' && tournaments.map(tournament => {
            return (
              <Contest
                key={tournament.tournament.id}
                data={tournament.tournament}
                playerData={tournament}
                playerTokens={tournament.holdings}
                endingIn
                netWorth
                position
                prizePool
                playerTab
                assetsTab
                swapTab
                sideBar
              />
            )
          })}

          {!loading && filter === 'UPCOMING' && tournaments.map(tournament => {
            return (
              <Contest
                key={tournament.tournament.id}
                data={tournament.tournament}
                playerData={tournament}
                playerTokens={tournament.holdings}
                startingIn
                entry
                players
                duration
                playerTab
                tokenTab
                assetsTab
                sideBar
              />
            )
          })}

          {!loading && filter === 'COMPLETED' && tournaments.map(tournament => {
            return (
              <Contest
                key={tournament.tournament.id}
                data={tournament.tournament}
                playerData={tournament}
                playerTokens={tournament.holdings}
                gameOver
                netWorth
                position
                prizeWithStatus
                playerTab
                assetsTab
                sideBar
              />
            )
          })}

        </Grid >
      </motion.div>
    </Scrollbars>
  );
}

export default MyContests

const useStyles = makeStyles({
  mainContainer: {
    width: '900px',
    margin: 'auto',
    marginTop: '100px',
    marginBottom: '50px',
    padding: '0 10px',
    minHeight: '500px'
  }
});