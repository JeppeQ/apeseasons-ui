import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

import Header from './components/header'
import { mainTheme } from './helpers/themes'
import { routes } from './helpers/routes'
import { Web3Provider } from './contexts/web3Context'
import { TokenProvider } from './contexts/tokenContext'

function App() {
  return (
    <Router>
      <Box className='background'>
        <StyledEngineProvider injectFirst>
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
        </StyledEngineProvider>
      </Box>
    </Router>
  );
}

export default App
