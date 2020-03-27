import {
  DESC_FIELD,
  PART_PRICE_FIELD,
  TRADE_IN_FIELD,
} from '../../quotePart/helpers/quotePartFields';
import { PART_TYPE_NAME_FIELD, quoteSummaryFields, SECTION_NAME_FIELD } from './quoteSummaryFields';
import { TOTAL_PRICE_FIELD } from '../../quote/helpers/quoteFields';

describe('quoteSummaryHeaders', () => {
  it('should show just part and part type when it is not clear if prices are required', () => {
    const results = quoteSummaryFields();
    expect(results).toEqual([
      SECTION_NAME_FIELD,
      PART_TYPE_NAME_FIELD,
      DESC_FIELD,
      TOTAL_PRICE_FIELD,
    ]);
  });
  it('should show just part and part type when prices are not required', () => {
    const results = quoteSummaryFields(false);
    expect(results).toEqual([
      SECTION_NAME_FIELD,
      PART_TYPE_NAME_FIELD,
      DESC_FIELD,
      TOTAL_PRICE_FIELD,
    ]);
  });
  it('should show all fields when prices are required', () => {
    const results = quoteSummaryFields(true);
    expect(results).toEqual([
      SECTION_NAME_FIELD,
      PART_TYPE_NAME_FIELD,
      DESC_FIELD,
      PART_PRICE_FIELD,
      TOTAL_PRICE_FIELD,
    ]);
  });
  it('should show all fields when prices are required and bike exists', () => {
    const results = quoteSummaryFields(true, 12);
    expect(results).toEqual([
      SECTION_NAME_FIELD,
      PART_TYPE_NAME_FIELD,
      DESC_FIELD,
      TRADE_IN_FIELD,
      PART_PRICE_FIELD,
      TOTAL_PRICE_FIELD,
    ]);
  });
});
