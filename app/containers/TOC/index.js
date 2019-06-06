import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import injectReducer from 'utils/injectReducer';
import TOC from 'components/TOC/Loadable';

import { makeSelectTOC } from './selectors';
import reducer from './reducer';

const Intl = injectIntl(TOC);

const mapStateToProps = createStructuredSelector({
  sections: makeSelectTOC,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  injectReducer({ key: 'toc', reducer }),
)(Intl);
