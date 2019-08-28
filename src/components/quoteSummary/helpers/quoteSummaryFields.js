import { QUANTITY_FIELD, TEXT, TRADE_IN_PRICE_FIELD } from '../../app/model/helpers/fields';
import { PART_DESC_FIELD, PART_PRICE_FIELD } from '../../quotePart/helpers/quotePartFields';
import { TOTAL_PRICE_FIELD } from '../../quote/helpers/quoteFields';
export const PART_TYPE_NAME_FIELD = {
  fieldName: 'partTypeName',
  header: 'Part Type',
  type: TEXT,
};
export const SECTION_NAME_FIELD = {
  fieldName: 'sectionName',
  header: 'Section',
  type: TEXT,
};
const nonPriceFields = [
  SECTION_NAME_FIELD,
  PART_TYPE_NAME_FIELD,
  PART_DESC_FIELD,
  TOTAL_PRICE_FIELD,
];
const priceFields = [
  SECTION_NAME_FIELD,
  PART_TYPE_NAME_FIELD,
  PART_DESC_FIELD,
  TRADE_IN_PRICE_FIELD,
  PART_PRICE_FIELD,
  TOTAL_PRICE_FIELD,
];
export const quoteSummaryFields = showPrices => {
  if (showPrices) return priceFields;
  return nonPriceFields;
};
