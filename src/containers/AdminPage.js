import React, { useContext } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import LuxonUtils from '@date-io/luxon'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { CreateContest } from '../components/admin/createContest'
import { Web3Context } from '../contexts/web3'
import { fadeVariant } from '../helpers/variants'
import { ellipseAddress } from '../helpers/utilities'

const competitions = [
  { name: 'huiji', players: 150, entry: '10' }
]

function AdminPage() {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
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
    </MuiPickersUtilsProvider>
  )
}

export default AdminPage

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    padding: '50px',
  }
});