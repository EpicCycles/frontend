import {
  BIKE_FIELD,
  BIKE_PRICE_FIELD,
  CALCULATED_PRICE_FIELD,
  CLUB_MEMBER_FIELD,
  COLOUR_FIELD,
  COLOUR_PRICE_FIELD,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  CUSTOMER_FIELD,
  FRAME_SIZE_FIELD,
  ISSUED_DATE_FIELD,
  QUOTE_DESC_FIELD,
  QUOTE_PRICE_FIELD,
  QUOTE_STATUS_FIELD,
  UPD_DATE_FIELD,
  VERSION_FIELD,
} from '../../app/model/helpers/fields';
import { updateObject } from '../../../helpers/utils';
const requiredAttribute = { required: true };

export const BIKE_PRICE_FIELD_REQUIRED = updateObject(BIKE_PRICE_FIELD, requiredAttribute);
export const bikeRelatedFields = [
  BIKE_FIELD,
  BIKE_PRICE_FIELD,
  FRAME_SIZE_FIELD,
  COLOUR_FIELD,
  COLOUR_PRICE_FIELD,
];
export const bikeRelatedFieldsComplete = [
  BIKE_FIELD,
  BIKE_PRICE_FIELD_REQUIRED,
  FRAME_SIZE_FIELD,
  COLOUR_FIELD,
  COLOUR_PRICE_FIELD,
];
export const quoteFieldsNoPrice = [
  QUOTE_DESC_FIELD,
  CUSTOMER_FIELD,
  QUOTE_STATUS_FIELD,
  CLUB_MEMBER_FIELD,
  VERSION_FIELD,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  UPD_DATE_FIELD,
  ISSUED_DATE_FIELD,
  CALCULATED_PRICE_FIELD,
];
export const quoteFieldsComplete = [
  QUOTE_DESC_FIELD,
  CUSTOMER_FIELD,
  QUOTE_STATUS_FIELD,
  CLUB_MEMBER_FIELD,
  VERSION_FIELD,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  UPD_DATE_FIELD,
  ISSUED_DATE_FIELD,
  QUOTE_PRICE_FIELD,
  CALCULATED_PRICE_FIELD,
];
export const quoteFieldsBike = quoteFieldsNoPrice.concat(bikeRelatedFields);
export const quoteFieldsBikeComplete = quoteFieldsComplete.concat(bikeRelatedFieldsComplete);

export const quoteFields = (quote, readyToIssue) => {
  if (quote.bike) {
    if (readyToIssue) return quoteFieldsBikeComplete;
    return quoteFieldsBike;
  }
  if (readyToIssue) return quoteFieldsComplete;
  return quoteFieldsNoPrice;
};
