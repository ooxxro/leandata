import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import BeachIcon from '@material-ui/icons/BeachAccess';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#eaf5ef',
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

export default function SideBar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button component={Link} to="users">
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="vacations">
            <ListItemIcon>
              <BeachIcon />
            </ListItemIcon>
            <ListItemText primary="Vacations" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
