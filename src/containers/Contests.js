import React, { useContext } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { PlayerContext } from '../contexts/player'
import { TournamentContext } from '../contexts/tournament'

function Contests() {
  const classes = useStyles()
  const player = useContext(PlayerContext)
  const tournament = useContext(TournamentContext)

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Grid container direction='column' alignItems='center' justify='center' className={classes.mainContainer}>
      </Grid >
    </Scrollbars>
  )
}

export default Contests

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
    marginBottom: '50px',
    padding: '0 10px',
  }
}); 