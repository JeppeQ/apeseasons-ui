import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

function Overview() {

  return (
    <Box sx={classes.container}>

      <Box>
        <Typography variant='h3'>overview</Typography>
      </Box>

      <Box sx={classes.divider} />

      <Box>
        <Typography color='primary' variant='h6'>
          What is Ape Seasons?
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          Ape Seasons is a GameFi protocol currently residing on Polygon.
          It is a pvp battle game where players invest a limited amount of funds in various tokens.
          The objective of the game is to have a higher ROI than your opponents over the span of a contest.
        </Typography>

        <br />

        <Typography>
          Once you have entered a contest with the required funds, there's no backing out.
          The best performing players will walk away with lucrative rewards, while the rest will lose it all.
          Just like apeing into your favourite meme coin, you're putting it all on the line, hence the name Ape Seasons. 
        </Typography>

      </Box>

      <Box mt={4}>
        <Typography color='primary' variant='h6'>
          Why blockchain?
        </Typography>
      </Box>

    </Box>
  )
}

export default Overview

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