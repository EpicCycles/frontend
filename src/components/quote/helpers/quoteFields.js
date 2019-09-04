import {
  BIKE_FIELD,
  CLUB_MEMBER_FIELD,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  CURRENCY,
  CUSTOMER_FIELD,
  ISSUED_DATE_FIELD,
  NUMBER,
  SELECT_ONE,
  TEXT,
  UPD_DATE_FIELD,
} from '../../app/model/helpers/fields';
import { updateObject } from '../../../helpers/utils';
import { VALUE_MISSING } from '../../app/model/helpers/error';
import { QUOTE_STATUS_CHOICES } from './quote';

const requiredAttribute = { required: true };

export const BIKE_PRICE = 'bike_price';
export const COLOUR = 'colour';
export const FRAME_SIZE = 'frame_size';
export const QUOTE_DESC = 'quote_desc';
export const QUOTE_PRICE = 'quote_price';
export const CALCULATED_PRICE = 'calculated_price';
export const TOTAL_PRICE = 'total_price';
export const QUOTE_STATUS = 'quote_status';
export const VERSION = 'version';
export const BIKE_PRICE_FIELD = {
  fieldName: BIKE_PRICE,
  header: 'Bike Price',
  type: CURRENCY,
  maxLength: 7,
  displaySize: 10,
};
export const COLOUR_FIELD = {
  fieldName: COLOUR,
  header: 'Colour',
  type: TEXT,
  maxLength: 100,
  displaySize: 20,
};
export const FRAME_SIZE_FIELD = {
  fieldName: FRAME_SIZE,
  header: 'Frame Size',
  type: TEXT,
};
export const QUOTE_DESC_FIELD = {
  fieldName: QUOTE_DESC,
  type: TEXT,
  displaySize: 40,
  maxLength: 60,
  required: true,
  maxWidth: '250px',
  header: 'Description',
};
export const QUOTE_STATUS_FIELD = {
  fieldName: QUOTE_STATUS,
  type: SELECT_ONE,
  readOnly: true,
  header: 'Status',
  selectList: QUOTE_STATUS_CHOICES,
};
export const QUOTE_PRICE_FIELD = {
  fieldName: QUOTE_PRICE,
  header: 'Sub-total',
  synonyms: [],
  type: CURRENCY,
  displaySize: 7,
  maxLength: 10,
  required: true,
  error: VALUE_MISSING,
};
export const CALCULATED_PRICE_FIELD = {
  fieldName: CALCULATED_PRICE,
  header: 'Calculated sub-total',
  readOnly: true,
  type: CURRENCY,
};
export const TOTAL_PRICE_FIELD = {
  fieldName: TOTAL_PRICE,
  header: 'Total',
  readOnly: true,
  type: CURRENCY,
};
export const VERSION_FIELD = {
  fieldName: VERSION,
  type: NUMBER,
  header: 'Version',
  readOnly: true,
};
export const BIKE_PRICE_FIELD_REQUIRED = updateObject(BIKE_PRICE_FIELD, requiredAttribute);
// possible parameters: quote, bike, pricesRequired, fieldExclusions
// field exclusions are (booleans - customer, status, history, bike)
export const quoteFields = p => {
  const { quote, bike, pricesRequired, fieldExclusions } = p;

  const excludeCustomer = fieldExclusions && fieldExclusions.customer;
  const excludeStatus = fieldExclusions && fieldExclusions.status;
  const excludeHistory = fieldExclusions && fieldExclusions.history;
  const excludeBike = (fieldExclusions && fieldExclusions.bike) || (quote && !quote.bike);
  const excludeEpic = fieldExclusions && fieldExclusions.epic;
  const fields = [QUOTE_DESC_FIELD, VERSION_FIELD];
  if (!excludeCustomer) fields.push(CUSTOMER_FIELD);
  fields.push(CLUB_MEMBER_FIELD);
  if (!excludeStatus) fields.push(QUOTE_STATUS_FIELD);
  if (!excludeBike) {
    fields.push(BIKE_FIELD);
    if (!excludeEpic) {
      if (pricesRequired) fields.push(BIKE_PRICE_FIELD_REQUIRED);
      else fields.push(BIKE_PRICE_FIELD);
    }
    if (bike && bike.sizes)
      fields.push(updateObject(FRAME_SIZE_FIELD, { placeholder: bike.sizes }));
    else fields.push(FRAME_SIZE_FIELD);
    if (bike && bike.colours)
      fields.push(updateObject(COLOUR_FIELD, { placeholder: bike.colours }));
    else fields.push(COLOUR_FIELD);
  }
  if (!excludeEpic) fields.push(CALCULATED_PRICE_FIELD);
  if (pricesRequired) fields.push(QUOTE_PRICE_FIELD);
  fields.push(TOTAL_PRICE_FIELD);
  if (!excludeHistory) {
    fields.push(UPD_DATE_FIELD);
    fields.push(ISSUED_DATE_FIELD);
    fields.push(CREATED_BY_FIELD);
    fields.push(CREATED_DATE_FIELD);
  }

  return fields;
};
