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
  { id: 'token', label: 'Token', align: 'left', sortable: true },
  { id: 'total', label: 'Total', align: 'right', sortable: true },
  { id: 'usd', label: 'USD Value', align: 'right', sortable: true },
  { id: 'actions', label: 'Actions', align: 'right' },
]

const assetData = [
  { token: 'Alpha Finance', symbol: 'ALPHA', total: 52, USD: 50 },
  { token: 'Bitcoin', symbol: 'BTC', total: 2, USD: 50 },
]
export function AssetsTable() {
  const _classes = styles()
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState(assetData)

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

            {!loading && assets.length === 0 &&
              <Box p={2}>
                <Typography variant='subtitle2' color='textSecondary'>No assets</Typography>
              </Box>
            }

            {!loading && assets.map(asset => (
              <TableRow key={asset.token}>
                <CustomTableCell>
                  {asset.token}
                </CustomTableCell>
                <CustomTableCell align={'right'}>
                  {asset.total}
                </CustomTableCell>
                <CustomTableCell align={'right'}>
                  {asset.USD}
                </CustomTableCell>
                <CustomTableCell align={'right'}>
                  <Box className={classes.tradeLink} onClick={() => {}}>SWAP</Box>
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
    backgroundColor: '#231E2F',
    borderCollapse: 'collapse'
  },
  tradeLink: {
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'astrospace',
    color: '#058665',
    "&:hover": {
      color: 'rgba(14, 70, 26, 0.9)'
    }
  },
})