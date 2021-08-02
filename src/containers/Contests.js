import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Contest } from '../components/contest'
import { ContestFilter } from '../components/contestFilter'
import { fadeVariant } from '../helpers/variants'
import { getUpcoming, getRunning } from '../api/tournament'

const filters = ['UPCOMING', 'RUNNING']

function Contests() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('UPCOMING')
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    async function getTournaments() {
      setLoading(true)
      let data = []
      if (filter === 'UPCOMING') {
        data = await getUpcoming()
      } else if (filter === 'RUNNING') {
        data = await getRunning()
      }

      if (data) {
        setTournaments(data)
      }
      setLoading(false)
    }

    getTournaments()
  }, [filter])

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

          <ContestFilter filters={filters} filter={filter} change={changeFilter} />

          {loading && <CircularProgress color='secondary' style={{ margin: 'auto' }} />}

          {!loading && tournaments.length === 0 &&
            <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
              <Box mt={2} ml={2}>
                <Typography variant='subtitle1'>{`No ${filter} contests`}</Typography>
              </Box>
            </motion.div>
          }

          {!loading && filter === 'UPCOMING' && tournaments.map(tournament => {
            return (
              <Contest
                key={tournament.id}
                data={tournament}
                entry
                players
                duration
                startingIn
                sideBar
                signup
                playerTab
                tokenTab
              />
            )
          })}

          {!loading && filter === 'RUNNING' && tournaments.map(tournament => {
            return (
              <Contest
                key={tournament.id}
                data={tournament}
                entry
                players
                duration
                runningFor
                sideBar
                playerTab
                tokenTab
              />
            )
          })}

        </Grid >
      </motion.div>
    </Scrollbars>
  )
}

export default Contests

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