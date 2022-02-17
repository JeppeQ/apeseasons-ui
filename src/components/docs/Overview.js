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

      <Box mt={1}>

        <Typography>
          If we were a traditional centralized service, you would need to trust us to:
          Handle your funds securely,
          invest correctly on your behalf and give out the proper rewards.
          Would you trust a new platform you've never heard of with your funds? We would not.
        </Typography>

        <br />

        <Typography>
          Blockchain technology enables us to create decentralized contests (smart contracts),
          that can facilitate real investments in a trustless and secure environment.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography color='primary' variant='h6'>
          Vision
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          The main purpose of Ape Seasons is to offer crypto enthusiasts an alternative and entertaining way to
          invest their funds. Our goal is not to create millionaires nor ruin the financial lives of fellow apes.
          Predicting the market short term is a difficult skill to master, and there will always be some luck involved.
        </Typography>

        <br />

        <Typography>
          On a more serious note, Ape Seasons can be a useful tool if:
        </Typography>
        <ul>
          <li>You're consistently outperforming other apes.</li>
          <li>You want to kick-start your crypto career but don't have the funds to do so.</li>
          <li>In a bear market where everyone loses money, winners can still turn a profit.</li>
        </ul>
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