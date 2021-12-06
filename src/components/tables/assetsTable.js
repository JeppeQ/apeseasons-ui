import React, { useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import makeStyles from '@mui/styles/makeStyles';

import { styles, CustomTableCell } from './styles'
import Logos from '../../helpers/logos'
import { TokenContext } from '../../contexts/tokenContext'

const cells = [
  { id: 'token', label: 'Token', align: 'left', sortable: true },
  { id: 'total', label: 'Amount', align: 'right', sortable: true },
  { id: 'usd', label: 'Value', align: 'right', sortable: true },
  { id: 'actions', label: 'Actions', align: 'right' },
]

export function AssetsTable(props) {
  const _classes = styles()
  const classes = useStyles()
  const tokenProvider = useContext(TokenContext)

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

            {props.tokens.length === 0 &&
              <Box p={2}>
                <Typography variant='subtitle2' color='textSecondary'>No assets</Typography>
              </Box>
            }

            {props.tokens.map(token => {
              const tokenData = tokenProvider.tokens.find(t => t.address === token.tokenAddress)

              return <TableRow key={token.tokenAddress}>

                <CustomTableCell>
                  <Box display='flex'>
                    <img src={Logos[token.tokenSymbol]} style={{ marginRight: '5px' }} height={20} alt='tokenSymbol' />
                    {token.tokenName}
                    <Box ml={1}>
                      <Typography variant='body1' color='textSecondary'>{token.tokenSymbol}</Typography>
                    </Box>
                  </Box>
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  <NumberFormat value={token.amountFloat} displayType={'text'} thousandSeparator />
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  <NumberFormat displayType={'text'} prefix={'$'} thousandSeparator decimalScale={2}
                    value={token.amountFloat * tokenData.price || 0} />
                </CustomTableCell>

                <CustomTableCell align={'right'}>
                  {props.swapAvailable
                    && <Box className={_classes.link} onClick={() => { props.swap(token) }}>
                      SWAP
                    </Box>}
                </CustomTableCell>
              </TableRow>
            })}
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