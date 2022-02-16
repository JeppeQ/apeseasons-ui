import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

function NavBar({active, setActive}) {
  const section = (name) => {
    return <Box sx={{ padding: '12px 17px 4px' }}>
      <Typography color='primary' variant='h6'>
        {name}
      </Typography>
    </Box>
  }

  const navLink = (name) => {
    if (active === name) {
      return <Box sx={{ padding: '12px 16px 7px', border: '1px solid rgba(255, 255, 255, 0.5)', borderRight: 'none', background: '#131142', cursor: 'pointer' }}>
        <Typography fontFamily={'astrospace'} fontSize={'14px'} color={'white'}>
          {name}
        </Typography>
      </Box>
    }

    return <Box sx={{ padding: '13px 17px 8px', '&:hover': { background: '#292840' }, cursor: 'pointer' }} onClick={() => setActive(name)}>
      <Typography fontFamily={'astrospace'} fontSize={'14px'} color={'rgba(255, 255, 255, 0.7)'}>
        {name}
      </Typography>
    </Box>
  }

  return (
    <Box sx={classes.navBar}>

      <Box sx={classes.logo}>
        <Typography variant='h4'>
          Ape Docs
        </Typography>
      </Box>

      <Box sx={classes.navigationLinks}>
        {section('product')}
        {navLink('Overview')}
        {navLink('Contests')}
        {navLink('Trading')}
        {navLink('Scoring & Rewards')}
        {section('Token')}
        {navLink('Tokenomics')}
        {section('Other')}
        {navLink('Team')}
        {navLink('Roadmap')}
        {navLink('FAQ')}
      </Box>

      <Box mt={1}>
        {section('Powered by apes')}
      </Box>

    </Box>
  )
}

export default NavBar

const classes = {
  navBar: {
    width: '240px',
    borderRight: '1px solid rgba(255, 255, 255, 0.5)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)'
  },
  navigationLinks: {
    paddingTop: '8px'
  }
};