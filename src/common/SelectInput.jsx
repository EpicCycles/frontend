import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

class SelectInput extends Component {
  makeValueStrings = () => {
    const { value } = this.props;
    if (Array.isArray(value) && value.length > 0) {
      if (this.props.isMultiple) {
        return value.map(inputValue => inputValue.toString());
      } else {
        return value[0].toString();
      }
    } else if (value && value.length > 0) {
      if (this.props.isMultiple) {
        return [value.toString()];
      } else {
        return value.toString();
      }
    }
  };

  buildOptions = () => {
    const { options, isEmptyAllowed } = this.props;

    let displayOptions = [];
    if (isEmptyAllowed) {
      displayOptions.push({ value: 0, name: 'None' });
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

  findDefaultSelections = () => {
    let defaultValue = [];
    this.props.options.forEach(option => {
      if (option.isDefault) defaultValue.push(option.value.toString());
    });
    if (defaultValue.length > 0)
      if (this.props.isMultiple) {
        return defaultValue;
      } else {
        return defaultValue[0];
      }
    return 0;
  };

  handleChange = event => {
    if (this.props.isMultiple) {
      let value = [];
      const options = event.target.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.props.onChange(event.target.name, value);
    } else {
      this.props.onChange(event.target.name, event.target.value);
    }
  };

  render() {
    const {
      disabled,
      className,
      fieldName,
      error,
      title,
      label,
      isMultiple,
      multipleSize,
    } = this.props;
    const selectedValue = this.makeValueStrings() || this.findDefaultSelections();
    const displayOptions = this.buildOptions(selectedValue);
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
          onChange={event => this.handleChange(event)}
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
  }
}

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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isEmptyAllowed: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
};
export default SelectInput;
