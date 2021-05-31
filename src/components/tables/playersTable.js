import React, { useState, useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { styles } from './styles'

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14,
    padding: '12px 24px 12px 16px',
  },
  body: {
    border: 'none',
    padding: '12px 24px 6px 16px',
  }
}))(TableCell)

const cells = [
  { id: 'player', label: 'Player', align: 'left', sortable: true },
  { id: 'networth', label: 'Net worth', align: 'right', sortable: true },
]

export function PlayersTable() {
  const _classes = styles()
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState([])

  function loadingRow() {
    return (
      <TableRow>
        {cells.map(cell => (
          <CustomTableCell key={'asset_loading_' + cell.id}>
            <Skeleton variant="text" animation="wave" />
          </CustomTableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <React.Fragment>
      <Scrollbars>
        <Table className={classes.playerTable} size='small'>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid grey' }}>
              {cells.map(cell => (
                <CustomTableCell key={cell.id} align={cell.align}>
                  <Box>
                    <Typography variant='body1' color='textSecondary'>{cell.label}</Typography>
                  </Box>
                </CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && loadingRow()}

            {!loading && player.length === 0 &&
              <Box p={2}>
                <Typography variant='subtitle2' color='textSecondary'>No assets</Typography>
              </Box>
            }

            {!loading && players.map(row => (
              <TableRow key={row.id}>
                <CustomTableCell>
                  <Box display='flex'>
                    {row.name}
                    <Box ml={1}>
                      <Typography variant='body1' color='textSecondary'>{row.symbol.toUpperCase()}</Typography>
                    </Box>
                  </Box>
                </CustomTableCell>
                <CustomTableCell align='right'>
                  {<NumberFormat value={row.amount} displayType={'text'} decimalScale={5} thousandSeparator />}
                </CustomTableCell>
                <CustomTableCell align='right'>
                  {<NumberFormat value={row.value} displayType={'text'} prefix={'$'} decimalScale={2} thousandSeparator />}
                </CustomTableCell>
                <CustomTableCell align='right' style={{ color: row.returns < 0 ? '#e15241' : '#8dc647' }}>
                  {<NumberFormat value={row.returns} displayType={'text'} prefix={'$'} decimalScale={0} thousandSeparator />}
                </CustomTableCell>
                <CustomTableCell align='center'>
                  <Button variant='contained' disabled={!tournament.active} className={classes.sellButton} onClick={() => setSell(row)}>Sell</Button>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbars>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  playerTable: {
    width: '100%',
    backgroundColor: '#1E2530',
    borderCollapse: 'collapse'
  },
})