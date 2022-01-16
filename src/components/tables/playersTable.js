import { AssetsTable } from '../tables/assetsTable';
import React, { useContext, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import * as tournamentApi from '../../api/tournament'
import { ellipseAddress } from '../../helpers/utilities'
import { CustomTableCell, styles } from './styles'
import { IconButton, Skeleton, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TradeHistoryTable } from './tradeHistoryTable';
import { Web3Context } from '../../contexts/web3Context'

const cells = [
  { id: 'rank', label: '#', sortable: true },
  { id: 'player', label: 'Player', align: 'left', sortable: true },
  { id: 'networth', label: 'Net worth', align: 'right', sortable: true },
  { id: 'prize', label: 'Prize', align: 'right', sortable: true },
  { id: 'assets', label: 'Assets', align: 'center', sortable: true },
]

export function PlayersTable(props) {
  const _classes = styles()
  const classes = useStyles()
  const web3 = useContext(Web3Context)

  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState([])
  const [viewPlayer, setViewPlayer] = useState()

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

  if (viewPlayer) {
    return <React.Fragment>
      <Box display='flex' alignItems={'center'}>
        <IconButton sx={{ mr: 1 }} onClick={() => setViewPlayer()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>
          {viewPlayer.address}
        </Typography>
      </Box>

      <Box sx={{ my: 1 }}>
        <Typography variant='h5'>
          Assets
        </Typography>
      </Box>

      <Box sx={{ border: '1px solid rgba(81, 81, 81, 1)' }}>
        <AssetsTable tokens={viewPlayer.holdings} />
      </Box>

      <Box sx={{ my: 1, mt: 4 }}>
        <Typography variant='h5'>
          Trade history
        </Typography>
      </Box>
      <Box sx={{ border: '1px solid rgba(81, 81, 81, 1)' }}>
        <TradeHistoryTable trades={viewPlayer.trades} />
      </Box>
    </React.Fragment>
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
                <Typography sx={{ fontWeight: web3.address?.toLowerCase() === player.address?.toLowerCase() ? 'bold' : '' }}>
                  {player.rank}
                </Typography>
              </CustomTableCell>

              <CustomTableCell>
                <Typography sx={{ fontWeight: web3.address?.toLowerCase() === player.address?.toLowerCase() ? 'bold' : '' }}>
                  {ellipseAddress(player.address, 8, 4)}
                </Typography>
              </CustomTableCell>

              <CustomTableCell align={'right'}>
                <NumberFormat value={player.netWorth} displayType={'text'} prefix={'$'} thousandSeparator />
              </CustomTableCell>

              <CustomTableCell align={'right'}>
                <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <NumberFormat value={player.prize} displayType={'text'} prefix={'$'} thousandSeparator />
                </Typography>
              </CustomTableCell>

              <CustomTableCell align={'center'}>
                <Box className={_classes.link} onClick={() => { setViewPlayer(player) }}>View</Box>
              </CustomTableCell>

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