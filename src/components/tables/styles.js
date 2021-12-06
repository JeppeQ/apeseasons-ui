import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import TableCell from '@mui/material/TableCell'

export const styles = makeStyles({
  link: {
    paddingTop: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'astrospace',
    color: '#058665',
    "&:hover": {
      color: 'rgba(14, 70, 26, 0.9)'
    }
  },
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