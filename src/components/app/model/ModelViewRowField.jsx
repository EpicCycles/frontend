import * as PropTypes from 'prop-types';
import React from 'react';
import { buildViewString } from './helpers/display';

const ModelViewRowField = props => {
  const { field, model, sourceDataArrays } = props;
  let viewData = buildViewString(model, field, sourceDataArrays);
  return field.maxWidth ? (
    <div style={{ maxWidth: field.maxWidth }}>
      {Array.isArray(viewData) ? viewData.join() : viewData}
    </div>
  ) : (
    <nobr>{Array.isArray(viewData) ? viewData.join() : viewData}</nobr>
  );
};
ModelViewRowField.defaultProps = {
  sourceDataArrays: {},
};
ModelViewRowField.propTypes = {
  field: PropTypes.any.isRequired,
  model: PropTypes.any,
  sourceDataArrays: PropTypes.shape({
    sections: PropTypes.array,
    brands: PropTypes.array,
    bikes: PropTypes.array,
    frames: PropTypes.array,
    suppliers: PropTypes.array,
    customers: PropTypes.array,
    users: PropTypes.array,
    fittings: PropTypes.array,
    charges: PropTypes.array,
  }),
};
export default ModelViewRowField;
