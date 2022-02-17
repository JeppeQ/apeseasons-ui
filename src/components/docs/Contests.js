import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

function Contests() {

  return (
    <Box sx={classes.container}>

      <Box>
        <Typography variant='h3'>
          contests
        </Typography>
      </Box>

      <Box sx={classes.divider} />

      <Box>
        <Typography color='primary' variant='h6'>
          Type of contests
        </Typography>
      </Box>

      <Box>
        <Typography>
          A contest is a smart contract deployed to the Polygon Network. 
        </Typography>
      </Box>

    </Box>
  )
}

export default Contests

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