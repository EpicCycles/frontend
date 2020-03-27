import { TEXT } from '../../app/model/helpers/fields';
import {
  DESC_FIELD,
  TRADE_IN_FIELD,
  PART_PRICE_FIELD,
} from '../../quotePart/helpers/quotePartFields';
import { TOTAL_PRICE_FIELD } from '../../quote/helpers/quoteFields';
export const PART_TYPE_NAME_FIELD = {
  fieldName: 'partTypeName',
  header: 'Part / Charge',
  type: TEXT,
};
export const SECTION_NAME_FIELD = {
  fieldName: 'sectionName',
  header: '',
  type: TEXT,
};
const nonPriceFields = [SECTION_NAME_FIELD, PART_TYPE_NAME_FIELD, DESC_FIELD, TOTAL_PRICE_FIELD];
const priceFields = [
  SECTION_NAME_FIELD,
  PART_TYPE_NAME_FIELD,
  DESC_FIELD,
  PART_PRICE_FIELD,
  TOTAL_PRICE_FIELD,
];
const priceFieldsBike = [
  SECTION_NAME_FIELD,
  PART_TYPE_NAME_FIELD,
  DESC_FIELD,
  TRADE_IN_FIELD,
  PART_PRICE_FIELD,
  TOTAL_PRICE_FIELD,
];
export const quoteSummaryFields = (showPrices, bike) => {
  if (showPrices && bike) return priceFieldsBike;
  if (showPrices) return priceFields;
  return nonPriceFields;
};
