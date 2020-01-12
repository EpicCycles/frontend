import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import ModelViewRowField from './ModelViewRowField';
import { fieldAlignment, gridItemClass } from './helpers/display';
import { getModelKey } from './helpers/model';

const ModelViewRow = props => {
  const { model, modelFields, sourceDataArrays, lockFirstColumn, className } = props;
  const componentKey = getModelKey(model);
  return (
    <Fragment>
      {modelFields.map((field, index) => {
        return (
          <div
            className={gridItemClass(
              `${className} ${fieldAlignment(field)}`,
              index,
              lockFirstColumn,
            )}
            key={`modelRow${field.fieldName}${componentKey}`}
            data-test="model-field-cell"
          >
            <ModelViewRowField
              field={field}
              model={model}
              sourceDataArrays={sourceDataArrays}
              key={`modelField${field.fieldName}${componentKey}`}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ModelViewRow.defaultProps = {
  model: {},
  className: '',
  sourceDataArrays: {},
};

ModelViewRow.propTypes = {
  modelFields: PropTypes.array.isRequired,
  model: PropTypes.object,
  sourceDataArrays: PropTypes.shape({
    sections: PropTypes.array,
    brands: PropTypes.array,
    bikes: PropTypes.array,
    charges: PropTypes.array,
    frames: PropTypes.array,
    suppliers: PropTypes.array,
    customers: PropTypes.array,
    users: PropTypes.array,
    fittings: PropTypes.array,
  }),
  className: PropTypes.string,
  lockFirstColumn: PropTypes.bool,
};
export default ModelViewRow;
