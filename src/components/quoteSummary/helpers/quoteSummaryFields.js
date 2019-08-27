import {
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  TRADE_IN_PRICE_FIELD,
} from '../../app/model/helpers/fields';
import { PART_DESC_FIELD, PART_PRICE_FIELD } from '../../quotePart/helpers/quotePartFields';

const nonPriceFields = [PART_TYPE_FIELD, PART_DESC_FIELD];
const priceFields = nonPriceFields.concat([QUANTITY_FIELD, PART_PRICE_FIELD, TRADE_IN_PRICE_FIELD]);
export const quoteSummaryFields = showPrices => {
  if (showPrices) return priceFields;
  return nonPriceFields;
};
