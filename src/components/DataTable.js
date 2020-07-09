import React from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const Wrapper = styled(Paper)`
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
  }

  tbody {
    .MuiIconButton-root {
      margin-left: 5px;
    }
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
      width: 110px;
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

export default class DataTable extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <table>{children}</table>
      </Wrapper>
    );
  }
}
