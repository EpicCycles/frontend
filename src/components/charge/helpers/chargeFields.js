import { CURRENCY, TEXT, UPD_BY_FIELD, UPD_DATE_FIELD } from '../../app/model/helpers/fields';
import { VALUE_MISSING } from '../../app/model/helpers/error';

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
export const PRICE_FIELD = {
  fieldName: 'price',
  header: 'Price £',
  type: CURRENCY,
  required: true,
  error: VALUE_MISSING,
  displaySize: 6,
  maxLength: 10,
};
export const chargeFields = [CHARGE_NAME_FIELD, PRICE_FIELD, UPD_BY_FIELD, UPD_DATE_FIELD];
