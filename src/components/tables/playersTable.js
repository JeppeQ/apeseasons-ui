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
  { id: 'rank', label: '#', sortable: true },
  { id: 'player', label: 'Player', align: 'left', sortable: true },
  { id: 'networth', label: 'Net worth', align: 'right', sortable: true },
  { id: 'prize', label: 'Prize', align: 'right', sortable: true },
]

const playerData = [
  { address: '08XABC5GHAIWKJEWQKE23', networth: 100 },
  { address: '08BGABC5GHAIWKHAJ89JL', networth: 100 },
]
export function PlayersTable(props) {
  const _classes = styles()
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState(playerData)

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
              {props.history &&
                <CustomTableCell align={'center'}>
                  <Box>
                    <Typography variant='body1' color='textSecondary'>Trades</Typography>
                  </Box>
                </CustomTableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && loadingRow()}

            {!loading && players.length === 0 &&
              <Box p={2}>
                <Typography variant='subtitle2' color='textSecondary'>No assets</Typography>
              </Box>
            }

            {!loading && players.map((player, i) => (
              <TableRow key={player.address}>

                <CustomTableCell>
                  {i + 1}
                </CustomTableCell>

                <CustomTableCell>
                  {ellipseAddress(player.address, 8, 4)}
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  ${player.networth}
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>$123</Typography>
                </CustomTableCell>

                {props.history && <CustomTableCell align={'center'}>
                  <Box className={_classes.link} onClick={() => { }}>View</Box>
                </CustomTableCell>}

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
})