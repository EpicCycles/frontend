import React from 'react';
import * as PropTypes from 'prop-types';

import SelectInput from '../../common/SelectInput';
import { getPartTypeOptions } from './helpers/partType';

const PartTypeSelect = props => {
  const {
    sections,
    fieldName,
    onChange,
    partTypeSelected,
    isEmptyAllowed,
    error,
    disabled,
    isMultiple,
  } = props;

  return (
    <SelectInput
      fieldName={fieldName}
      onChange={onChange}
      value={partTypeSelected}
      options={getPartTypeOptions(sections)}
      isEmptyAllowed={isEmptyAllowed}
      error={error}
      disabled={disabled}
      isMultiple={isMultiple}
    />
  );
};

PartTypeSelect.defaultProps = {
  sections: [],
  fieldName: 'partType',
  isEmptyAllowed: false,
  error: '',
  disabled: false,
};

PartTypeSelect.propTypes = {
  sections: PropTypes.array.isRequired,
  fieldName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  partTypeSelected: PropTypes.any,
  isEmptyAllowed: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isMultiple: PropTypes.bool,
};

export default PartTypeSelect;
