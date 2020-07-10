import React from 'react';
import styled from 'styled-components';
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import BeachIcon from '@material-ui/icons/BeachAccess';
import { NavLink } from 'react-router-dom';

const drawerWidth = 210;
const closeWidth = 56;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  overflow-x: hidden;
  transition: all 0.5s ease-out;
  .MuiPaper-root {
    width: ${drawerWidth}px;
    background-color: #eaf5ef;
    transition: all 0.5s ease-out;
  }
  .drawerContainer {
    overflow-x: hidden;
    overflow-y: auto;
  }
  &.close {
    width: ${closeWidth}px;
    .MuiPaper-root {
      width: ${closeWidth}px;
    }
  }

  a.MuiListItem-root {
    border-right: 5px solid transparent;
    &.active {
      border-color: #36b572;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

export default function SideBar({ open }) {
  return (
    <StyledDrawer variant="permanent" className={open ? '' : 'close'}>
      <Toolbar />
      <div className="drawerContainer">
        <List>
          <ListItem button component={NavLink} to="users">
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={NavLink} to="vacations">
            <ListItemIcon>
              <BeachIcon />
            </ListItemIcon>
            <ListItemText primary="Vacations" />
          </ListItem>
        </List>
      </div>
    </StyledDrawer>
  );
}
