import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import { isBrowser } from "react-device-detect"
import ReactGA from 'react-ga'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import Header from './components/header'
import { mainTheme } from './helpers/themes'
import { routes } from './helpers/routes'
import { Web3Provider } from './contexts/web3'
import { PlayerProvider } from './contexts/player'
import { TournamentProvider } from './contexts/tournament'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize("UA-194864148-1")
} else {
  ReactGA.initialize("ga-disabled-UA-194864148-1")
}

function App() {
  return (
    <Router>
      <Box className='background'>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <TournamentProvider>
            <PlayerProvider>
              <Web3Provider>
                <Box className='main'>
                  <Header />
                  <Route render={({ location }) => (
                    <AnimatePresence exitBeforeEnter>
                      <Switch location={location} key={location.pathname}>
                        {routes.map((route, index) => {
                          return <Route key={index} path={route.path} component={route.content} />
                        })}
                      </Switch>
                    </AnimatePresence>
                  )} />
                </Box>
              </Web3Provider>
            </PlayerProvider>
          </TournamentProvider>
        </ThemeProvider>
      </Box>
    </Router>
  )
}

export default App
