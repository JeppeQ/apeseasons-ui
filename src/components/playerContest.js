import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

import { componentStyles } from './styles'
import { AssetsTable } from './tables/assetsTable'
import { SwapTokens } from './contest/swapTokens'

export function PlayerContest(props) {
  const classes = useStyles()
  const _styles = componentStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  function ContestDetails() {
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box display='flex' justifyContent='space-between' mt={4}>
          <Box className={classes.contestDetails}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange}>
                <Tab label="assets" />
                <Tab label="swap" />
                <Tab label="players" />
                <Tab label="info" />
              </Tabs>
            </AppBar>

            <Box role="tabpanel" hidden={value !== 0} id='assetsTab' className={_styles.tabContent}>
              {value === 0 && (
                <Box p={3} className={_styles.tabContent}>
                  <AssetsTable />
                </Box>
              )}
            </Box>

            <Box role="tabpanel" hidden={value !== 1} id='swapTab' className={_styles.tabContent}>
              {value === 1 && (
                <Box className={_styles.tabContent}>
                  <SwapTokens />
                </Box>
              )}
            </Box>

          </Box>
        </Box>
      </Collapse>
    )
  }

  return (
    <Box className={clsx(classes.container, _styles.customBox)}>
      <Box className={classes.contestOverview} onClick={() => setOpen(!open)}>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>name</Typography>
          <Typography variant='h5'>Season #1</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>Position</Typography>
          <Typography variant='h5'>32/52</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>ends in</Typography>
          <Typography variant='h5'>7 Days</Typography>
        </Box>
        <Box className={classes.section}>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon fontSize='large' style={{ color: 'white' }} /> : <KeyboardArrowDownIcon fontSize='large' style={{ color: 'white' }} />}
          </IconButton>
        </Box>
      </Box>
      {ContestDetails()}
    </Box>
  )
}



const useStyles = makeStyles({
  container: {
    width: '900px',
    padding: '30px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  contestOverview: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 'fit-content',
    justifyContent: 'center'
  },
  contestDetails: {
    height: '500px',
    width: '100%',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
  },
});