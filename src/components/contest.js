import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import componentStyles from './styles'

export function Contest(props) {
  const classes = useStyles()
  const _styles = componentStyles()

  return (
    <Box className={clsx(classes.container, _styles.customBox)}>

    </Box>
  )
}

const useStyles = makeStyles({
  container: {
    width: '1050px',
    height: '250px'
  },
});