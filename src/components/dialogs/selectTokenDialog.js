import React, { useState, useContext } from 'react'
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
import { makeStyles } from '@material-ui/core/styles'

import { styles } from './styles'
import { SearchBar } from '../searchBar'
import { TokenContext } from '../../contexts/tokenContext'
import Logos from '../../helpers/logos'


/* global BigInt */
export function SelectTokenDialog(props) {
  const _classes = styles()
  const classes = useStyles()
  const tokenProvider = useContext(TokenContext)
  const [search, setSearch] = useState('')

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={clsx(_classes.dialog, classes.dialog)}>
        <DialogTitle>
          <Box ml={2} mb={-3}>
            <Typography className={_classes.title}>Select a token</Typography>
          </Box>
        </DialogTitle>
        <Box mx={5} mt={3} mb={1}>
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
        <Scrollbars autoHeight={true} autoHeightMax={400}>
          <DialogContent style={{ paddingTop: '0px' }}>
            <List>
              {tokenProvider.tokens.
                filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.symbol.toLowerCase().includes(search.toLowerCase()))
                .map(token => {
                  const playerToken = props.playerTokens.find(t => t.tokenAddress.toUpperCase() === token.address.toUpperCase())
                  return <ListItem button onClick={() => { props.select(token); props.close() }}>
                    <ListItemAvatar>
                      <Avatar src={Logos[token.symbol]} imgProps={{ style: { objectFit: 'contain' } }} />
                    </ListItemAvatar>
                    <ListItemText primary={token.symbol} secondary={token.name} />
                    <ListItemSecondaryAction>
                      <Typography>{playerToken ? playerToken.amountFloat : 0}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                })}
            </List>
          </DialogContent>
        </Scrollbars>
      </Box>
    </Dialog>
  )
}

const useStyles = makeStyles({
  dialog: {
    width: '400px',
    minHeight: '531px'
  },
})