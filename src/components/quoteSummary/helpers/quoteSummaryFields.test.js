import {
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  TRADE_IN_PRICE_FIELD,
} from '../../app/model/helpers/fields';
import { PART_DESC_FIELD, PART_PRICE_FIELD } from '../../quotePart/helpers/quotePartFields';
import { quoteSummaryFields } from './quoteSummaryFields';

describe('quoteSummaryHeaders', () => {
  it('should show just part and part type when it is not clear if prices are required', () => {
    const results = quoteSummaryFields();
    expect(results).toContainEqual(PART_TYPE_FIELD);
    expect(results).toContainEqual(PART_DESC_FIELD);
    expect(results).not.toContainEqual(QUANTITY_FIELD);
    expect(results).not.toContainEqual(PART_PRICE_FIELD);
    expect(results).not.toContainEqual(TRADE_IN_PRICE_FIELD);
  });
  it('should show just part and part type when prices are not required', () => {
    const results = quoteSummaryFields(false);
    expect(results).toContainEqual(PART_TYPE_FIELD);
    expect(results).toContainEqual(PART_DESC_FIELD);
    expect(results).not.toContainEqual(QUANTITY_FIELD);
    expect(results).not.toContainEqual(PART_PRICE_FIELD);
    expect(results).not.toContainEqual(TRADE_IN_PRICE_FIELD);
  });
  it('should show all fields when prices are required', () => {
    const results = quoteSummaryFields(true);
    expect(results).toContainEqual(PART_TYPE_FIELD);
    expect(results).toContainEqual(PART_DESC_FIELD);
    expect(results).toContainEqual(QUANTITY_FIELD);
    expect(results).toContainEqual(PART_PRICE_FIELD);
    expect(results).toContainEqual(TRADE_IN_PRICE_FIELD);
  });
});
