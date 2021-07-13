import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import Header from './components/header'
import { mainTheme } from './helpers/themes'
import { routes } from './helpers/routes'
import { Web3Provider } from './contexts/web3'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/id/QmV1xmadwCQsVENoFFKvHF8tgPta2pAHxw8EpMb6NqdpE1',
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <Box className='background'>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <ApolloProvider client={client}>
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
          </ApolloProvider>
        </ThemeProvider>
      </Box>
    </Router>
  )
}

export default App
