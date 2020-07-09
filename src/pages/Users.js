import React from 'react';
import styled from 'styled-components';
import UserTable from '../components/UserTable';

const Wrapper = styled.div``;

export default function Users({
  users,
  vacations,
  userIdsInVacation,
  updateUsers,
  updateVacations,
}) {
  return (
    <Wrapper>
      <h1>Users</h1>

      <UserTable
        users={users}
        vacations={vacations}
        userIdsInVacation={userIdsInVacation}
        updateUsers={updateUsers}
        updateVacations={updateVacations}
      />
    </Wrapper>
  );
}
