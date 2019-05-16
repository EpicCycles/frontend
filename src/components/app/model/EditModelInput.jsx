import * as PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  BRAND,
  CHECKBOX,
  COUNTRY,
  CURRENCY,
  NUMBER,
  PART_TYPE,
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
    const originalValue = this.props.persistedModel
      ? this.props.persistedModel[this.props.field.fieldName]
      : undefined;
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
      suppliers,
    } = this.props;
    let editComponent;
    const fieldName = `${field.fieldName}_${componentKey}${index}`;
    const fieldValue = model && model[field.fieldName];
    const emptyAllowed = !(field.required && fieldValue);
    const error = model.error_detail ? model.error_detail[field.fieldName] : '';

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
            disabled={field.disabled}
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
            cols={Math.ceil(field.size / 4)}
            onClick={this.resetField}
            error={error}
            disabled={field.disabled}
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
          />
        );
        break;
      case NUMBER:
      case CURRENCY:
        editComponent = (
          <FormTextInput
            type="number"
            className={className}
            placeholder={field.header}
            error={error}
            fieldName={fieldName}
            value={fieldValue}
            onChange={this.validateOnChange}
            size={field.size}
            onClick={this.validateOnChange}
            maxLength={field.length}
            disabled={field.disabled}
          />
        );
        break;
      case CHECKBOX:
        const checked = !!fieldValue;
        editComponent = (
          <div className="align_center">
            <input
              type="checkbox"
              name={fieldName}
              onChange={() => this.validateOnChange(fieldName, !checked)}
              checked={checked}
              disabled={field.disabled}
              className={error ? 'red' : ''}
              title={error ? `${field.title} red` : field.title}
              data-test="model-checkbox"
            />
          </div>
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
            disabled={field.disabled}
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
            disabled={field.disabled}
            bikeOnly={field.bikeOnly}
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
            disabled={field.disabled}
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
            size={field.size}
            onClick={this.validateOnChange}
            maxLength={field.length}
            title={field.title}
            list={field.listId}
            disabled={field.disabled}
          />
        );
    }
    return <Fragment>{editComponent}</Fragment>;
  }
}
EditModelInput.defaultProps = {
  index: 1,
};
EditModelInput.propTypes = {
  field: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  persistedModel: PropTypes.object,
  className: PropTypes.string,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.number,
  sections: PropTypes.array,
  brands: PropTypes.array,
  suppliers: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  fittings: PropTypes.array,
};
export default EditModelInput;
