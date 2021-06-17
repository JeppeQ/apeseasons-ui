import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { PlayerContest } from '../components/playerContest'
import { ContestFilter } from '../components/contestFilter'
import { fadeVariant } from '../helpers/variants'

const competitions = [
  { name: 'huiji', players: 150, entry: '10' }
]

function Contests() {
  const classes = useStyles()
  const [filter, setFilter] = useState('ongoing')

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
        <Grid container direction='column' alignItems='flex-start' justify='center' className={classes.mainContainer}>
          <ContestFilter filter={filter} change={setFilter} />
          {competitions.map(competition => {
            return <PlayerContest />
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
    marginTop: '150px',
    marginBottom: '50px',
    padding: '0 10px',
  },
  ContestFilter: {

  }
});