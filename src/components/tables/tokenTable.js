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
import * as tokenApi from '../../api/token'
import Logos from '../../helpers/logos'
import { CustomTableCell } from './styles'

const cells = [
  { id: 'logo', label: '', width: '70px' },
  { id: 'token', label: 'Token', sortable: true },
  { id: 'price', label: 'Price', align: 'right' },
  { id: 'priceChange', label: '24h', align: 'right' }
]

export function TokenTable(props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    async function getTokens() {
      setLoading(true)
      const data = await tokenApi.getTokens()
      setTokens(data || [])
      setLoading(false)
    }

    getTokens()
  }, [])

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
      <Table className={classes.tokenTable} size='small'>
        <TableHead>
          <TableRow style={{ borderBottom: '1px solid grey' }}>
            {cells.map(cell => (
              <CustomTableCell key={cell.id} align={cell.align} width={cell.width}>
                <Box>
                  <Typography variant='body1' color='textSecondary'>{cell.label}</Typography>
                </Box>
              </CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && loadingRow()}

          {!loading && tokens.map((token, i) => (
            <TableRow key={token.address}>

              <CustomTableCell align='center'>
                <img src={Logos[token.symbol] || Logos['ETH']} height={25} alt='tokenIcon' />
              </CustomTableCell>

              <CustomTableCell>
                <Box display='flex'>
                  {token.name}
                  <Box ml={1}>
                    <Typography variant='body1' color='textSecondary'>{token.symbol}</Typography>
                  </Box>
                </Box>
              </CustomTableCell>

              <CustomTableCell align='right'>
                <NumberFormat value={token.price} displayType={'text'} prefix={'$'} thousandSeparator decimalScale={2} />
              </CustomTableCell>

              <CustomTableCell align='right' style={{ color: token.priceChangeDay < 0 ? '#e15241' : '#8dc647' }}>
                <NumberFormat value={token.priceChangeDay} displayType={'text'} suffix={'%'} />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  tokenTable: {
    width: '100%',
    backgroundColor: '#231E2F',
    borderCollapse: 'collapse'
  },
})