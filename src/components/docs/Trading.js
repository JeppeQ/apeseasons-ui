import { Avatar, Divider, Link, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { TokenContext } from '../../contexts/tokenContext'
import React, { useContext } from 'react'
import Logos from '../../helpers/logos'
import Scrollbars from 'react-custom-scrollbars';

function Trading() {
  const tokenProvider = useContext(TokenContext)

  return (
    <Box sx={classes.container}>

      <Box>
        <Typography variant='h3'>
          trading
        </Typography>
      </Box>

      <Box sx={classes.divider} />

      <Box>
        <Typography color='primary' variant='h6'>
          How does trading work?
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          Under the hood, trades are executed on <Link
            sx={{ cursor: 'pointer', color: '#058665' }}
            href='https://polygon.sushi.com/en/swap'
            target='_blank'>
            SushiSwap
          </Link>.
        </Typography>
        <Typography>
          To ensure low slippage and to avoid potential price manipulation, tokens must have a certain volume.
          Below you'll see the full list of tokens available on Ape Seasons. We'll continue to update this list as the market develops.
        </Typography>

        <Typography>
          Some type of contests may have a limited pool of tokens. More information can be found under each contest.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography color='primary' variant='h6'>
          Full List of tokens
        </Typography>
      </Box>

      <Box mt={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.5)', overflow: 'hidden' }}>
        <Scrollbars
          autoHeight={true}
          autoHeightMax={500}
          renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgb(94, 83, 120)', borderRadius: '5px', opacity: '0.9' }} />}
        >
          
          <List sx={{ pr: 4 }}>
            {React.Children.toArray(
              tokenProvider.tokens.map((token, i) => {
                return <React.Fragment>
                  <ListItem>

                    <ListItemAvatar>
                      <Avatar src={Logos[token.symbol]} imgProps={{ style: { objectFit: 'contain' } }} />
                    </ListItemAvatar>

                    <ListItemText primary={token.name} secondary={token.symbol} />

                    <ListItemSecondaryAction>
                      <Typography color='primary'>{token.address}</Typography>
                    </ListItemSecondaryAction>

                  </ListItem>
                  {i < tokenProvider.tokens.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              })
            )}
          </List>
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default Trading

const classes = {
  container: {
  },
  divider: {
    mt: 2,
    mb: 4,
    height: '1px',
    width: '100%',
    position: 'relative',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '0',
      left: '0',
      right: '5%',
      width: '100%',
      height: '1px',
      backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.7), transparent)'
    }
  },
};