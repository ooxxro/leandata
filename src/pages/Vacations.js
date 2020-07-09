import React from 'react';
import styled from 'styled-components';
import VacationTable from '../components/VacationTable';

const Wrapper = styled.div``;

export default function Vacations({ users, vacations, updateUsers, updateVacations }) {
  return (
    <Wrapper>
      <h1>Vacations</h1>

      <VacationTable
        users={users}
        vacations={vacations}
        updateUsers={updateUsers}
        updateVacations={updateVacations}
      />
    </Wrapper>
  );
}
