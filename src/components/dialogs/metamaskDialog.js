import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'
import { styles } from './styles'

export function MetaMaskDialog(props) {
  const _classes = styles()

  return (
    <Dialog open={props.open} onClose={() => window.location.reload()} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '500px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>MetaMask required</Typography>
        </DialogTitle>
        <DialogContent>

          <Box mb={1}>
            <Typography variant='body1'>
              In order to play, you must have MetaMask installed together with a wallet. MetaMask is a browser extension
              that helps you connect your cryptocurrency wallet to blockchain apps. <br />It only takes a few minutes to set up.
            </Typography>
          </Box>

          <Box my={1}>
            <Link target="_blank" href='https://metamask.io/download.html' style={{ color: '#058665' }}>
              Click here to download MetaMask and create a wallet.
            </Link>
          </Box>

          <DialogActions style={{ paddingRight: '0' }}>
            <Button onClick={() => window.location.reload()} variant='contained'>
              continue
            </Button>
          </DialogActions>

        </DialogContent>
      </Box>
    </Dialog>
  )
}