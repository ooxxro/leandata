import React from 'react';
import styled from 'styled-components';
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const Wrapper = styled.div`
  position: fixed;
  bottom: 65px;
  right: 85px;
  .add-icon {
    background: #36b572;
    color: #fff;
  }
`;

export default class AddButton extends React.Component {
  render() {
    return (
      <Wrapper>
        <Tooltip title="Add new user" aria-label="add">
          <Fab className="add-icon">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Wrapper>
    );
  }
}
