import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React, { useContext, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { TokenContext } from '../../contexts/tokenContext'
import Logos from '../../helpers/logos'
import { SearchBar } from '../searchBar'
import { styles } from './styles'

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
              {tokenProvider.tokens
                .filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.symbol.toLowerCase().includes(search.toLowerCase()))
                .map(token => {
                  const playerToken = props.playerTokens.find(t => t.tokenAddress.toUpperCase() === token.address.toUpperCase())
                  return <ListItem button onClick={() => { props.select(token, playerToken?.amountRounded || 0); props.close() }} key={token.symbol}>

                    <ListItemAvatar>
                      <Avatar src={Logos[token.symbol]} imgProps={{ style: { objectFit: 'contain' } }} />
                    </ListItemAvatar>

                    <ListItemText primary={token.symbol} secondary={token.name} />

                    <ListItemSecondaryAction>
                      <Typography>{playerToken?.amountRounded || 0}</Typography>
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