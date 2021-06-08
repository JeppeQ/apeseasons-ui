import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

export const styles = makeStyles({

});

export const CustomTableCell = withStyles(() => ({
    head: {
        fontSize: 14,
        padding: '12px 24px 12px 16px',
    },
    body: {
        border: 'none',
        padding: '12px 24px 6px 16px',
    }
}))(TableCell)