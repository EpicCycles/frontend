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
  header: 'Quote £',
  synonyms: [],
  type: CURRENCY,
  displaySize: 7,
  maxLength: 10,
  required: true,
  error: VALUE_MISSING,
};
export const CALCULATED_PRICE_FIELD = {
  fieldName: CALCULATED_PRICE,
  header: 'Sub-total',
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
export const bikeRelatedFields = [BIKE_FIELD, BIKE_PRICE_FIELD, FRAME_SIZE_FIELD, COLOUR_FIELD];
export const bikeRelatedFieldsComplete = [
  BIKE_FIELD,
  BIKE_PRICE_FIELD_REQUIRED,
  FRAME_SIZE_FIELD,
  COLOUR_FIELD,
];
const quoteFieldsBasic = [
  QUOTE_DESC_FIELD,
  CUSTOMER_FIELD,
  QUOTE_STATUS_FIELD,
  CLUB_MEMBER_FIELD,
  VERSION_FIELD,
];
const quoteFieldsNoPrice = [
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  UPD_DATE_FIELD,
  ISSUED_DATE_FIELD,
  CALCULATED_PRICE_FIELD,
  TOTAL_PRICE_FIELD,
];
const quoteFieldsComplete = [
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  UPD_DATE_FIELD,
  ISSUED_DATE_FIELD,
  QUOTE_PRICE_FIELD,
  CALCULATED_PRICE_FIELD,
  TOTAL_PRICE_FIELD,
];
const quoteFieldsBike = quoteFieldsBasic.concat(bikeRelatedFields.concat(quoteFieldsNoPrice));
const quoteFieldsBikeComplete = quoteFieldsBasic
  .concat(bikeRelatedFieldsComplete)
  .concat(quoteFieldsComplete);

export const quoteFields = (quote, readyToIssue, bike, customerView) => {
  if (!quote) return quoteFieldsBikeComplete;
  if (customerView)
    return [
      QUOTE_DESC_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_PRICE_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      FRAME_SIZE_FIELD,
      COLOUR_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
    ];
  if (quote.bike) {
    if (bike) {
      let priceField = BIKE_PRICE_FIELD;
      let sizeField = FRAME_SIZE_FIELD;
      let colourField = COLOUR_FIELD;
      if (readyToIssue) priceField = BIKE_PRICE_FIELD_REQUIRED;
      if (bike.sizes) sizeField = updateObject(FRAME_SIZE_FIELD, { placeholder: bike.sizes });
      if (bike.colours) colourField = updateObject(COLOUR_FIELD, { placeholder: bike.colours });
      const bikeFieldsSpecific = [BIKE_FIELD, priceField, sizeField, colourField];
      if (readyToIssue)
        return quoteFieldsBasic.concat(bikeFieldsSpecific.concat(quoteFieldsComplete));
      return quoteFieldsBasic.concat(bikeFieldsSpecific.concat(quoteFieldsNoPrice));
    }
    if (readyToIssue) return quoteFieldsBikeComplete;
    return quoteFieldsBike;
  }
  if (readyToIssue) return quoteFieldsBasic.concat(quoteFieldsComplete);
  return quoteFieldsBasic.concat(quoteFieldsNoPrice);
};
