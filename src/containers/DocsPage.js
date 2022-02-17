import Box from '@mui/material/Box'
import makeStyles from '@mui/styles/makeStyles'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Actions from '../components/docs/Actions'
import Contests from '../components/docs/Contests'
import FAQ from '../components/docs/FAQ'
import NavBar from '../components/docs/NavBar'
import Overview from '../components/docs/Overview'
import Roadmap from '../components/docs/Roadmap'
import Scoring from '../components/docs/Scoring'
import Team from '../components/docs/Team'
import Tokenomics from '../components/docs/Tokenomics'
import Trading from '../components/docs/Trading'
import { fadeVariant } from '../helpers/variants'

const pages = [
  {
    name: 'Overview',
    category: 'Product',
    content: <Overview />
  },
  {
    name: 'Contests',
    category: 'Product',
    content: <Contests />
  },
  {
    name: 'Trading',
    category: 'Product',
    content: <Trading />
  },
  {
    name: 'Scoring & Rewards',
    category: 'Product',
    content: <Scoring />
  },
  {
    name: 'Tokenomics',
    category: 'Token',
    content: <Tokenomics />
  },
  {
    name: 'Team',
    category: 'Other',
    content: <Team />
  },
  {
    name: 'Roadmap',
    category: 'Other',
    content: <Roadmap />
  },
  {
    name: 'FAQ',
    category: 'Other',
    content: <FAQ />
  },
]

function DocsPage() {
  const classes = useStyles()
  const [active, setActive] = useState('Overview')

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>

        <Box className={classes.mainContainer}>

          <Box className={classes.contentContainer}>

            <NavBar active={active} setActive={setActive} />

            <Box className={classes.content}>

              {pages.find(p => p.name === active)?.content}

              <Actions pages={pages} active={active} setActive={setActive} />

            </Box>

          </Box>

        </Box>

      </motion.div>
    </Scrollbars>
  )
}

export default DocsPage

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '1050px',
    height: '1000px',
    display: 'flex'
  },
  navBar: {
    width: '240px',
    borderRight: '1px solid rgba(255, 255, 255, 0.5)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)'
  },
  navigationLinks: {
    paddingTop: '8px'
  },
  content: {
    width: '1050px',
    margin: '24px 80px',
    paddingLeft: '240px'
  }
});