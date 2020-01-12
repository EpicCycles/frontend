import React from 'react';

import * as PropTypes from 'prop-types';
import EditModelInput from './EditModelInput';

const EditModelPageRow = props => {
  const { model, field, persistedModel, sourceDataArrays, onChange, componentKey } = props;

  return (
    <div className="grid-row" key={`field-row${field.fieldName}`}>
      <div
        className="grid-item--borderless field-label align_right"
        key={`header${field.fieldName}`}
      >
        {field.header}
      </div>
      <div key={`fieldValueDiv${field.fieldName}`} className="grid-item--borderless field-label ">
        <EditModelInput
          field={field}
          model={model}
          persistedModel={persistedModel}
          componentKey={componentKey}
          onChange={onChange}
          sourceDataArrays={sourceDataArrays}
        />
      </div>
    </div>
  );
};

EditModelPageRow.propTypes = {
  model: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  persistedModel: PropTypes.object,
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
  }),
  onChange: PropTypes.func.isRequired,
};
export default EditModelPageRow;
