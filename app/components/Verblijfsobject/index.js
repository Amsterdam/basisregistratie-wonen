import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Verblijfsobject = ({ data, onSuccess }) => (
  <>
    {data && <span ref={onSuccess} />}
    <Section cfg={OBJECTS.VERBLIJFSOBJECT} data={data} />
  </>
);

Verblijfsobject.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

Verblijfsobject.defaultProps = {
  data: null,
};

export default Verblijfsobject;
