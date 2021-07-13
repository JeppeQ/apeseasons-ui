import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { Contest } from '../components/contest'
import { fadeVariant } from '../helpers/variants'
import * as graphApi from '../api/graph'

function Contests() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    async function getTournaments() {
      setLoading(true)

      const tournaments = await graphApi.getTournaments()
      setCompetitions(tournaments)

      setLoading(false)
    }
    getTournaments()
  }, [])

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
        <Grid container direction='column' alignItems='center' justify='center' className={classes.mainContainer}>
          <Box mb={2}>
            <Typography variant='h3'>Contests</Typography>
          </Box>
          {competitions.map(competition => {
            return <Contest data={competition} key={competition.id} />
          })}
        </Grid >
      </motion.div>
    </Scrollbars>
  )
}

export default Contests

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '150px',
    marginBottom: '50px',
    padding: '0 10px',
  }
});