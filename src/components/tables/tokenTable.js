import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import { useQuery } from '@apollo/client'

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
import Logos from '../../helpers/logos'
import * as tokenApi from '../../api/token'

const cells = [
  { id: 'logo', label: '', width: '70px' },
  { id: 'token', label: 'Token', sortable: true },
  { id: 'price', label: 'Price', align: 'right' }
]

export function TokenTable(props) {
  const _classes = styles()
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
      <Scrollbars>
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
                  <img src={Logos[token.symbol]} height={25} />
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

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbars>
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