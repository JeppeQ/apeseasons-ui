import React from 'react'
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { fadeVariant } from '../helpers/variants'

function LandingPage() {
  const classes = useStyles()

  return (
    <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
      <Box className={classes.mainContainer} mt={14} ml={4}>
        <Typography variant='h2'>APE SEASONS</Typography>
        <Box paddingLeft='3px'>
          <Typography variant='h6'>Unleash the monkey and reap the rewards</Typography>
        </Box>
        <Box className={classes.buttonsContainer}>
          <Box mb={1}>
            <Link to='/contests'>
              <CustomButton variant='contained' color='primary'>Launch app</CustomButton>
            </Link>
          </Box>
          <CustomButton variant='contained' color='primary'>
            <Typography style={{ fontSize: '21px' }}>Read more</Typography>
          </CustomButton>
        </Box>
      </Box >
    </motion.div>
  )
}

export default LandingPage

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
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsContainer: {
    position: 'fixed',
    bottom: '20%',
    right: '0',
    display: 'flex',
    flexDirection: 'column'
  },
});