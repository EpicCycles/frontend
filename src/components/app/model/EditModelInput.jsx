import * as PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  BRAND,
  CHECKBOX,
  COUNTRY,
  CURRENCY,
  NUMBER,
  PART_TYPE,
  PASSWORD,
  SELECT_MULTIPLE,
  SELECT_ONE,
  SUPPLIER,
  TEXT_AREA,
} from './helpers/fields';
import FormTextAreaInput from '../../../common/FormTextAreaInput';
import FormTextInput from '../../../common/FormTextInput';
import PartTypeSelect from '../../partType/PartTypeSelect';
import BrandSelect from '../../brand/BrandSelect';
import SupplierSelect from '../../supplier/SupplierSelect';
import CountrySelect from '../../address/CountrySelect';
import SelectInput from '../../../common/SelectInput';
import { CHARGE } from '../../quote/helpers/quoteChargeFields';
import { chargeOptions } from '../../charge/helpers/chargeOptions';

class EditModelInput extends Component {
  validateOnChange = (fieldName, fieldValue) => {
    const { field, componentKey, onChange } = this.props;
    if (fieldValue || field.type === CHECKBOX) {
      onChange(field.fieldName, fieldValue, componentKey);
    } else {
      onChange(field.fieldName, '', componentKey);
    }
  };
  resetField = fieldName => {
    const originalValue = this.props.persistedModel[this.props.field.fieldName];
    this.validateOnChange(fieldName, originalValue);
  };

  render() {
    const {
      field,
      model,
      className,
      componentKey,
      index,
      sections,
      brands,
      charges,
      suppliers,
    } = this.props;
    let editComponent;
    const fieldName = `${field.fieldName}${componentKey}${index}`;
    const fieldValue = model[field.fieldName];
    const emptyAllowed = !(field.required && fieldValue);
    const error = model.error_detail ? model.error_detail[field.fieldName] : '';
    const disabled = model.deleted || field.disabled;

    switch (field.type) {
      case SELECT_ONE:
        editComponent = (
          <SelectInput
            className={className}
            fieldName={fieldName}
            value={fieldValue}
            onChange={this.validateOnChange}
            options={field.selectList}
            error={error}
            disabled={disabled}
            isEmptyAllowed={emptyAllowed}
          />
        );
        break;
      case SELECT_MULTIPLE:
        editComponent = (
          <SelectInput
            className={className}
            fieldName={fieldName}
            value={fieldValue}
            onChange={this.validateOnChange}
            options={field.selectList}
            error={error}
            disabled={disabled}
            isMultiple={true}
            isEmptyAllowed={emptyAllowed}
          />
        );
        break;
      case TEXT_AREA:
        editComponent = (
          <FormTextAreaInput
            className={className}
            placeholder={field.placeholder || field.header}
            fieldName={fieldName}
            value={fieldValue}
            onChange={this.validateOnChange}
            cols={Math.min(50, Math.ceil(field.displaySize / 4))}
            onClick={this.resetField}
            error={error}
            disabled={disabled}
          />
        );
        break;
      case COUNTRY:
        editComponent = (
          <CountrySelect
            fieldName={fieldName}
            countrySelected={fieldValue}
            onChange={this.validateOnChange}
            isEmptyAllowed={emptyAllowed}
            disabled={disabled}
          />
        );
        break;
      case NUMBER:
      case CURRENCY:
        const displayValue = fieldValue ? fieldValue.toString() : '';
        editComponent = (
          <FormTextInput
            className={className}
            placeholder={field.header}
            error={error}
            fieldName={fieldName}
            value={displayValue}
            onChange={this.validateOnChange}
            size={field.displaySize}
            onClick={this.validateOnChange}
            maxLength={field.maxLength}
            disabled={disabled}
            inputClass={'align_right'}
          />
        );
        break;
      case PASSWORD:
        editComponent = (
          <FormTextInput
            dataType={PASSWORD}
            className={className}
            placeholder={field.header}
            error={error}
            fieldName={fieldName}
            value={fieldValue}
            onChange={this.validateOnChange}
            size={field.displaySize}
            onClick={this.validateOnChange}
            maxLength={field.maxLength}
            disabled={disabled}
          />
        );
        break;
      case CHECKBOX:
        const checked = !!fieldValue;
        editComponent = (
          <input
            type="checkbox"
            name={fieldName}
            onChange={() => this.validateOnChange(fieldName, !checked)}
            checked={checked}
            disabled={disabled}
            className={error ? 'red' : ''}
            title={error ? `${field.title} red` : field.title}
            data-test="model-checkbox"
          />
        );
        break;
      case PART_TYPE:
        editComponent = (
          <PartTypeSelect
            sections={sections}
            fieldName={fieldName}
            onChange={this.validateOnChange}
            partTypeSelected={fieldValue}
            isEmptyAllowed={emptyAllowed}
            error={error}
            disabled={disabled}
          />
        );
        break;
      case BRAND:
        editComponent = (
          <BrandSelect
            brands={brands}
            fieldName={fieldName}
            onChange={this.validateOnChange}
            brandSelected={fieldValue}
            isEmptyAllowed={emptyAllowed}
            error={error}
            disabled={disabled}
            bikeOnly={field.bikeOnly}
          />
        );
        break;
      case CHARGE:
        const chargeValue = fieldValue ? fieldValue.toString() : '';
        editComponent = (
          <SelectInput
            className={className}
            fieldName={fieldName}
            value={chargeValue}
            onChange={this.validateOnChange}
            options={chargeOptions(charges)}
            error={error}
            disabled={disabled}
            isMultiple={false}
            isEmptyAllowed={emptyAllowed}
          />
        );
        break;
      case SUPPLIER:
        editComponent = (
          <SupplierSelect
            suppliers={suppliers}
            fieldName={fieldName}
            onChange={this.validateOnChange}
            supplierSelected={fieldValue}
            isEmptyAllowed={emptyAllowed}
            error={error}
            disabled={disabled}
          />
        );
        break;
      default:
        editComponent = (
          <FormTextInput
            className={className}
            placeholder={field.placeholder || field.header}
            error={error}
            onChange={this.validateOnChange}
            fieldName={fieldName}
            value={fieldValue}
            size={field.displaySize}
            onClick={this.validateOnChange}
            maxLength={field.maxLength}
            title={field.title || field.placeholder}
            list={field.listId}
            disabled={disabled}
          />
        );
    }
    return <Fragment>{editComponent}</Fragment>;
  }
}
EditModelInput.defaultProps = {
  index: '',
  model: {},
  persistedModel: {},
};
EditModelInput.propTypes = {
  field: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  persistedModel: PropTypes.object,
  className: PropTypes.string,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sections: PropTypes.array,
  brands: PropTypes.array,
  charges: PropTypes.array,
  suppliers: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  fittings: PropTypes.array,
};
export default EditModelInput;
