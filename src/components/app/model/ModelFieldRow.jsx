import React from 'react';
import * as PropTypes from 'prop-types';
import { buildViewString, gridHeaderClass, gridItemClass } from './helpers/display';
import { getModelKey } from './helpers/model';

const ModelFieldRow = props => {
  const { firstRow, modelArray, field, sourceDataArrays, users, className } = props;
  const rowClass = firstRow ? 'grid-row--header' : '';
  const cellClass = firstRow
    ? gridHeaderClass(className, 1, true)
    : gridItemClass(className, 1, true);
  const nameClass = firstRow
    ? gridHeaderClass(className, 0, true)
    : gridItemClass(className, 1, true);

  return (
    <div key="bikeReviewHeaders" className={`grid-row ${rowClass}`}>
      <div className={nameClass} key={`modelHead${field.fieldName}`} data-test="model-field-header">
        {field.header}
      </div>
      {modelArray.map(modelInstance => {
        const modelKey = getModelKey(modelInstance);
        return (
          <div
            className={cellClass}
            data-test="part-type-header"
            key={`${field.field_name}_${modelKey}`}
          >
            {buildViewString(modelInstance, field, sourceDataArrays, users)}
          </div>
        );
      })}
    </div>
  );
};
ModelFieldRow.defaultProps = {
  modelArray: [],
  firstRow: false,
  sourceDataArrays: {},
  className: '',
};
ModelFieldRow.propTypes = {
  modelArray: PropTypes.array,
  field: PropTypes.object.isRequired,
  firstRow: PropTypes.bool,
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
  className: PropTypes.string,
};
export default ModelFieldRow;
