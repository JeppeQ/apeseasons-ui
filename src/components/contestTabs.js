import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { utils } from 'ethers'
import { DateTime } from 'luxon'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Collapse from '@material-ui/core/Collapse'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { componentStyles } from './styles'
import { PlayersTable } from './tables/playersTable'
import { TokenTable } from './tables/tokenTable'
import { AssetsTable } from './tables/assetsTable'
import { SwapTokens } from './contest/swapTokens'

export default function ContestTabs(props) {
  const classes = useStyles()
  const _styles = componentStyles()
  const [value, setValue] = React.useState(0);
  const [token, setToken] = useState(null)

  const swapToken = (token) => {
    setToken(token)
    setValue(3)
  }

  return (
    <Box className={classes.tabContainer} width={props.sideBar ? '75%' : '100%'}>

      <AppBar position="static">
        <Tabs value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary">
          {props.playerTab && <Tab label="players" value={0} />}
          {props.tokenTab && <Tab label="tokens" value={1} />}
          {props.assetsTab && <Tab label="assets" value={2} />}
          {props.swapTab && <Tab label="swap" value={3} />}
          {props.infoTab && <Tab label="info" value={4} />}
        </Tabs>
      </AppBar>

      <Box role="tabpanel" hidden={value !== 0} id='playersTab' className={_styles.tabContent}>
        {value === 0 && (
          <Box p={3} className={_styles.tabContent}>
            <PlayersTable tournament={props.data.id} />
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 1} id='tokenTab' className={_styles.tabContent}>
        {value === 1 && (
          <Box p={3} className={_styles.tabContent}>
            <TokenTable />
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 2} id='assetsTab' className={_styles.tabContent}>
        {value === 2 && (
          <Box p={3} className={_styles.tabContent}>
            <AssetsTable swap={swapToken} tokens={props.playerTokens} swapAllowed={props.swapTab} />
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 3} id='swapTab' className={_styles.tabContent}>
        {value === 3 && (
          <Box className={_styles.tabContent}>
            <SwapTokens id={props.data.id} playerTokens={props.playerTokens} token={token} />
          </Box>
        )}
      </Box>

    </Box>
  )
}

const useStyles = makeStyles({
  tabContainer: {
    height: '500px',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
  },
});