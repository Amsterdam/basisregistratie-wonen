import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import { OBJECTS, LOAD_DATA_FAILED } from 'containers/App/constants';
import { makeSelectStatus } from 'containers/App/selectors';

import { makeSelectKadastraalSubjectNNPData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const KadastraalSubjectNNPContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.KADASTRAAL_SUBJECT_NNP.NAME);
  const href = OBJECTS.KADASTRAAL_SUBJECT_NNP.STELSELPEDIA_LINK;
  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

KadastraalSubjectNNPContainer.defaultProps = {
  data: null,
};

KadastraalSubjectNNPContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        formattedKey: PropTypes.string.isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        key: PropTypes.string.isRequired,
        value: PropTypes.any,
      }),
    ),
  ),
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalSubjectNNPData(),
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'kadastraalSubjectNNP', saga }),
  injectReducer({ key: 'kadastraalSubjectNNP', reducer }),
)(memo(KadastraalSubjectNNPContainer));