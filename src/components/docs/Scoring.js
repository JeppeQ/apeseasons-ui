import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

function Scoring() {

  return (
    <Box sx={classes.container}>

      <Box>
        <Typography variant='h3'>
          {`scoring and rewards`}
        </Typography>
      </Box>

      <Box sx={classes.divider} />

      <Box>
        <Typography color='primary' variant='h6'>
          End of contest
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          At the end of each contest, all positions will be liquidated to the entry token and the final scoring will be calculated.
          Note that, while a contest is running, an estimate of your position will be shown. In tight races, this estimate might be incorrect
          and your position can change after the final scoring.
        </Typography>

        <br />

        <Typography>
          For each token:
        </Typography>

        <Typography>
          score = player_holding / total_pool * liquidated_amount
        </Typography>

        <br />

        <Box>
          <Typography color='rgba(255, 255, 255, 0.5)' sx={{ mb: '5px' }}>
            Example of scoring:
          </Typography>

          <Typography color='rgba(255, 255, 255, 0.5)'>
            Player A owns 0.1 ETH and 20 MATIC
          </Typography>

          <Typography color='rgba(255, 255, 255, 0.5)' sx={{ mb: '5px' }}>
            Player B owns 0.3 ETH and 10 MATIC
          </Typography>

          <Typography color='rgba(255, 255, 255, 0.5)'>
            Total pool of 0.4 ETH gets liquidated to 1000 DAI
          </Typography>

          <Typography color='rgba(255, 255, 255, 0.5)' sx={{ mb: '5px' }}>
            Total pool of 30 MATIC gets liquidated to 60 DAI
          </Typography>

          <Typography color='rgba(255, 255, 255, 0.5)'>
            Player A final score: 0.1 ETH / 0.4 ETH * 1000 + 20 MATIC / 30 MATIC * 60 = 290
          </Typography>

          <Typography color='rgba(255, 255, 255, 0.5)'>
            Player B final score: 0.3 ETH / 0.4 ETH * 1000 + 10 MATIC / 30 MATIC * 60 = 770
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography color='primary' variant='h6'>
          Prize pool and distribution
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          The prize pool is the total amount liquidated minus a 10% protocol fee.
          In the above example, the prize pool would be 954 DAI.
          Below you'll get an overview of prize distribution.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography color='secondary' variant='h6' fontSize={'14px'}>
          standard distribution
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          50% of the total pool is used to refund players their entry fee, starting from the winner and continuing down the ranks until the pool is empty.
        </Typography>
        <br />
        <Typography>
          The rest of the prize pool is awarded to the top 20%, distributed proportional to the players' final positions.
        </Typography>
      </Box>

    </Box>
  )
}

export default Scoring

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