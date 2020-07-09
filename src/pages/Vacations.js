import React from 'react';
import styled from 'styled-components';
import VacationTable from '../components/VacationTable';

const Wrapper = styled.div``;

export default function Vacations() {
  return (
    <Wrapper>
      <h1>Vacations</h1>

      <VacationTable />
    </Wrapper>
  );
}
