import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fadeVariant } from '../helpers/variants'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { componentStyles } from './styles'
import SideBar from './contest/sideBar'
import ContestTabs from './contestTabs'
import ContestOverview from './contestOverview'

export function Contest(props) {
  const classes = useStyles()
  const _styles = componentStyles()
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
      <Box className={clsx(classes.container, _styles.customBox)}>
        <Box className={classes.contestOverview} onClick={() => setOpen(!open)}>

          {<ContestOverview {...props} />}

          <Box className={classes.section} justifyContent={'center'}>
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUpIcon fontSize='large' style={{ color: 'white' }} /> : <KeyboardArrowDownIcon fontSize='large' style={{ color: 'white' }} />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className={classes.contestDetails}>

            <ContestTabs {...props} />

            {props.sideBar && <SideBar tournament={props.data} signup={props.signup} />}

          </Box>
        </Collapse>
      </Box>
    </motion.div>
  )
}

const useStyles = makeStyles({
  container: {
    width: '900px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  contestOverview: {
    width: '100%',
    display: 'flex',
    padding: '20px',
  },
  contestDetails: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '20px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});