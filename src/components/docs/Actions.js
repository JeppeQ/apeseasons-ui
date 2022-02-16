import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function Actions({ pages, active, setActive }) {

  const index = pages.findIndex(f => f.name === active)

  return (
    <Box sx={classes.container}>

      {index > 0 && <Box sx={classes.action} onClick={() => { setActive(pages[index - 1].name) }}>

        <IconButton>
          <ArrowBackIcon />
        </IconButton>

        <Box textAlign={'right'}>
          <Typography color='primary'>
            Previous
          </Typography>
          <Typography fontFamily={'astrospace'} fontSize={'14px'} color={'white'}>
            {pages[index - 1].name}
          </Typography>
        </Box>

      </Box>}

      {index > 0 && index < pages.length - 1 && <Box mx={1} />}

      {index < pages.length - 1 && <Box sx={classes.action} onClick={() => { setActive(pages[index + 1].name) }}>

        <Box>
          <Typography color='primary'>
            Next
          </Typography>
          <Typography fontFamily={'astrospace'} fontSize={'14px'} color={'white'}>
            {pages[index + 1].name}
          </Typography>
        </Box>

        <IconButton>
          <ArrowForwardIcon />
        </IconButton>

      </Box>}

    </Box>
  )
}

export default Actions

const classes = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    mt: 4
  },
  action: {
    height: '60px',
    width: '100%',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    px: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  }
};