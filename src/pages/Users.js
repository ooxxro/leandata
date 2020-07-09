import React from 'react';
import styled from 'styled-components';
import UserTable from '../components/UserTable';

const Wrapper = styled.div``;

export default function Users({ users, vacations, updateUsers, updateVacations }) {
  return (
    <Wrapper>
      <h1>Users</h1>

      <UserTable
        users={users}
        vacations={vacations}
        updateUsers={updateUsers}
        updateVacations={updateVacations}
      />
    </Wrapper>
  );
}
