import React from 'react';
import * as PropTypes from 'prop-types';
import { getModelKey } from '../app/model/helpers/model';
import { fittingText } from './helpers/fitting';
import SelectInput from '../../common/SelectInput';

const FittingSelect = props => {
  const {
    className,
    fittings,
    selectedFitting,
    selectFitting,
    fieldName,
    isEmptyAllowed,
    error,
    disabled,
  } = props;
  const fittingOptions = fittings
    ? fittings.map(fitting => {
        return {
          value: String(getModelKey(fitting)),
          name: fittingText(fitting),
        };
      })
    : [];
  return (
    <SelectInput
      onChange={selectFitting}
      value={selectedFitting ? selectedFitting.toString() : ''}
      options={fittingOptions}
      data-test="fitting-block"
      fieldName={fieldName}
      isEmptyAllowed={isEmptyAllowed}
      className={className}
      error={error}
      disabled={disabled}
    />
  );
};
FittingSelect.defaultProps = {
  error: '',
  className: '',
};
FittingSelect.propTypes = {
  selectFitting: PropTypes.func.isRequired,
  fittings: PropTypes.array,
  selectedFitting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  isEmptyAllowed: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};
export default FittingSelect;
