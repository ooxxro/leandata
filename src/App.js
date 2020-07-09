import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SideBar from './components/SideBar';
import Users from './components/Users';
import Vacations from './components/Vacations';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(45deg, #36b572 30%, #0abab5 90%)',
  },
  logo: {
    fontFamily: "'Carter One', cursive",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#ebf7ef',
    minHeight: '100vh',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={`${classes.root} App`}>
      <CssBaseline />

      <Router>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.logo}>
              LeanData
            </Typography>
          </Toolbar>
        </AppBar>

        <SideBar />

        <main className={classes.content}>
          <Toolbar />

          <Switch>
            <Route exact path="/">
              <Redirect to="/users" />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/vacations">
              <Vacations />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
