import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, Button, Link, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import { motion } from 'framer-motion'
import { useLottie } from "lottie-react"
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link as RouterLink } from "react-router-dom"
import blockchainAnimation from '../assets/animations/blockchain.json'
import claim_ss from '../assets/images/claim.png'
import DiscordIcon from '../assets/images/discord.svg'
import logo from '../assets/images/logo.png'
import swap_ss from '../assets/images/swap.png'
import upcoming_ss from '../assets/images/upcoming2.png'
import { fadeVariant } from '../helpers/variants'

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
          <Box className={classes.divider} />
          {Guide()}
          <Box className={classes.divider} />
          {ApeToken()}

          <Box className={classes.buttonsContainer}>
            <Box mb={1}>
              <RouterLink to='/contests'>
                <CustomButton variant='contained' color='primary'>View contests</CustomButton>
              </RouterLink>
            </Box>

            <Link href='https://docs.apeseasons.com/' target={'_blank'}>
              <CustomButton variant='contained' color='primary' onClick={() => { }}>
                <Typography style={{ fontSize: '21px' }}>
                  Read docs
                </Typography>
              </CustomButton>
            </Link>
          </Box>

        </Box >
      </motion.div>
    </Scrollbars >
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
    <Box sx={{ background: 'radial-gradient(ellipse at bottom, #30001f 0%, #131142 100%)' }}>
      <Box className={classes.slideContainer} style={{ marginTop: 'calc(10vh - 50px)' }}>
        <Box className={classes.slideTextContainer}>
          <Typography variant='h2'>
            Decentralized <Typography variant='h2'>investment contests on</Typography> Polygon
          </Typography>
        </Box>
        <Box ml={5} width='40%'>
          <LottieAnim />
        </Box>
      </Box>
    </Box>
  )
}

function Guide() {
  const classes = useStyles()

  const renderStep = (step, headline1, text1, headline2, text2, image, reverse) => {
    return <Box width='100%' display='flex' justifyContent='space-between' mt={13}>

      {reverse && <img src={image} alt='' className={classes.imageContainer} />}

      <Box width='500px'>

        <Box mb={3}>
          <Typography color='primary' variant='h6'>
            {`Step ${step}`}
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant='h6'>
            {headline1}
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography>
            {text1}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant='h6'>
            {headline2}
          </Typography>
        </Box>

        <Box>
          <Typography>
            {text2}
          </Typography>
        </Box>

      </Box>

      {!reverse && <img src={image} alt='' className={classes.imageContainer} />}

    </Box>
  }

  return (
    <Box sx={{ background: 'radial-gradient(ellipse at top, #30001f 0%, #131142 100%);' }}>
      <Box className={classes.guideContainer}>

        <Box>
          <Typography variant='h3'>How does it work?</Typography>
        </Box>

        <Box width='1128px' maxWidth='95%'>

          {renderStep(
            1,
            'View upcoming contests',
            `For each upcoming contest, you'll be able to see the entry fee, the duration,
            and what tokens can be traded. The entry fee will vary from contest to contest
            so come back later if nothing suits you.`,
            'Join a contest',
            `Use MetaMask to connect a wallet and make sure you have the necessary funds on Polygon.
            Open up the contest you want to join, approve spending, and transfer the entry fee.
            Once confirmed, you'll be able to see the contest under "My contests".
            The entry fee is the money you'll be trading with.`,
            upcoming_ss
          )}

          {renderStep(
            2,
            'Time to invest',
            `Once the contest has begun, you can start investing your money.
            You do this by swapping tokens under the "swap" panel.`,
            'Climb the ranks',
            `Players will be ranked based on the value of their assets.
            Keep track of your position on the leaderboard and invest accordingly.
            Your goal is to have a higher net worth than your opponents.`,
            swap_ss,
            true
          )}

          {renderStep(
            3,
            'Scoring and prizing',
            `When the timer runs out, all positions will be liquidated and the final rankings will be determined.
            The prize pool consists of everyone's net worth minus a protocol fee.
            This means successful traders increase the prize pool and vice versa.
            Prize distribution varies from contest to contest.`,
            'Claim reward',
            `The lucky winners will be able to claim their prize once the contest has been finalized.`,
            claim_ss
          )}

        </Box>
      </Box>
    </Box>
  )
}

function ApeToken() {
  const classes = useStyles()

  return (
    <Box sx={{ background: 'radial-gradient(ellipse at bottom, #30001f 0%, #131142 100%)' }}>
      <Box className={classes.apeContainer}>

        <Box>
          <Typography variant='h3'>The $APE token</Typography>
        </Box>

        <Box mt={3}>
          <Typography variant='h6'>
            To be announced
          </Typography>
        </Box>
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
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px 60px 0px 0px',
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
    height: '78vh',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: 'calc(10vh) auto 200px',
    minHeight: '70vh',
    alignItems: 'center'
  },
  apeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: 'calc(10vh) auto 200px',
    alignItems: 'center'
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
  },
  divider: {
    height: '1px',
    width: '60%',
    margin: 'auto',
    position: 'relative',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '0',
      left: '5%',
      right: '5%',
      width: '90%',
      height: '1px',
      backgroundImage: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7), transparent)'
    }
  },
  imageContainer: {
    borderRadius: '15px',
    opacity: '0.6'
  }
});