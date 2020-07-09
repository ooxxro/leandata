import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Tooltip,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import BeachIcon from "@material-ui/icons/BeachAccess";
import AddIcon from "@material-ui/icons/Add";

const drawerWidth = 240;

const Wrapper = styled.div`
  position: relative;
  .add-icon {
    position: absolute;
    bottom: 65px;
    right: 85px;
    background: #36b572;
    color: #fff;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(45deg, #36b572 30%, #0abab5 90%)",

    // fontFamily: "'Carter One', cursive",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#eaf5ef",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#ebf7ef",
    height: "100vh",
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            LeanData
          </Typography>
        </Toolbar>
      </AppBar>
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
            {["User", "Vacation"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <FaceIcon /> : <BeachIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <Wrapper className={`${classes.content} main-content`}>
        <Toolbar />
        <Tooltip title="Add new user" aria-label="add">
          <Fab className="add-icon">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Wrapper>
    </div>
  );
}
