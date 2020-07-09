import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import SideBar from './components/SideBar';
import Users from './pages/Users';
import Vacations from './pages/Vacations';

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
    padding: `64px 24px`,
    backgroundColor: '#ebf7ef',
    minHeight: '100vh',
  },
}));

export default function App() {
  const classes = useStyles();
  const [users, updateUsers] = useState({
    123: {
      firstName: 'Amber',
      lastName: 'Hung',
      location: 'Mountain View',
      birthDate: new Date('10/24/1992'),
    },
    124: {
      firstName: 'BB',
      lastName: 'Hung',
      location: 'Lake View',
      birthDate: new Date('10/24/2020'),
    },
  });
  const [vacations, updateVacations] = useState([]);

  return (
    <div className={`${classes.root} App`}>
      <CssBaseline />

      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Router>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap className={classes.logo}>
                LeanData Table
              </Typography>
            </Toolbar>
          </AppBar>

          <SideBar />

          <main className={classes.content}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/users" />
              </Route>
              <Route exact path="/users">
                <Users
                  users={users}
                  vacations={vacations}
                  updateUsers={updateUsers}
                  updateVacations={updateVacations}
                />
              </Route>
              <Route exact path="/vacations">
                <Vacations
                  users={users}
                  vacations={vacations}
                  updateUsers={updateUsers}
                  updateVacations={updateVacations}
                />
              </Route>
            </Switch>
          </main>
        </Router>
      </SnackbarProvider>
    </div>
  );
}
