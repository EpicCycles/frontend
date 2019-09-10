import {
  BIKE_FIELD,
  CLUB_MEMBER_FIELD,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  CUSTOMER_FIELD,
  ISSUED_DATE_FIELD,
  UPD_DATE_FIELD,
} from '../../app/model/helpers/fields';
import {
  BIKE_PRICE_FIELD,
  BIKE_PRICE_FIELD_REQUIRED,
  CALCULATED_PRICE_FIELD,
  COLOUR_FIELD,
  TOTAL_PRICE_FIELD,
  FRAME_SIZE_FIELD,
  QUOTE_DESC_FIELD,
  QUOTE_PRICE_FIELD,
  QUOTE_STATUS_FIELD,
  quoteFields,
  VERSION_FIELD,
  FIXED_PRICE_FIELD,
  CHARGE_TOTAL_FIELD,
} from './quoteFields';
import { updateObject } from '../../../helpers/utils';

const bike = { id: 123, colours: 'red/blue/green', sizes: '50, 52, 54, 56' };
const expectedColourField = updateObject(COLOUR_FIELD, { placeholder: bike.colours });
const expectedSizeField = updateObject(FRAME_SIZE_FIELD, { placeholder: bike.sizes });

// possible parameters: quote, bike, pricesRequired, fieldExclusions
// field exclusions are (booleans - customer, status, history, bike, epic)
describe('quoteFields', () => {
  it('should return non bike fields when not for issue and non bike quote', () => {
    const quote = { id: 23 };
    const callParameters = { quote };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should return bike fields when not for issue and bike quote', () => {
    const quote = { id: 23, bike: 23 };
    const callParameters = { quote };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      FRAME_SIZE_FIELD,
      COLOUR_FIELD,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should return quote price field when for issue and non bike quote', () => {
    const quote = { id: 23 };
    const callParameters = { quote, pricesRequired: true };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      CALCULATED_PRICE_FIELD,
      QUOTE_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should return reqd price field when for issue and bike quote', () => {
    const quote = { id: 23, bike: 123 };
    const callParameters = { quote, pricesRequired: true };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD_REQUIRED,
      FRAME_SIZE_FIELD,
      COLOUR_FIELD,
      CALCULATED_PRICE_FIELD,
      QUOTE_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should return basic fields when a bike has no values for placeholders', () => {
    const quote = { id: 23, bike: 123 };
    const bikeNoPlaceholders = { id: 123 };
    const callParameters = { quote, bike: bikeNoPlaceholders };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      FRAME_SIZE_FIELD,
      COLOUR_FIELD,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should return edited fields when a bike has values for placeholders', () => {
    const quote = { id: 23, bike: 123 };
    const callParameters = { quote, bike };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      expectedSizeField,
      expectedColourField,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should exclude customer fields when required', () => {
    const quote = { id: 23, bike: 123 };
    const fieldExclusions = { customer: true };
    const callParameters = { quote, bike, fieldExclusions };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      // CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      expectedSizeField,
      expectedColourField,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should exclude history fields when required', () => {
    const quote = { id: 23, bike: 123 };
    const fieldExclusions = { history: true };
    const callParameters = { quote, bike, fieldExclusions };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      expectedSizeField,
      expectedColourField,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should exclude status fields when required', () => {
    const quote = { id: 23, bike: 123 };
    const fieldExclusions = { status: true };
    const callParameters = { quote, bike, fieldExclusions };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD,
      expectedSizeField,
      expectedColourField,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should exclude bike fields when required', () => {
    const quote = { id: 23, bike: 123 };
    const fieldExclusions = { bike: true };
    const callParameters = { quote, bike, fieldExclusions };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      CALCULATED_PRICE_FIELD,
      FIXED_PRICE_FIELD,
      CHARGE_TOTAL_FIELD,
      TOTAL_PRICE_FIELD,
      UPD_DATE_FIELD,
      ISSUED_DATE_FIELD,
      CREATED_BY_FIELD,
      CREATED_DATE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
  it('should exclude non customer facing fields when required', () => {
    const quote = { id: 23, bike: 123 };
    const fieldExclusions = { epic: true, customer: true, status: true, history: true };
    const callParameters = { quote, bike, pricesRequired: true, fieldExclusions };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CLUB_MEMBER_FIELD,
      BIKE_FIELD,
      expectedSizeField,
      expectedColourField,
      QUOTE_PRICE_FIELD,
      TOTAL_PRICE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
});
