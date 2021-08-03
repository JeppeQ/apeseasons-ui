import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { ellipseAddress } from '../../helpers/utilities'
import { styles, CustomTableCell } from './styles'
import * as tournamentApi from '../../api/tournament'

const cells = [
  { id: 'rank', label: '#', sortable: true },
  { id: 'player', label: 'Player', align: 'left', sortable: true },
  { id: 'networth', label: 'Net worth', align: 'right', sortable: true },
  { id: 'prize', label: 'Prize', align: 'right', sortable: true },
]

export function PlayersTable(props) {
  const _classes = styles()
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    async function getPlayers() {
      setLoading(true)
      const data = await tournamentApi.getPlayers(props.tournament)
      setPlayers(data || [])
      setLoading(false)
    }

    getPlayers()
  }, [props.tournament])

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
                <Typography variant='subtitle2' color='textSecondary'>No players</Typography>
              </Box>
            }

            {!loading && players.map((player, i) => (
              <TableRow key={player.id}>

                <CustomTableCell>
                  {player.rank}
                </CustomTableCell>

                <CustomTableCell>
                  {ellipseAddress(player.id, 8, 4)}
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  <NumberFormat value={player.netWorth} displayType={'text'} prefix={'$'} thousandSeparator />
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <NumberFormat value={player.prize} displayType={'text'} prefix={'$'} thousandSeparator />
                  </Typography>
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