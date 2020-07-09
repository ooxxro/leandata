import React from 'react';
import styled from 'styled-components';
import { IconButton, Tooltip, TextField } from '@material-ui/core';
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
import DataTable from './DataTable';

const Wrapper = styled.div`
  .MuiAutocomplete-root {
    min-width: 170px;
  }
`;

class VacationTable extends React.Component {
  state = {
    newVacationOpen: false,
    editVacationIdx: null,
    userId: null,
    startDate: null,
    endDate: null,
    hasError: false,
  };

  onAddVacation = () => {
    const { users, vacations, updateVacations, enqueueSnackbar } = this.props;
    const { userId, startDate, endDate } = this.state;

    if (!userId || !startDate || !endDate) {
      this.setState({ hasError: true });
      enqueueSnackbar('There are some required fields still empty.', {
        variant: 'error',
      });
      return;
    }
    if (startDate > endDate) {
      this.setState({ hasError: true });
      enqueueSnackbar('Start Date cannot be after End Date.', {
        variant: 'error',
      });
      return;
    }

    updateVacations([
      ...vacations,
      {
        userId,
        startDate,
        endDate,
      },
    ]);

    enqueueSnackbar(
      `Successfully created vacation for user "${users[userId].firstName} ${users[userId].lastName}".`,
      {
        variant: 'success',
      }
    );

    this.setState({
      newVacationOpen: false,
      userId: null,
      startDate: null,
      endDate: null,
      hasError: false,
    });
  };

  onRemoveVacation = i => {
    const { users, vacations, updateVacations, enqueueSnackbar } = this.props;

    const vacation = vacations[i];
    const name = `${users[vacation.userId].firstName} ${users[vacation.userId].lastName}`;

    confirmAlert({
      title: 'Confirm remove vacation?',
      message: `Are you sure you want to remove vacation for "${name}"?`,
      buttons: [
        {
          label: 'Yes, remove',
          onClick: () => {
            const newVacations = [...vacations];
            newVacations.splice(i, 1);
            updateVacations(newVacations);

            enqueueSnackbar(`Successfully removed vacation for user: "${name}"`, {
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

  onEditVacation = () => {
    const { vacations, updateVacations, enqueueSnackbar } = this.props;
    const { editVacationIdx, userId, startDate, endDate } = this.state;

    if (!userId || !startDate || !endDate) {
      this.setState({ hasError: true });
      enqueueSnackbar('There are some required fields still empty.', {
        variant: 'error',
      });
      return;
    }
    if (startDate > endDate) {
      this.setState({ hasError: true });
      enqueueSnackbar('Start Date cannot be after End Date.', {
        variant: 'error',
      });
      return;
    }

    const newVacations = [...vacations];
    newVacations[editVacationIdx] = {
      userId,
      startDate,
      endDate,
    };

    updateVacations(newVacations);

    enqueueSnackbar('Successfully edited vacation.', {
      variant: 'success',
    });

    this.setState({
      editVacationIdx: false,
      userId: null,
      startDate: null,
      endDate: null,
      hasError: false,
    });
  };

  renderEditRow = (onSave, onCancel) => {
    const { users } = this.props;
    const { userId, startDate, endDate, hasError } = this.state;

    return (
      <>
        <td>
          <StyledAutocomplete
            value={userId}
            onChange={(e, userId) => this.setState({ userId })}
            options={Object.keys(users).sort((a, b) => {
              const aName = `${users[a].firstName} ${users[a].lastName}`;
              const bName = `${users[b].firstName} ${users[b].lastName}`;
              return aName > bName ? 1 : bName > aName ? -1 : 0;
            })}
            getOptionLabel={option => `${users[option].firstName} ${users[option].lastName}`}
            renderInput={params => (
              <TextField {...params} placeholder="User" error={hasError && !userId} />
            )}
            size="small"
          />
        </td>
        <td>
          <div
            className={
              (hasError && !startDate) || (startDate && endDate && startDate > endDate)
                ? 'error'
                : ''
            }
          >
            <DatePicker
              selected={startDate}
              onChange={date =>
                this.setState({
                  startDate: date,
                })
              }
              showYearDropdown
              placeholderText="Start Date"
            />
          </div>
        </td>
        <td>
          <div
            className={
              (hasError && !endDate) || (startDate && endDate && startDate > endDate) ? 'error' : ''
            }
          >
            <DatePicker
              selected={endDate}
              onChange={date =>
                this.setState({
                  endDate: date,
                })
              }
              showYearDropdown
              placeholderText="End Date"
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
    const { users, vacations } = this.props;
    const { newVacationOpen, editVacationIdx } = this.state;
    return (
      <Wrapper>
        <DataTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th className="right">
                <Tooltip title="new vacation" arrow>
                  <IconButton
                    aria-label="new vacation"
                    size="small"
                    onClick={() =>
                      this.setState({
                        newVacationOpen: true,
                        userId: null,
                        startDate: null,
                        endDate: null,
                        hasError: false,
                      })
                    }
                    disabled={editVacationIdx !== null}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </th>
            </tr>
          </thead>

          <tbody>
            {vacations.map((vacation, i) =>
              editVacationIdx === i ? (
                // edit row
                <tr className="edit" key={`editing ${i}`}>
                  {this.renderEditRow(this.onEditVacation, () =>
                    this.setState({ editVacationIdx: null })
                  )}
                </tr>
              ) : (
                // normal row
                <tr key={i}>
                  <td>{`${users[vacation.userId].firstName} ${
                    users[vacation.userId].lastName
                  }`}</td>
                  <td>{vacation.startDate.toDateString()}</td>
                  <td>{vacation.endDate.toDateString()}</td>
                  <td className="right">
                    <Tooltip title="edit" arrow>
                      <IconButton
                        className="hover-show"
                        aria-label="edit"
                        size="small"
                        onClick={() =>
                          this.setState({
                            editVacationIdx: i,
                            hasError: false,
                            ...vacation,
                          })
                        }
                        disabled={newVacationOpen || editVacationIdx !== null}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="delete" arrow>
                      <IconButton
                        className="hover-show"
                        aria-label="delete"
                        size="small"
                        onClick={() => this.onRemoveVacation(i)}
                        disabled={newVacationOpen || editVacationIdx !== null}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            )}

            {newVacationOpen && (
              <tr className="new">
                {this.renderEditRow(this.onAddVacation, () =>
                  this.setState({ newVacationOpen: false })
                )}
              </tr>
            )}
          </tbody>
        </DataTable>
      </Wrapper>
    );
  }
}

export default withSnackbar(VacationTable);
