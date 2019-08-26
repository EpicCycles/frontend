import { CHECKBOX, TEXT, UPD_BY_FIELD, UPD_DATE_FIELD } from '../../app/model/helpers/fields';
import { VALUE_MISSING } from '../../app/model/helpers/error';
import { CHARGE } from '../../quote/helpers/quoteChargeFields';

export const QUESTION_FIELD = {
  fieldName: 'question',
  header: 'Question',
  required: true,
  error: VALUE_MISSING,
  type: TEXT,
  displaySize: 100,
  maxLength: 200,
  maxWidth: '150px',
};

export const CHARGE_FIELD = {
  fieldName: CHARGE,
  header: 'Charge Type',
  required: false,
  type: CHARGE,
};
export const BIKE_ONLY_FIELD = {
  fieldName: 'bike_only',
  header: 'Bike Quotes Only',
  type: CHECKBOX,
};

export const questionFields = [
  QUESTION_FIELD,
  CHARGE_FIELD,
  BIKE_ONLY_FIELD,
  UPD_BY_FIELD,
  UPD_DATE_FIELD,
];
