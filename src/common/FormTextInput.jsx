/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Icon } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';

const FormTextInput = props => {
  const {
    value,
    className,
    dataType,
    disabled,
    error,
    fieldName,
    inputClass,
    label,
    list,
    maxLength,
    onChange,
    onClick,
    onKeyPress,
    placeholder,
    title,
    size,
  } = props;
  return (
    <div className={`row ${className}${error ? ' error' : ''}`}>
      {label && <label>{label}</label>}
      <input
        className={`${inputClass} ${error ? ' error' : ''}`}
        type={dataType}
        autoComplete="off"
        placeholder={placeholder}
        title={`${title} ${error}`}
        name={fieldName}
        key={fieldName}
        onChange={event => onChange(fieldName, event.target.value)}
        value={value}
        size={size}
        list={list}
        disabled={disabled}
        maxLength={maxLength || size}
        onKeyPress={onKeyPress}
      />
      {value && onClick && (
        <span className="clearInput">
          <Icon
            name="remove"
            key={`remove${fieldName}`}
            id={`remove${fieldName}`}
            size="small"
            circular
            link
            onClick={() => onClick(fieldName)}
          />
        </span>
      )}
    </div>
  );
};

FormTextInput.defaultProps = {
  className: '',
  error: '',
  inputClass: '',
  label: '',
  dataType: 'text',
  placeholder: '',
  title: '',
  value: '',
  list: '',
  size: 30,
};
FormTextInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  dataType: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  list: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  inputClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  size: PropTypes.number,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};
export default FormTextInput;
