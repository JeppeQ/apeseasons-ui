import React from 'react'
import Lottie, { useLottie } from "lottie-react"
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import DiscordIcon from '../assets/images/discord.svg'
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

import { fadeVariant } from '../helpers/variants'
import blockchainAnimation from '../assets/animations/blockchain.json'
import monkeyAnimation from '../assets/animations/monkey.json'
import logo from '../assets/images/logo.png'

function LandingPage() {
  const classes = useStyles()

  return (
    <Scrollbars renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, opacity: '0' }} />}>
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
        <Box className={classes.mainContainer}>

          <Box className={classes.header}>
            <Box display='flex'>
              <motion.div className={classes.logoContainer} variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
                <img src={logo} width={'100%'} alt='logo' />
              </motion.div>
              <Box>
                <Typography variant='h3'>APE SEASONS</Typography>
                <Box paddingLeft='3px'>
                  <Typography variant='h6' style={{ fontSize: '14px' }}>Unleash the monkey and reap the rewards</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <TwitterIcon style={{ marginRight: '20px' }} />
              <img src={DiscordIcon} alt='' />
            </Box>
          </Box>

          {SlideOne()}
          {SlideTwo()}
          {SlideThree()}

          <Box className={classes.buttonsContainer}>
            <Box mb={1}>
              <Link to='/contests'>
                <CustomButton variant='contained' color='primary'>View contests</CustomButton>
              </Link>
            </Box>
            <CustomButton variant='contained' color='primary'>
              <Typography style={{ fontSize: '21px' }}>Read docs</Typography>
            </CustomButton>
          </Box>

        </Box >
      </motion.div></Scrollbars >
  )
}

export default LandingPage

function SlideOne() {
  const classes = useStyles()

  const LottieAnim = () => {
    const options = {
      animationData: blockchainAnimation,
      loop: true,
      autoplay: true,
      initialSegment: [105, 450]
    };

    const { View } = useLottie(options);
    return View;
  }

  return (
    <Box className={classes.slideContainer} style={{ marginTop: 'calc(10vh + 50px)' }}>
      <Box className={classes.slideTextContainer}>
        <Typography variant='h2'>
          Decentralized <Typography variant='h2'>investment contests on</Typography> Polygon
        </Typography>
      </Box>
      <Box ml={5} width='40%'>
        <LottieAnim />
      </Box>
    </Box>
  )
}

function SlideTwo() {
  const classes = useStyles()

  function tourney(name, players, starts, buy) {
    function secText(title, value) {
      return <Box className={classes.section}>
        <Typography variant='subtitle1'>{title}</Typography>
        <Typography variant='h5'>{value}</Typography>
      </Box>
    }

    return <Box className={classes.tourneyExample}>
      {secText('name', name)}
      {secText('players', players)}
      {secText('starts in', starts)}
      {secText('buy in', buy)}
    </Box>
  }

  return (
    <Box className={classes.slideContainer} style={{ width: '80%' }}>
      <Box pb={5} width='40%'>
        {tourney('tourney#1', '30', '2H', '100 DAI')}
        {tourney('tourney#2', '20', '5H', '100 DAI')}
        {tourney('tourney#3', '10', '8H', '100 DAI')}
      </Box >
      <Box className={classes.slideTextContainer} style={{ width: '40%' }}>
        <Typography className={classes.slideTwoText}>- the buy-in of the contests is your starting money (e.g. 100 DAI)</Typography>
        <Typography className={classes.slideTwoText}>- Swap tokens to increase your net worth</Typography>
        <Typography className={classes.slideTwoText}>- prize pool consists of everyone's net worth</Typography>
        <Typography className={classes.slideTwoText}>- Race to the top and claim your reward</Typography>
      </Box>
    </Box>
  )
}

function SlideThree() {
  const classes = useStyles()

  return (
    <Box className={classes.slideContainer} style={{ width: '80%' }}>
      <Box className={classes.slideTextContainer} style={{ width: '40%' }}>
        <Typography className={classes.slideTwoText}>- Contests are sponsored by the $APE token</Typography>
        <Typography className={classes.slideTwoText}>- Players are rewarded with $APE tokens upon joining a contest</Typography>
      </Box>
      <Box pb={10} ml={4}>
        <Lottie animationData={monkeyAnimation} loop={true} style={{ width: '75%' }} />
      </Box>
    </Box>
  )
}

const CustomButton = withStyles(() => ({
  root: {
    padding: '8px 24px',
    width: '380px',
    letterSpacing: '3px',
    borderRadius: '0',
    fontSize: '26px',
    justifyContent: 'flex-start',
    background: 'linear-gradient(to left, rgba(69, 59, 93,0.4), rgba(69, 59, 93,1) 80%)',
    textTransform: 'none',
    fontWeight: '400',
  },
  label: {
    opacity: '0.9'
  }
}))(Button)

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10vh'
  },
  header: {
    position: 'fixed',
    top: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px 60px 0px 0px'
  },
  buttonsContainer: {
    position: 'fixed',
    bottom: '10%',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  slideContainer: {
    display: 'flex',
    width: '80%',
    height: '70vh',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '50px'
  },
  slideImageContainer: {
    width: '40%',
    marginLeft: '40px'
  },
  slideTwoText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'astrospace',
    letterSpacing: '1px',
    lineHeight: '2.5'
  },
  tourneyExample: {
    width: '85%',
    height: '70px',
    boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgba(70, 45, 130, 0.5)',
    marginBottom: '20px',
    opacity: 0.6,
    display: 'flex',
    padding: '20px',
    justifyContent: 'space-between'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    height: '90px',
    width: '90px',
    cursor: 'pointer',
    margin: '-16px 24px 0',
  }
});