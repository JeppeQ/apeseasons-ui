import React, { useState } from 'react'
import clsx from 'clsx'
import { Scrollbars } from 'react-custom-scrollbars'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import { makeStyles } from '@material-ui/core/styles'

import { styles } from './styles'
import { SearchBar } from '../searchBar'

const tokens = [
  { name: 'Alpha Finance', symbol: 'ALPHA', icon: <WorkIcon />, balance: '0.25' },
  { name: 'Ethereum', symbol: 'ETH', icon: <ImageIcon />, balance: '0.5' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: <BeachAccessIcon />, balance: '5.25' },
]

export function SelectTokenDialog(props) {
  const _classes = styles()
  const classes = useStyles()

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={clsx(_classes.dialog, classes.dialog)} style={{ width: '400px' }}>
        <DialogTitle>
          <Box ml={2} mb={-3}>
            <Typography className={_classes.title}>Select a token</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <SearchBar />
            </ListItem>
            <Scrollbars autoHeight={true} autoHeightMax={400}>
              {tokens.map(token => {
                return <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      {token.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={token.symbol} secondary={token.name} />
                  <ListItemSecondaryAction>
                    <Typography>0.252</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              })}
            </Scrollbars>
          </List>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

const useStyles = makeStyles({
  dialog: {
  },
})