import React, { useContext } from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DisconnectIcon from '@material-ui/icons/ExitToApp';

import { Typography } from '@material-ui/core'
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