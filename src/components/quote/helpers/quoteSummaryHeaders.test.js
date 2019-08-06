import {
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  TRADE_IN_PRICE_FIELD,
} from '../../app/model/helpers/fields';
import { PART_DESC_FIELD, PART_PRICE_FIELD } from './quotePartFields';
import { quoteSummaryHeaders } from './quoteSummaryHeaders';

describe('quoteSummaryHeaders', () => {
  it('should show just part and part type when it is not clear if prices are required', () => {
    const results = quoteSummaryHeaders();
    expect(results).toContainEqual(PART_TYPE_FIELD);
    expect(results).toContainEqual(PART_DESC_FIELD);
    expect(results).not.toContainEqual(QUANTITY_FIELD);
    expect(results).not.toContainEqual(PART_PRICE_FIELD);
    expect(results).not.toContainEqual(TRADE_IN_PRICE_FIELD);
  });
  it('should show just part and part type when prices are not required', () => {
    const results = quoteSummaryHeaders(false);
    expect(results).toContainEqual(PART_TYPE_FIELD);
    expect(results).toContainEqual(PART_DESC_FIELD);
    expect(results).not.toContainEqual(QUANTITY_FIELD);
    expect(results).not.toContainEqual(PART_PRICE_FIELD);
    expect(results).not.toContainEqual(TRADE_IN_PRICE_FIELD);
  });
  it('should show all fields when prices are required', () => {
    const results = quoteSummaryHeaders(true);
    expect(results).toContainEqual(PART_TYPE_FIELD);
    expect(results).toContainEqual(PART_DESC_FIELD);
    expect(results).toContainEqual(QUANTITY_FIELD);
    expect(results).toContainEqual(PART_PRICE_FIELD);
    expect(results).toContainEqual(TRADE_IN_PRICE_FIELD);
  });
});
