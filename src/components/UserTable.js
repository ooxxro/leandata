import React from 'react';
import styled from 'styled-components';
import { Paper, IconButton, Tooltip, TextField, MenuItem } from '@material-ui/core';
import StyledAutocomplete from './StyledAutocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import DataTable from './DataTable';
import locations from '../us-cities.json';

const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    color: rgba(0, 0, 0, 0.87);
  }

  thead,
  tr:not(:last-child) td {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  th,
  td {
    padding: 15px;
    text-align: left;
    &.left {
      text-align: left;
    }
    &.center {
      text-align: center;
    }
    &.right {
      text-align: right;
    }
  }

  .hover-show {
    opacity: 0;
    margin-left: 5px;
  }

  tbody tr:hover {
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
    .hover-show {
      opacity: 1;
    }
  }

  .new,
  .edit {
    .MuiInputBase-root {
      font-size: 13px;
    }
    .error {
      .react-datepicker-wrapper input {
        border-bottom: 2px solid #f2453d;
      }
    }
    .react-datepicker-wrapper input {
      border: 0;
      border-bottom: 1px solid #888;
      padding: 3px 0 7px;
      &:focus {
        outline: 0;
      }
      &::placeholder {
        color: #a8a8a8;
      }
    }

    td {
      vertical-align: bottom;
    }
  }
`;

class UserTable extends React.Component {
  state = {
    newUserOpen: false,
    editUserId: null,
    firstName: '',
    lastName: '',
    location: null,
    birthDate: null,
    hasError: false,
  };

  onAddUser = () => {
    const { users, updateUsers, enqueueSnackbar } = this.props;
    const { firstName, lastName, location, birthDate } = this.state;

    if (!firstName.trim() || !lastName.trim() || !location || !birthDate) {
      this.setState({ hasError: true });
      enqueueSnackbar('There are some required fields still empty.', {
        variant: 'error',
      });
      return;
    }

    const userIds = Object.keys(users).sort();

    updateUsers({
      ...users,
      [userIds[userIds.length - 1] + 1]: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        location,
        birthDate,
      },
    });

    enqueueSnackbar(`Successfully added user: "${firstName.trim()} ${lastName.trim()}"`, {
      variant: 'success',
    });

    this.setState({
      newUserOpen: false,
      firstName: '',
      lastName: '',
      location: null,
      birthDate: null,
      hasError: false,
    });
  };

  onRemoveUser = id => {
    const { users, updateUsers, vacations, updateVacations, enqueueSnackbar } = this.props;

    const name = `${users[id].firstName} ${users[id].lastName}`;

    let message = 'Are you sure to remove?';
    // check if have vacation
    if (vacations.some(v => v.userId === id)) {
      message =
        'There are still some vacations for this user, removing this user will also remove all associated vacations. ' +
        message;
    }

    confirmAlert({
      title: 'Confirm remove user?',
      message,
      buttons: [
        {
          label: 'Yes, remove',
          onClick: () => {
            const newVacations = vacations.filter(v => v.userId !== id);
            const newUsers = { ...users };
            delete newUsers[id];
            updateUsers(newUsers);
            updateVacations(newVacations);

            enqueueSnackbar(`Successfully removed user: "${name}"`, {
              variant: 'success',
            });
          },
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  onEditUser = () => {
    const { users, updateUsers, enqueueSnackbar } = this.props;
    const { editUserId, firstName, lastName, location, birthDate } = this.state;

    if (!firstName.trim() || !lastName.trim() || !location || !birthDate) {
      this.setState({ hasError: true });
      enqueueSnackbar('There are some required fields still empty.', {
        variant: 'error',
      });
      return;
    }

    updateUsers({
      ...users,
      [editUserId]: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        location,
        birthDate,
      },
    });

    enqueueSnackbar(`Successfully edited user: "${firstName.trim()} ${lastName.trim()}"`, {
      variant: 'success',
    });

    this.setState({
      editUserId: null,
      firstName: '',
      lastName: '',
      location: null,
      birthDate: null,
      hasError: false,
    });
  };

  renderEditRow = (onSave, onCancel) => {
    const { firstName, lastName, location, birthDate, hasError } = this.state;

    return (
      <>
        <td>
          <TextField
            placeholder="First Name"
            size="small"
            required
            value={firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
            error={hasError && !firstName.trim()}
          />
        </td>
        <td>
          <TextField
            placeholder="Last Name"
            size="small"
            required
            value={lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
            error={hasError && !lastName.trim()}
          />
        </td>
        <td>
          <StyledAutocomplete
            value={location}
            onChange={(e, newValue) => this.setState({ location: newValue })}
            options={locations['us-cities']}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField {...params} placeholder="Location" error={hasError && !location} />
            )}
            size="small"
          />
        </td>
        <td>
          <div className={hasError && !birthDate ? 'error' : ''}>
            <DatePicker
              selected={birthDate}
              onChange={date =>
                this.setState({
                  birthDate: date,
                })
              }
              showYearDropdown
              placeholderText="Birth Date"
            />
          </div>
        </td>
        <td className="right">
          <Tooltip title="save" arrow>
            <IconButton aria-label="save" size="small" onClick={onSave}>
              <CheckIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="cancel" arrow>
            <IconButton aria-label="cancel" size="small" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </td>
      </>
    );
  };

  render() {
    const { users, vacations, updateUsers, updateVacations } = this.props;
    const {
      newUserOpen,
      editUserId,
      firstName,
      lastName,
      location,
      birthDate,
      hasError,
    } = this.state;
    return (
      <Wrapper>
        <Paper>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Location</th>
                <th>Birth Date</th>
                <th className="right">
                  <Tooltip title="add user" arrow>
                    <IconButton
                      aria-label="add user"
                      size="small"
                      onClick={() =>
                        this.setState({
                          newUserOpen: true,
                          firstName: '',
                          lastName: '',
                          location: null,
                          birthDate: null,
                          hasError: false,
                        })
                      }
                      disabled={editUserId !== null}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(users)
                .sort()
                .map(id =>
                  editUserId === id ? (
                    // edit row
                    <tr className="edit" key={`editing ${id}`}>
                      {this.renderEditRow(this.onEditUser, () =>
                        this.setState({ editUserId: null })
                      )}
                    </tr>
                  ) : (
                    // normal row
                    <tr key={id}>
                      <td>{users[id].firstName}</td>
                      <td>{users[id].lastName}</td>
                      <td>{users[id].location}</td>
                      <td>{users[id].birthDate.toDateString()}</td>
                      <td className="right">
                        <Tooltip title="edit" arrow>
                          <IconButton
                            className="hover-show"
                            aria-label="edit"
                            size="small"
                            onClick={() => this.setState({ editUserId: id, ...users[id] })}
                            disabled={newUserOpen}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete" arrow>
                          <IconButton
                            className="hover-show"
                            aria-label="delete"
                            size="small"
                            onClick={() => this.onRemoveUser(id)}
                            disabled={newUserOpen}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  )
                )}

              {newUserOpen && (
                <tr className="new">
                  {this.renderEditRow(this.onAddUser, () => this.setState({ newUserOpen: false }))}
                </tr>
              )}
            </tbody>
          </table>
        </Paper>
      </Wrapper>
    );
  }
}

export default withSnackbar(UserTable);
