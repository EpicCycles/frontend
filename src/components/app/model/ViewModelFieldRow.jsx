import React from 'react';

import * as PropTypes from 'prop-types';
import ModelViewRowField from './ModelViewRowField';
import { CHECKBOX } from './helpers/fields';

const ViewModelFieldRow = props => {
  const { model, field, sourceDataArrays, componentKey } = props;
  if (field.type === CHECKBOX || model[field.fieldName]) {
    return (
      <div className="grid-row" key={`field-row${field.fieldName}`}>
        <div
          className="grid-item--borderless field-label align_right"
          key={`header${field.fieldName}`}
        >
          {field.header}
        </div>
        <div key={`fieldDiv${field.fieldName}`} className="grid-item--borderless field-label ">
          <ModelViewRowField
            field={field}
            model={model}
            sourceDataArrays={sourceDataArrays}
            key={`modelField${field.fieldName}${componentKey}`}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

ViewModelFieldRow.propTypes = {
  model: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
export default ViewModelFieldRow;
