import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  BRAND,
  CHECKBOX,
  COUNTRY,
  CURRENCY,
  EMAIL,
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
import { CHARGE } from '../../quoteCharge/helpers/quoteChargeFields';
import { chargeOptions } from '../../charge/helpers/chargeOptions';
import FittingSelect from '../../fitting/FittingSelect';
import { FITTING } from '../../quote/helpers/quoteFields';

const EditModelInput = props => {
  const validateOnChange = (fieldName, fieldValue) => {
    const { field, componentKey, onChange } = props;
    if (fieldValue || field.type === CHECKBOX) {
      onChange(field.fieldName, fieldValue, componentKey);
    } else {
      onChange(field.fieldName, '', componentKey);
    }
  };
  const resetField = fieldName => {
    const originalValue = props.persistedModel[props.field.fieldName];
    validateOnChange(fieldName, originalValue);
  };

  const { field, model, className, componentKey, index, sourceDataArrays } = props;
  const { sections, brands, charges, suppliers, fittings } = sourceDataArrays;
  let editComponent;
  const fieldName = `${field.fieldName}${componentKey}${index}`;
  let fieldValue = model[field.fieldName];
  if (fieldValue === null) fieldValue = undefined;
  const emptyAllowed = !(field.required && fieldValue);
  const error = model.error_detail ? model.error_detail[field.fieldName] : '';
  const readOnly = field.readOnlyFunction && field.readOnlyFunction(model);
  const disabled = model.deleted || field.disabled || readOnly;

  switch (field.type) {
    case SELECT_ONE:
      editComponent = (
        <SelectInput
          className={className}
          fieldName={fieldName}
          value={fieldValue}
          onChange={validateOnChange}
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
          onChange={validateOnChange}
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
          onChange={validateOnChange}
          cols={Math.min(50, Math.ceil(field.displaySize / 4))}
          onClick={resetField}
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
          onChange={validateOnChange}
          isEmptyAllowed={emptyAllowed}
          disabled={disabled}
        />
      );
      break;
    case NUMBER:
    case CURRENCY:
      const displayValue = fieldValue === undefined ? '' : fieldValue.toString();
      editComponent = (
        <FormTextInput
          className={className}
          dataType="number"
          placeholder={field.header}
          error={error}
          fieldName={fieldName}
          value={displayValue}
          onChange={validateOnChange}
          size={field.displaySize}
          onClick={validateOnChange}
          maxLength={field.maxLength}
          disabled={disabled}
          inputClass={'align_right'}
        />
      );
      break;
    case EMAIL:
      editComponent = (
        <FormTextInput
          className={className}
          dataType="email"
          placeholder={field.header}
          error={error}
          fieldName={fieldName}
          value={fieldValue}
          onChange={validateOnChange}
          size={field.displaySize}
          onClick={validateOnChange}
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
          onChange={validateOnChange}
          size={field.displaySize}
          onClick={validateOnChange}
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
          onChange={() => validateOnChange(fieldName, !checked)}
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
          onChange={validateOnChange}
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
          onChange={validateOnChange}
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
          onChange={validateOnChange}
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
          onChange={validateOnChange}
          supplierSelected={fieldValue}
          isEmptyAllowed={emptyAllowed}
          error={error}
          disabled={disabled}
        />
      );
      break;
    case FITTING:
      editComponent = (
        <FittingSelect
          fieldName={fieldName}
          selectFitting={validateOnChange}
          fittings={fittings}
          selectedFitting={fieldValue}
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
          onChange={validateOnChange}
          fieldName={fieldName}
          value={fieldValue}
          size={field.displaySize}
          onClick={validateOnChange}
          maxLength={field.maxLength}
          title={field.title || field.placeholder}
          list={field.listId}
          disabled={disabled}
        />
      );
  }
  return <Fragment>{editComponent}</Fragment>;
};
EditModelInput.defaultProps = {
  index: '',
  model: {},
  persistedModel: {},
  sourceDataArrays: {},
};
EditModelInput.propTypes = {
  field: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  persistedModel: PropTypes.object,
  className: PropTypes.string,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
export default EditModelInput;
