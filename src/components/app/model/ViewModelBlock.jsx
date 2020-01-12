import React from 'react';

import * as PropTypes from 'prop-types';
import { getModelKey } from './helpers/model';
import ViewModelFieldRow from './ViewModelFieldRow';

const ViewModelBlock = props => {
  const { model, modelFields, className = '', sourceDataArrays } = props;
  const componentKey = getModelKey(model);
  return (
    <div className="grid-container">
      <div key="modelFields" className={`grid ${className}`}>
        {modelFields.map(field => (
          <ViewModelFieldRow
            key={`ViewModelFieldRow${field.fieldName}`}
            field={field}
            model={model}
            componentKey={componentKey}
            sourceDataArrays={sourceDataArrays}
          />
        ))}
      </div>
    </div>
  );
};

ViewModelBlock.defaultProps = {
  model: {},
  sourceDataArrays: {},
};

ViewModelBlock.propTypes = {
  model: PropTypes.object,
  modelFields: PropTypes.array.isRequired,
  className: PropTypes.string,
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
export default ViewModelBlock;
