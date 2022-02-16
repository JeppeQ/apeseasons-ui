import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import makeStyles from '@mui/styles/makeStyles'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { fadeVariant } from '../helpers/variants'

function DocsPage() {
  const classes = useStyles()
  const [active, setActive] = useState()

  const section = (name) => {
    return <Box sx={{ padding: '12px 17px 4px' }}>
      <Typography color='primary' variant='h6'>
        {name}
      </Typography>
    </Box>
  }

  const navLink = (name) => {
    if (active === name) {
      return <Box sx={{ padding: '12px 16px 7px', border: '1px solid rgba(255, 255, 255, 0.5)', borderRight: 'none', background: '#131142', cursor: 'pointer' }}>
        <Typography fontFamily={'astrospace'} fontSize={'14px'} color={'white'}>
          {name}
        </Typography>
      </Box>
    }

    return <Box sx={{ padding: '13px 17px 8px', '&:hover': { background: '#292840' }, cursor: 'pointer' }} onClick={() => setActive(name)}>
      <Typography fontFamily={'astrospace'} fontSize={'14px'} color={'rgba(255, 255, 255, 0.7)'}>
        {name}
      </Typography>
    </Box>
  }

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>

        <Box className={classes.mainContainer}>

          <Box className={classes.contentContainer}>

            <Box className={classes.navBar}>

              <Box className={classes.logo}>
                <Typography variant='h4'>
                  Ape Seasons
                </Typography>
              </Box>

              <Box className={classes.navigationLinks}>
                {section('product')}
                {navLink('Overview')}
                {navLink('Contests')}
                {navLink('Trading')}
                {navLink('Scoring')}
                {section('Token')}
                {navLink('Tokenomics')}
                {section('Other')}
                {navLink('Team')}
                {navLink('Roadmap')}
                {navLink('FAQ')}
              </Box>

              <Box mt={1}>
                {section('Powered by apes')}
              </Box>

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
  }
});