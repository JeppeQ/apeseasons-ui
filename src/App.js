import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import Header from './components/header'
import { mainTheme } from './helpers/themes'
import { routes } from './helpers/routes'
import { Web3Provider } from './contexts/web3Context'
import { TokenProvider } from './contexts/tokenContext'

function App() {
  return (
    <Router>
      <Box className='background'>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <TokenProvider>
            <Web3Provider>
              <Box className='main'>
                <AnimatePresence exitBeforeEnter>
                  <Header />
                  <Route render={({ location }) => (
                    <Switch location={location} key={location.pathname}>
                      {routes.map((route, index) => {
                        return <Route key={index} path={route.path} component={route.content} />
                      })}
                    </Switch>
                  )} />
                </AnimatePresence>
              </Box>
            </Web3Provider>
          </TokenProvider>
        </ThemeProvider>
      </Box>
    </Router>
  )
}

export default App
