import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ul = styled.ul`
  padding-left: 0;

  &.depth-0 {
    padding: 0 0 30px;

    ul {
      padding: 0;
    }
  }
  list-style: none;

  &.depth-1 {
    & > li {
      padding-left: 0;

      & > ul {
        padding-bottom: 30px;
      }

      &:before {
        content: none;
      }
    }
  }

  & > li.has-list {
    padding-left: 0 !important;

    &:before {
      content: none;
    }
  }

  &:not(:first-child) {
    border-bottom: 4px solid #767676;
  }

  li {
    padding-left: 23px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 8px;
      height: 8px;
      margin-top: 7px;
      background-color: #767676;
    }

    a {
      line-height: normal;
    }
  }
`;

const List = ({ children, ...rest }) => <Ul {...rest}>{children}</Ul>;

List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default List;
