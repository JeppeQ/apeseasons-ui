import React, { useState, useEffect } from 'react'
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
import { PlayersTable } from './tables/playersTable'

export function PlayerContest(props) {
  const classes = useStyles()
  const _styles = componentStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(0);
  const [token, setToken] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const swapToken = (token) => {
    setToken(token)
    handleChange(null, 2)
  }

  function ContestDetails() {
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box display='flex' justifyContent='space-between' m={'30px'} mt={2}>
          <Box className={classes.contestDetails}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange}>
                <Tab label="players" value={0} />
                {<Tab label="assets" value={1} />}
                {<Tab label="swap" value={2} />}
                <Tab label="info" value={3} />
              </Tabs>
            </AppBar>

            <Box role="tabpanel" hidden={value !== 0} id='assetsTab' className={_styles.tabContent}>
              {value === 0 && (
                <Box p={3} className={_styles.tabContent}>
                  <PlayersTable tournament={props.contest.id} status={props.contest.status} history={props.contest.status !== 'upcoming'} />
                </Box>
              )}
            </Box>

            <Box role="tabpanel" hidden={value !== 1} id='assetsTab' className={_styles.tabContent}>
              {value === 1 && (
                <Box p={3} className={_styles.tabContent}>
                  <AssetsTable swap={swapToken} />
                </Box>
              )}
            </Box>

            <Box role="tabpanel" hidden={value !== 2} id='swapTab' className={_styles.tabContent}>
              {value === 2 && (
                <Box className={_styles.tabContent}>
                  <SwapTokens playerTokens={props.playerTokens} token={token} />
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

        {props.contest.id && <Box className={classes.section} width={'20%'}>
          <Typography variant='subtitle1'>name</Typography>
          <Typography variant='h5'>{props.contest.id}</Typography>
        </Box>}

        {props.contest.netWorth && <Box className={classes.section} width={'15%'}>
          <Typography variant='subtitle1'>Net Worth</Typography>
          <Typography variant='h5'>{props.contest.netWorth}</Typography>
        </Box>}

        {props.contest.startTime && <Box className={classes.section} width={'15%'}>
          <Typography variant='subtitle1'>starts in</Typography>
          <Typography variant='h5'>{props.contest.startTime}</Typography>
        </Box>}

        {props.contest.position && <Box className={classes.section} width={'15%'}>
          <Typography variant='subtitle1'>Position</Typography>
          <Typography variant='h5'>{props.contest.position}/{props.contest.players}</Typography>
        </Box>}

        {!props.contest.position && <Box className={classes.section} width={'15%'}>
          <Typography variant='subtitle1'>Players</Typography>
          <Typography variant='h5'>{props.contest.playerCount}</Typography>
        </Box>}

        {props.contest.endTime && <Box className={classes.section} width={'15%'}>
          <Typography variant='subtitle1'>ends in</Typography>
          <Typography variant='h5'>{props.contest.endTime}</Typography>
        </Box>}

        {props.contest.duration && <Box className={classes.section} width={'15%'}>
          <Typography variant='subtitle1'>Duration</Typography>
          <Typography variant='h5'>{props.contest.duration}</Typography>
        </Box>}

        {props.contest.prize && <Box className={classes.section} width={'5%'}>
          <Typography variant='subtitle1'>Prize</Typography>
          <Typography variant='h5'>{props.contest.prize}</Typography>
        </Box>}

        {props.contest.prizeStatus && <Box className={classes.section} textAlign='center' width={'10%'}>
          {props.contest.prizeStatus === 'claimed' && <Typography variant='subtitle2'>Prize Claimed</Typography>}
          {props.contest.prizeStatus === 'unclaimed' && <Button variant='contained' color='secondary' fullWidth>CLAIM</Button>}
          {props.contest.prizeStatus === 'none' && <Typography variant='subtitle2'>No Prize</Typography>}
        </Box>}

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
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '15px'
  },
  contestOverview: {
    width: '100%',
    display: 'flex',
    padding: '30px',
    justifyContent: 'space-between'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    margin: 'auto 0'
  },
  contestDetails: {
    height: '500px',
    width: '100%',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
  },
});