import React from 'react'
import Lottie from "lottie-react"
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TwitterIcon from '@material-ui/icons/Twitter'
import TelegramIcon from '@material-ui/icons/Telegram'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import { fadeVariant } from '../helpers/variants'
import animation from '../assets/animations/blockchain1.json'

function LandingPage() {
  const classes = useStyles()

  return (
    <Scrollbars renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, opacity: '0' }} />}>
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
        <Box className={classes.mainContainer}>

          <Box className={classes.header}>
            <Box>
              <Typography variant='h3'>APE SEASONS</Typography>
              <Box paddingLeft='3px'>
                <Typography variant='h6' style={{ fontSize: '14px' }}>Unleash the monkey and reap the rewards</Typography>
              </Box>
            </Box>
            <Box>
              <TwitterIcon style={{ marginRight: '20px' }} />
              <TelegramIcon />
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

  return (
    <Box className={classes.slideContainer}>
      <Box className={classes.slideTextContainer}>
        <Typography variant='h2'>
          Decentralized <Typography variant='h2'>investment contests on</Typography> Polygon
        </Typography>
      </Box>
      <Box className={classes.slideImageContainer}>
        <Lottie animationData={animation} initialSegment={[50, 450]} loop={false} />
      </Box>
    </Box>
  )
}

function SlideTwo() {
  const classes = useStyles()

  return (
    <Box className={classes.slideContainer} style={{ width: '80%' }}>
      <Box className={classes.slideImageContainer}>
        <Lottie animationData={animation} initialSegment={[50, 450]} loop={false} />
      </Box>
      <Box className={classes.slideTextContainer} style={{ width: '40%' }}>
        <Typography className={classes.slideTwoText}>- the buy-in of the contests is your starting money (e.g. 100 DAI)</Typography>
        <Typography className={classes.slideTwoText}>- Swap tokens to increase your net worth</Typography>
        <Typography className={classes.slideTwoText}>- prize pool consists of everyone's net worth</Typography>
        <Typography className={classes.slideTwoText}>- At the end, players with the highest net worth shares the prize pool</Typography>
      </Box>
    </Box>
  )
}

function SlideThree() {
  const classes = useStyles()

  return (
    <Box className={classes.slideContainer} style={{ width: '80%' }}>
      <Box className={classes.slideTextContainer} style={{ width: '40%' }}>
        <Typography className={classes.slideTwoText}>- Contests are powered by the $APE token</Typography>
        <Typography className={classes.slideTwoText}>- Early contestants are rewarded with $APE tokens upon entry</Typography>
        <Typography className={classes.slideTwoText}>- 5% of the prize pools goes to $APE stakers</Typography>
      </Box>
      <Box className={classes.slideImageContainer}>
        <Lottie animationData={animation} initialSegment={[50, 450]} loop={false} />
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
    marginBottom: '25vh',
    marginTop: '-50px'
  },
  header: {
    position: 'fixed',
    top: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px 60px 0px 130px'
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
    height: '80vh',
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
  }
});