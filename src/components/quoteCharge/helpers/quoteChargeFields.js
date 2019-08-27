import { PRICE_FIELD } from '../../charge/helpers/chargeFields';
import { VALUE_MISSING } from '../../app/model/helpers/error';

export const CHARGE = 'charge';
export const CHARGE_FIELD = {
  fieldName: CHARGE,
  header: 'Charge Type',
  required: true,
  error: VALUE_MISSING,
  type: CHARGE,
};
export const quoteChargeFields = [CHARGE_FIELD, PRICE_FIELD];
