import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Progress from 'components/Progress';
import { makeSelectProgress, makeSelectStatus } from 'containers/App/selectors';
import { LOAD_DATA_FAILED } from 'containers/App/constants';

export const ProgressContainerComponent = ({ progress, status }) => {
  const { current, max } = progress;
  const statusFailed = status === LOAD_DATA_FAILED;
  const className = statusFailed ? 'finished' : '';
  const now = statusFailed ? 1 : current / max;

  return <Progress now={now} labelPosition="bottom" className={className} />;
};

ProgressContainerComponent.defaultProps = {
  status: undefined,
};

ProgressContainerComponent.propTypes = {
  progress: PropTypes.shape({
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  progress: makeSelectProgress,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);

export default withConnect(ProgressContainerComponent);
