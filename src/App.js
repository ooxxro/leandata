import React from 'react';
import styled from 'styled-components';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import SideBar from './components/SideBar';
import Users from './pages/Users';
import Vacations from './pages/Vacations';

const Wrapper = styled.div`
  display: flex;

  .appBar {
    z-index: 1201;
    background: linear-gradient(45deg, #36b572 30%, #0abab5 90%);
  }
  .logo {
    font-family: 'Carter One', cursive;
    font-size: 24px;
  }
  .content {
    flex-grow: 1;
    padding: 64px 24px;
    background-color: #ebf7ef;
    min-height: 100vh;
  }
`;

export default class App extends React.Component {
  state = {
    users: {
      123: {
        firstName: 'Amber',
        lastName: 'Hung',
        location: 'Mountain View',
        birthDate: new Date('10/24/1992'),
      },
      124: {
        firstName: 'BB',
        lastName: 'DD',
        location: 'Sunnyvale',
        birthDate: new Date('05/10/2011'),
      },
    },
    vacations: [
      { userId: '123', startDate: new Date('07/08/2020'), endDate: new Date('07/08/2021') },
    ],
    userIdsInVacation: new Set(),
  };

  componentDidMount() {
    this.recalcUserIdsInVacation(this.state.vacations);
  }

  recalcUserIdsInVacation = newVacations => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = now.getFullYear();
    const today = new Date(mm + '/' + dd + '/' + yyyy);

    const newUserIdsInVacation = new Set();

    newVacations.forEach(vacation => {
      if (vacation.startDate <= today && today <= vacation.endDate) {
        newUserIdsInVacation.add(vacation.userId);
      }
    });
    this.setState({ userIdsInVacation: newUserIdsInVacation });
  };

  updateUsers = newUsers => this.setState({ users: newUsers });

  updateVacations = newVacations => {
    this.setState({ vacations: newVacations });
    this.recalcUserIdsInVacation(newVacations);
  };

  render() {
    const { users, vacations, userIdsInVacation } = this.state;

    return (
      <Wrapper className="App">
        <CssBaseline />

        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Router>
            <AppBar position="fixed" className="appBar">
              <Toolbar>
                <Typography variant="h6" noWrap className="logo">
                  LeanData Table
                </Typography>
              </Toolbar>
            </AppBar>

            <SideBar />

            <main className="content">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/users" />
                </Route>
                <Route exact path="/users">
                  <Users
                    users={users}
                    updateUsers={this.updateUsers}
                    vacations={vacations}
                    updateVacations={this.updateVacations}
                    userIdsInVacation={userIdsInVacation}
                  />
                </Route>
                <Route exact path="/vacations">
                  <Vacations
                    users={users}
                    updateUsers={this.updateUsers}
                    vacations={vacations}
                    updateVacations={this.updateVacations}
                  />
                </Route>
              </Switch>
            </main>
          </Router>
        </SnackbarProvider>
      </Wrapper>
    );
  }
}
