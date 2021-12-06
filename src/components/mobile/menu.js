import React from 'react';
import { useHistory } from "react-router-dom"

import makeStyles from '@mui/styles/makeStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Menu(props) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <SwipeableDrawer
      anchor={'top'}
      open={props.open}
      onClose={props.close}
    >
      <Box className={classes.list} onClick={props.close}>
        <List>

          {props.items.map(item => (
            <ListItem button key={item.name} onClick={() => history.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={<Box style={{ letterSpacing: '3px', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</Box>} />
            </ListItem>
          ))}

          <ListItem style={{ marginTop: '10px' }}>
            <Button onClick={() => {}} variant='outlined'>
              connect wallet
            </Button>
          </ListItem>

        </List>
      </Box>
    </SwipeableDrawer>
  );
}

const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
});