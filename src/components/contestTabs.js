import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { SwapTokens } from './contest/swapTokens';
import { AssetsTable } from './tables/assetsTable';
import { PlayersTable } from './tables/playersTable';
import { TokenTable } from './tables/tokenTable';

export default function ContestTabs(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);
  const [token, setToken] = useState(null)

  const swapToken = (token) => {
    setToken(token)
    setValue(3)
  }

  return (
    <Box className={classes.tabContainer} width={props.sideBar ? '75%' : '100%'}>

      <AppBar position="static">
        <Tabs value={value} onChange={(e, value) => setValue(value)} textColor='secondary'>
          {props.playerTab && <Tab label="players" value={0} />}
          {props.assetsTab && <Tab label="assets" value={2} />}
          {props.swapTab && <Tab label="swap" value={3} />}
          {props.infoTab && <Tab label="info" value={4} />}
          {props.tokenTab && <Tab label="Market" value={1} />}
        </Tabs>
      </AppBar>

      <Scrollbars autoHeight={true} autoHeightMax={400}>
        <Box p={2} className={classes.tabContent}>

          {value === 0 && <PlayersTable tournament={props.data.id} history />}
          
          {value === 1 && <TokenTable />}

          {value === 2 && <AssetsTable swap={swapToken} tokens={props.playerTokens} swapAvailable={props.swapTab} />}

          {value === 3 && <SwapTokens id={props.data.id} playerTokens={props.playerTokens} token={token} />}

        </Box>
      </Scrollbars>

    </Box >
  )
}

const useStyles = makeStyles({
  tabContainer: {
    height: '500px',
    backgroundColor: '#231E2F',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden'
  },
  tabContent: {
    width: '100%',
    height: '100%',
  }
});