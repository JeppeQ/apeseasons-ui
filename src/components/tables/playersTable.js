import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import * as tournamentApi from '../../api/tournament'
import { ellipseAddress } from '../../helpers/utilities'
import { CustomTableCell, styles } from './styles'

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