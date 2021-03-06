import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { dataPropType } from 'utils/propTypes';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import { OBJECTS, LOAD_DATA_FAILED } from 'containers/App/constants';
import { makeSelectStatus } from 'containers/App/selectors';

import { makeSelectVerblijfsobjectData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const VerblijfsObjectContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.VERBLIJFSOBJECT.NAME);
  const href = OBJECTS.VERBLIJFSOBJECT.STELSELPEDIA_LINK;
  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;
  return render;
};

VerblijfsObjectContainer.defaultProps = {
  data: null,
};

VerblijfsObjectContainer.propTypes = {
  data: dataPropType,
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectVerblijfsobjectData,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);

const Intl = injectIntl(VerblijfsObjectContainer);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'verblijfsobject', saga }),
  injectReducer({ key: 'verblijfsobject', reducer }),
)(memo(Intl));
