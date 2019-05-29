import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import { makeSelectStatus } from 'containers/App/selectors';
import { makeSelectKadastraalObjectData } from 'containers/KadastraalObject/selectors';
import { loadBAGData } from 'containers/App/actions';
import AccObjPageComponent from 'components/AccommodationObject';
import saga from './saga';

const AccommodationObjectPageComponent = injectIntl(AccObjPageComponent);

const mapStateToProps = createStructuredSelector({
  brkData: makeSelectKadastraalObjectData(),
  status: makeSelectStatus(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBAGData,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectSaga({ key: 'global', saga }),
  withConnect,
  injectIntl,
)(AccommodationObjectPageComponent);
