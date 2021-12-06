import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';

import { CreateContest } from '../components/admin/createContest'
import { Web3Context } from '../contexts/web3Context'
import { fadeVariant } from '../helpers/variants'
import { ellipseAddress } from '../helpers/utilities'

function AdminPage() {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <motion.div variants={fadeVariant} initial='initial' exit='exit' animate='enter'>

        <Box className={classes.mainContainer}>

          <Box mb={2} display='flex' justifyContent='space-between'>

            <Typography variant='h3'>Administration</Typography>

            {!web3.address
              ? <Button onClick={() => { web3.connectWallet() }}>
                connect wallet
              </Button>
              : <Button onClick={() => { }}>
                {ellipseAddress(web3.address, 4, 4)}
              </Button>}

          </Box>

          <CreateContest />

        </Box>
      </motion.div>
    </Scrollbars>
  )
}

export default AdminPage

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    padding: '50px',
  }
});