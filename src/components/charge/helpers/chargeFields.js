import {
  CHECKBOX,
  CURRENCY,
  TEXT,
  UPD_BY_FIELD,
  UPD_DATE_FIELD,
} from '../../app/model/helpers/fields';
import { VALUE_MISSING } from '../../app/model/helpers/error';
import { postUpdateProcessingCharge } from './postUpdateProcessingCharge';
import { percentageValidator } from '../../app/model/helpers/percentageValidator';

export const CHARGE_NAME_FIELD = {
  fieldName: 'charge_name',
  header: 'Charge Type',
  required: true,
  error: VALUE_MISSING,
  type: TEXT,
  displaySize: 40,
  maxLength: 100,
  maxWidth: '100px',
};
export const PERCENTAGE_FIELD = {
  fieldName: 'percentage',
  header: 'Percent charged',
  type: CURRENCY,
  addDataMethod: postUpdateProcessingCharge,
  validator: percentageValidator,
  displaySize: 5,
  maxLength: 5,
};
export const PRICE_FIELD = {
  fieldName: 'price',
  header: 'Price Charged',
  type: CURRENCY,
  addDataMethod: postUpdateProcessingCharge,
  displaySize: 6,
  maxLength: 10,
};
export const FIXED_CHARGE_FIELD = {
  fieldName: 'fixed_charge',
  header: 'Fixed Charge',
  type: CHECKBOX,
};
export const CAN_BE_ZERO_FIELD = {
  fieldName: 'can_be_zero',
  header: 'Can Be Zero',
  type: CHECKBOX,
};
export const chargeFields = [
  CHARGE_NAME_FIELD,
  PRICE_FIELD,
  PERCENTAGE_FIELD,
  FIXED_CHARGE_FIELD,
  CAN_BE_ZERO_FIELD,
  UPD_BY_FIELD,
  UPD_DATE_FIELD,
];
