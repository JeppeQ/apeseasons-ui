import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { motion } from 'framer-motion'
import clsx from 'clsx'
import ReactGA from 'react-ga'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import EcoIcon from '@material-ui/icons/Eco'
import MenuIcon from '@material-ui/icons/Menu'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import InfoIcon from '@material-ui/icons/Info'
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AnnouncementIcon from '@material-ui/icons/Announcement'

import { ellipseAddress } from '../helpers/utilities'
import { fadeVariant } from '../helpers/variants'
import Menu from './mobile/menu'
import logo from '../assets/images/logo.png'
import metamaskLogo from '../assets/images/metamask-icon.png'
import { TournamentContext } from '../contexts/tournament'

const menuItems = [
  {
    name: 'CONTESTS',
    path: '/contests',
    left: '80px',
    width: '150px',
    activeWidth: '150px',
    icon: <InfoIcon />
  },
  {
    name: 'MY CONTESTS',
    path: '/mycontests',
    left: '230px',
    width: '150px',
    activeWidth: '150px',
    icon: <InfoIcon />
  },
]

function Header() {
  const classes = useStyles()
  const location = useLocation()
  const mobile = useMediaQuery('(max-width: 850px)')
  const [active, setActive] = useState({})
  const [menu, openMenu] = useState(false)
  const tourney = useContext(TournamentContext)

  useEffect(() => {
    setActive(menuItems.find(item => location.pathname === item.path))
    ReactGA.pageview(location.pathname)
    ReactGA.set({ page: location.pathname })
  }, [location])

  if (!active || !active.name) {
    return <React.Fragment />
  }

  if (mobile) {
    return (
      <React.Fragment>
        <Grid container className={classes.header} style={{ height: '60px', padding: '0' }} alignItems='center' justify='space-between'>
          <IconButton onClick={() => openMenu(true)}>
            <MenuIcon fontSize='large' />
          </IconButton>
          <Box style={{ letterSpacing: '3px', fontSize: '14px', fontWeight: 'bold' }}>
            {active.name}
          </Box>
          <Box width={'60px'} />
        </Grid>
        <Menu open={menu} close={() => openMenu(false)} items={menuItems} active={active} />
      </React.Fragment>
    )
  }

  return (
    <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
      <Grid container className={classes.header} justify='space-between' alignItems='center'>
        <Grid item>
          <Grid container>
            <motion.div
              className={classes.activeContent}
              animate={{ left: active.left, width: active.activeWidth }}
              transition={{ duration: 0.2 }}
            >
              <Box className={classes.activeGlow} />
            </motion.div>
            <Link to='/'>
              <Box className={clsx(classes.logo, classes.item)}>
                <img src={logo} className={classes.content} width={'35px'} />
              </Box>
            </Link>
            {menuItems.map(item => {
              return <Link to={item.path} key={item.name} className={classes.item} style={{ width: item.width }}>
                <Box className={classes.content} style={
                  item.name === active.name
                    ? { textShadow: '0 0 1px white' }
                    : { textShadow: 'none', opacity: 0.75 }
                }>
                  {item.name}
                </Box>
              </Link>
            })}
          </Grid>
        </Grid>
        <Grid item>
          {!tourney.address
            ? <Button onClick={() => { tourney.connect() }}>
              connect wallet
            </Button>
            : <Button onClick={() => { }}>
              {ellipseAddress(tourney.address, 4, 4)}
            </Button>}
        </Grid>
      </Grid >
    </motion.div>
  )
}

export default Header

const useStyles = makeStyles({
  header: {
    width: '100%',
    height: '55px',
    background: 'linear-gradient(to left, rgba(70, 45, 130,0.4), rgba(70, 45, 130,1) 70%)',
    paddingRight: '15px',
    position: 'absolute',
    zIndex: '2'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
    width: '180px',
    letterSpacing: '1px',
    fontWeight: '500'
  },
  logo: {
    width: '80px',
    cursor: 'pointer'
  },
  content: {
    textDecoration: 'none',
    color: 'white',
  },
  activeContent: {
    position: 'absolute',
    height: '100%',
  },
  activeGlow: {
    position: 'absolute',
    left: '25%',
    top: '50%',
    width: '50%',
    height: '0px',
    borderRadius: '50%',
    boxShadow: '0px 0px 50px 20px rgba(200, 200, 200, 0.2)',
  },
  connect: {
    height: '38px',
    padding: '0 20px',
    borderRadius: '20px',
    border: '1px solid white',
    color: 'white',
    width: '25px'
  },
  logoContainer: {
    height: '90px',
    width: '90px',
    cursor: 'pointer',
    margin: '24px',
  }
});