import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import { DateTime } from 'luxon'
import React from 'react'
import { CustomTableCell } from './styles'

const cells = [
  { id: 'date', label: 'Date', align: 'left', sortable: true },
  { id: 'from', label: 'From', align: 'left', sortable: true },
  { id: 'arrow', label: '', align: 'left', sortable: true },
  { id: 'from', label: 'To', align: 'left', sortable: true },
]

export function TradeHistoryTable(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
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

          {props.trades.length === 0 &&
            <Box p={2}>
              <Typography variant='subtitle2' color='textSecondary'>No trades</Typography>
            </Box>
          }

          {props.trades.map(trade => {
            return <TableRow key={trade.id}>

              <CustomTableCell>
                {DateTime.fromSeconds(Number(trade.timestamp)).toFormat('LLL dd, HH:mm:ss')}
              </CustomTableCell>

              <CustomTableCell>
                <Box display='flex'>
                  {trade.fromAmount}
                  <Box ml={1}>
                    <Typography variant='body1' color='textSecondary'>{trade.from}</Typography>
                  </Box>
                </Box>
              </CustomTableCell>

              <CustomTableCell>
                <ArrowForwardIcon fontSize='small' />
              </CustomTableCell>

              <CustomTableCell>
                <Box display='flex'>
                  {trade.toAmount}
                  <Box ml={1}>
                    <Typography variant='body1' color='textSecondary'>{trade.to}</Typography>
                  </Box>
                </Box>
              </CustomTableCell>

            </TableRow>
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  playerTable: {
    width: '100%',
    backgroundColor: '#231E2F',
    borderCollapse: 'collapse'
  },
})