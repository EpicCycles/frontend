/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import * as PropTypes from 'prop-types';

const SelectInput = props => {
  const {
    options,
    isEmptyAllowed,
    value,
    disabled,
    className,
    fieldName,
    error,
    title,
    label,
    isMultiple,
    multipleSize,
  } = props;

  const makeValueStrings = () => {
    if (Array.isArray(value) && value.length > 0) {
      if (isMultiple) {
        return value.map(inputValue => inputValue.toString());
      } else {
        return value[0].toString();
      }
    } else if (value && value.length > 0) {
      if (isMultiple) {
        return [value.toString()];
      } else {
        return value.toString();
      }
    } else if (isMultiple) {
      return [];
    }
  };

  const buildOptions = () => {
    let displayOptions = [];
    if (isEmptyAllowed) {
      displayOptions.push({ value: '', name: 'None' });
    } else if (!value) {
      displayOptions.push({ value: '', name: '' });
    }
    options.forEach(option => {
      const displayName = option.name ? option.name : option.value;
      displayOptions.push({
        value: option.value.toString(),
        name: displayName,
      });
    });
    return displayOptions;
  };

  const findDefaultSelections = () => {
    const { options, isMultiple } = props;
    let defaultValue = [];
    if (options.length > 1) {
      options.forEach(option => {
        if (option.isDefault) defaultValue.push(option.value.toString());
      });
    } else {
      if (isEmptyAllowed) {
        defaultValue.push('');
      } else if (options.length === 1) {
        defaultValue.push(options[0].value.toString());
      }
    }
    if (defaultValue.length > 0)
      if (isMultiple) {
        return defaultValue;
      } else {
        return defaultValue[0];
      }
    return 0;
  };

  const handleChange = event => {
    if (props.isMultiple) {
      let value = [];
      const options = event.target.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      props.onChange(event.target.name, value);
    } else {
      props.onChange(event.target.name, event.target.value);
    }
  };

  const selectedValue = makeValueStrings() || findDefaultSelections();
  const displayOptions = buildOptions(selectedValue);
  let useMultipleSize = multipleSize;
  if (isMultiple && multipleSize === 1) useMultipleSize = 5;
  return (
    <div
      key={'select-container' + fieldName}
      className={className + (error ? ' error' : '')}
      title={error}
    >
      {label && <label>{label}</label>}
      <select
        name={fieldName}
        id={fieldName}
        key={fieldName}
        title={title}
        multiple={isMultiple}
        size={useMultipleSize}
        onChange={event => handleChange(event)}
        value={selectedValue}
        disabled={disabled}
      >
        {displayOptions.map(option => {
          return (
            <option
              id={`${fieldName}_${option.value}`}
              key={`${fieldName}_${option.value}`}
              value={option.value}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

SelectInput.defaultProps = {
  className: '',
  error: '',
};
SelectInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
  multipleSize: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  isEmptyAllowed: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
};
export default SelectInput;
