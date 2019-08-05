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
import { BIKE_PRICE_FIELD_REQUIRED, quoteFields } from './quoteFields';

describe('quoteFields', () => {
  it('should return non bike fields when not for issue and non bike quote', () => {
    const quote = { id: 23 };
    const results = quoteFields(quote, false);
    expect(results).toContainEqual(QUOTE_DESC_FIELD);
    expect(results).toContainEqual(CUSTOMER_FIELD);
    expect(results).toContainEqual(QUOTE_STATUS_FIELD);
    expect(results).toContainEqual(CLUB_MEMBER_FIELD);
    expect(results).toContainEqual(VERSION_FIELD);
    expect(results).toContainEqual(CREATED_BY_FIELD);
    expect(results).toContainEqual(CREATED_DATE_FIELD);
    expect(results).toContainEqual(UPD_DATE_FIELD);
    expect(results).toContainEqual(ISSUED_DATE_FIELD);
    expect(results).toContainEqual(CALCULATED_PRICE_FIELD);
  });
  it('should return bike fields when not for issue and non bike quote', () => {
    const quote = { id: 23, bike: 23 };
    const results = quoteFields(quote);
    expect(results).toContainEqual(QUOTE_DESC_FIELD);
    expect(results).toContainEqual(CUSTOMER_FIELD);
    expect(results).toContainEqual(QUOTE_STATUS_FIELD);
    expect(results).toContainEqual(CLUB_MEMBER_FIELD);
    expect(results).toContainEqual(VERSION_FIELD);
    expect(results).toContainEqual(CREATED_BY_FIELD);
    expect(results).toContainEqual(CREATED_DATE_FIELD);
    expect(results).toContainEqual(UPD_DATE_FIELD);
    expect(results).toContainEqual(ISSUED_DATE_FIELD);
    expect(results).toContainEqual(CALCULATED_PRICE_FIELD);
    expect(results).toContainEqual(BIKE_FIELD);
    expect(results).toContainEqual(BIKE_PRICE_FIELD);
    expect(results).toContainEqual(FRAME_SIZE_FIELD);
    expect(results).toContainEqual(COLOUR_FIELD);
    expect(results).toContainEqual(COLOUR_PRICE_FIELD);
  });
  it('should return quote price field when for issue and non bike quote', () => {
    const quote = { id: 23 };
    const results = quoteFields(quote, true);
    expect(results).toContainEqual(QUOTE_DESC_FIELD);
    expect(results).toContainEqual(CUSTOMER_FIELD);
    expect(results).toContainEqual(QUOTE_STATUS_FIELD);
    expect(results).toContainEqual(CLUB_MEMBER_FIELD);
    expect(results).toContainEqual(VERSION_FIELD);
    expect(results).toContainEqual(CREATED_BY_FIELD);
    expect(results).toContainEqual(CREATED_DATE_FIELD);
    expect(results).toContainEqual(UPD_DATE_FIELD);
    expect(results).toContainEqual(ISSUED_DATE_FIELD);
    expect(results).toContainEqual(CALCULATED_PRICE_FIELD);
    expect(results).toContainEqual(QUOTE_PRICE_FIELD);
  });
  it('should return bike fields when not for issue and non bike quote', () => {
    const quote = { id: 23, bike: 23 };
    const results = quoteFields(quote, true);
    expect(results).toContainEqual(QUOTE_DESC_FIELD);
    expect(results).toContainEqual(CUSTOMER_FIELD);
    expect(results).toContainEqual(QUOTE_STATUS_FIELD);
    expect(results).toContainEqual(CLUB_MEMBER_FIELD);
    expect(results).toContainEqual(VERSION_FIELD);
    expect(results).toContainEqual(CREATED_BY_FIELD);
    expect(results).toContainEqual(CREATED_DATE_FIELD);
    expect(results).toContainEqual(UPD_DATE_FIELD);
    expect(results).toContainEqual(ISSUED_DATE_FIELD);
    expect(results).toContainEqual(CALCULATED_PRICE_FIELD);
    expect(results).toContainEqual(BIKE_FIELD);
    expect(results).toContainEqual(BIKE_PRICE_FIELD_REQUIRED);
    expect(results).toContainEqual(FRAME_SIZE_FIELD);
    expect(results).toContainEqual(COLOUR_FIELD);
    expect(results).toContainEqual(COLOUR_PRICE_FIELD);
    expect(results).toContainEqual(QUOTE_PRICE_FIELD);
  });
});
