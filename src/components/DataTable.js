import React from 'react';
import styled from 'styled-components';

const WrappedTable = styled.table``;

export default class DataTable extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <WrappedTable>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>
      </WrappedTable>
    );
  }
}
