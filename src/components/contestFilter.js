import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'

import { componentStyles } from './styles'
import { Typography } from '@material-ui/core'

const filters = ['ongoing', 'upcoming', 'completed']

export function ContestFilter(props) {
  const classes = useStyles()
  const _styles = componentStyles()

  return (
    <Box className={clsx(classes.container)}>
      {filters.map(filter => {
        if (filter === props.filter) {
          return <Box component={'button'} className={clsx(_styles.customBox, classes.filterButton)}>
            <Typography variant='subtitle1' style={{ color: '#fff' }}>{filter}</Typography>
          </Box>
        } else {
          return <Box component={'button'} className={clsx(_styles.customBox, classes.filterButton)} style={{ opacity: 0.6 }} onClick={() => props.change(filter)}>
            <Typography variant='subtitle1'>{filter}</Typography>
          </Box>
        }
      })}
    </Box>
  )
}



const useStyles = makeStyles({
  container: {
    padding: '16px 0 14px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  filterButton: {
    padding: '14px 20px 11px',
    marginRight: '10px',
    borderRadius: '4px',
    position: 'relative',
    opacity: 1
  },
  activeGlow: {
    position: 'absolute',
    left: '25%',
    top: '50%',
    width: '50%',
    height: '0px',
    borderRadius: '50%',
    boxShadow: '0px 0px 50px 20px rgba(200, 200, 200, 0.2)',
  },
});