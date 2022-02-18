import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

const cells = [
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'players', label: 'Max Players', align: 'center' },
  { id: 'prize', label: 'Prize Structure', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
]

const rows = [
  {
    type: 'Classic',
    players: '100',
    prize: 'Standard',
    description: 'Trade freely between the available tokens. Players are ranked by the value of their tokens.'
  }
]

function Contests(props) {

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
          Overview of contests
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          The following table gives an overview of the different types and variations of contests on Ape Seasons.
          Table will be updated as more types are added.
        </Typography>
      </Box>

      <Box mt={3}>
        <Table sx={{ border: '1px solid grey' }} size='medium'>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid grey' }}>
              {cells.map(cell => (
                <TableCell key={cell.id} align={cell.align}>
                  <Box>
                    <Typography variant='body1' color='textSecondary' noWrap>{cell.label}</Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>

            {React.Children.toArray(
              rows.map(row => (
                <TableRow>

                  <TableCell>
                    {row.type}
                  </TableCell>

                  <TableCell align='center'>
                    {row.players}
                  </TableCell>

                  <TableCell>
                    <Box onClick={() => props.setActive('Scoring & Rewards')} sx={classes.link}>
                      {row.prize}
                    </Box>
                  </TableCell>

                  <TableCell>
                    {row.description}
                  </TableCell>

                </TableRow>
              ))
            )}

          </TableBody>
        </Table>
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
  link: {
    paddingTop: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'astrospace',
    color: '#058665',
    "&:hover": {
      color: 'rgba(24, 113, 43, 0.9)'
    }
  }
};