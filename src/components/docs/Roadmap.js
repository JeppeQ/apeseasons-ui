import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

function Roadmap() {

  return (
    <Box sx={classes.container}>

      <Box>
        <Typography variant='h3'>
          Roadmap
        </Typography>
      </Box>

      <Box sx={classes.divider} />

      <Box sx={classes.boxContainer}>
        <Box sx={classes.box}>
          <Typography variant='h5' color='primary' fontSize='20px' sx={{ px: 2.5 }}>
            Q1 2022
          </Typography>

          <ul>
            <li>
              <Typography fontSize={'14px'}>
                Launch v. 0.1
              </Typography>
            </li>
          </ul>
        </Box>

        <Box sx={classes.box}>
          <Typography variant='h5' color='primary' fontSize='20px' sx={{ px: 2.5 }}>
            Q2 2022
          </Typography>

          <Box>
            <ul>
              <li>
                <Typography fontSize={'14px'}>
                  $APE token
                </Typography>
              </li>
              <li>
                <Typography fontSize={'14px'}>
                  Leaderboards
                </Typography>
              </li>
              <li>
                <Typography fontSize={'14px'}>
                  New types of contests
                </Typography>
              </li>
            </ul>
          </Box>
        </Box>

        <Box sx={classes.box}>
          <Typography variant='h5' color='primary' fontSize='20px' sx={{ px: 2.5 }}>
            Q3 2022
          </Typography>

          <ul>
            <li>
              <Typography fontSize={'14px'}>
                Multi-chain
              </Typography>
            </li>
          </ul>
        </Box>

      </Box>

    </Box>
  )
}

export default Roadmap

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
  boxContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  box: {
    width: '31%',
    height: '200px',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    borderRadius: '5px',
    py: 1,
    mb: 3
  }
};