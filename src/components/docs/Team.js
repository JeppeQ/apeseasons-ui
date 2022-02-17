import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import monkeys from '../../assets/images/moneyTeam.jpg'

function Team() {

  return (
    <Box sx={classes.container}>

      <Box>
        <Typography variant='h3'>
          Team
        </Typography>
      </Box>

      <Box sx={classes.divider} />

      <Box>
        <img src={monkeys} alt='team' width={'650px'} style={{ opacity: 0.9 }} />
      </Box>

    </Box>
  )
}

export default Team

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