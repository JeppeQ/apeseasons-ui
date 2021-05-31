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

export function Contest(props) {
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
                <Tab label="players" />
                <Tab label="prizing" />
                <Tab label="rules" />
              </Tabs>
            </AppBar>
            <div role="tabpanel" hidden={value !== index} id='playersTab'>
              {value === index && (
                <Box p={3}>
                  <Typography>Tab one</Typography>
                </Box>
              )}
            </div>
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
            <Button variant='contained' color='primary'>ENTER</Button>
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
          <Typography variant='h5'>ApeSeason #1</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>Buy in</Typography>
          <Typography variant='h5'>100 DAI</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>Players</Typography>
          <Typography variant='h5'>52 / 100</Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant='subtitle1'>starts in</Typography>
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
  },
});