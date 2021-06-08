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

import { ellipseAddress } from '../../helpers/utilities'
import { styles, CustomTableCell } from './styles'

const cells = [
  { id: 'Placement', label: 'Placement', align: 'left', sortable: true },
  { id: 'Prize', label: 'Prize', align: 'right', sortable: true },
]

const prizingData = [
  { placement: '1', prize: 150 },
  { placement: '2', prize: 100 },
]
export function PrizingTable() {
  const _classes = styles()
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [prizes, setPrizes] = useState(prizingData)

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

            {!loading && prizes.length === 0 &&
              <Box p={2}>
                <Typography variant='subtitle2' color='textSecondary'>No assets</Typography>
              </Box>
            }

            {!loading && prizes.map(prize => (
              <TableRow key={prize.placement}>
                <CustomTableCell>
                  {prize.placement}
                </CustomTableCell>
                <CustomTableCell align={'right'}>
                  {prize.prize} DAI
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
  prizingTable: {
    width: '100%',
    backgroundColor: '#231E2F',
    borderCollapse: 'collapse'
  },
})