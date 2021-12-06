import React, { useContext } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import DisconnectIcon from '@mui/icons-material/ExitToApp';

import { Typography } from '@mui/material'
import { Web3Context } from '../contexts/web3Context';

export function Settings(props) {

  const web3 = useContext(Web3Context)

  const disconnect = () => {
    web3.disconnectWallet()
    props.close()
  }

  return (
    <React.Fragment>
      <Menu
        anchorEl={props.anchor}
        keepMounted
        open={props.open}
        onClose={props.close}
        PaperProps={{ style: { marginTop: props.marginTop || '30px' } }}
      >

        <MenuItem onClick={disconnect}>
          <ListItemIcon>
            <DisconnectIcon />
          </ListItemIcon>
          <Typography variant='subtitle1'>disconnect</Typography>
        </MenuItem>

      </Menu>

    </React.Fragment>
  )
}