import React, { useState, useContext } from 'react'
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
import { PlayersTable } from './tables/playersTable'
import { PrizingTable } from './tables/prizingTable'
import { Web3Context } from '../contexts/web3Context'
import { ellipseAddress } from '../helpers/utilities'


export function Contest(props) {
  const classes = useStyles()
  const _styles = componentStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(0);
  const web3 = useContext(Web3Context)

  const { id, start, end, startBlock, endBlock, playerCount, ticketPrice } = props.data

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  function ContestDetails() {
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box display='flex' justifyContent='space-between' m={'30px'} mt={2}>
          <Box className={classes.contestDetails}>

            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                <Tab label="players" />
                <Tab label="info" />
              </Tabs>
            </AppBar>

            <Box role="tabpanel" hidden={value !== 0} id='playersTab' className={_styles.tabContent}>
              {value === 0 && (
                <Box p={3} className={_styles.tabContent}>
                  <PlayersTable tournament={id} />
                </Box>
              )}
            </Box>

            <Box role="tabpanel" hidden={value !== 1} id='rulesTab' className={_styles.tabContent}>
              {value === 1 && (
                <Box p={3} className={_styles.tabContent}>
                  <Typography>Why do we need rules?</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box className={classes.signupContainer}>
            <Box display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>Duration</Typography>
              <Typography variant='h5'>7 Days</Typography>
            </Box>
            <Box display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>Sign up bonus</Typography>
              <Typography variant='h5'>2 apes</Typography>
            </Box>
            <Button variant='contained' color='secondary' onClick={() => web3.joinContest(id, ticketPrice)}>
              ENTER
            </Button>
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
          <Typography variant='h5'>{ellipseAddress(props.data.id, 4, 4)}</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>Buy in</Typography>
          <Typography variant='h5'>100 DAI</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>Players</Typography>
          <Typography variant='h5'>{props.data.playerCount}</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>starts in</Typography>
          <Typography variant='h5'>{start - new Date().getTime()}</Typography>
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
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '20px'
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
    width: 'fit-content',
    justifyContent: 'center'
  },
  contestDetails: {
    height: '500px',
    width: '75%',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
  },
  signupContainer: {
    height: '500px',
    width: '24%',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});