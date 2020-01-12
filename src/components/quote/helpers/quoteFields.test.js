import {
  BIKE_FIELD,
  CHECKBOX,
  CLUB_MEMBER,
  CLUB_MEMBER_FIELD,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  CURRENCY,
  CUSTOMER_FIELD,
  ISSUED_DATE_FIELD,
  TEXT,
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
  FRAME_SIZE,
  QUOTE_DESC,
  BIKE_PRICE,
  COLOUR,
  QUOTE_PRICE,
  FITTING_FIELD,
  FITTING,
} from './quoteFields';
import { updateObject } from '../../../helpers/utils';
import { QUOTE_ARCHIVED, QUOTE_ORDERED } from './quote';
import { VALUE_MISSING } from '../../app/model/helpers/error';

const bike = { id: 123, colours: 'red/blue/green', sizes: '50, 52, 54, 56' };
const expectedColourField = updateObject(COLOUR_FIELD, { placeholder: bike.colours });
const expectedSizeField = updateObject(FRAME_SIZE_FIELD, { placeholder: bike.sizes });

const BIKE_PRICE_FIELD_READONLY_REQD = {
  fieldName: BIKE_PRICE,
  header: 'Bike Price',
  type: CURRENCY,
  maxLength: 7,
  readOnly: true,
  required: true,
  displaySize: 10,
};
const COLOUR_FIELD_READONLY = {
  fieldName: COLOUR,
  header: 'Colour',
  type: TEXT,
  maxLength: 100,
  readOnly: true,
  displaySize: 20,
};
const FITTING_FIELD_READONLY = {
  fieldName: FITTING,
  header: 'Fitting',
  type: FITTING,
  readOnly: true,
};
const FRAME_SIZE_FIELD_READONLY = {
  fieldName: FRAME_SIZE,
  header: 'Frame Size',
  readOnly: true,
  type: TEXT,
};
const QUOTE_DESC_FIELD_READONLY = {
  fieldName: QUOTE_DESC,
  type: TEXT,
  displaySize: 40,
  maxLength: 60,
  required: true,
  readOnly: true,
  maxWidth: '250px',
  header: 'Description',
};

const QUOTE_PRICE_FIELD_READONLY = {
  fieldName: QUOTE_PRICE,
  header: 'Sub-total',
  synonyms: [],
  type: CURRENCY,
  displaySize: 7,
  maxLength: 10,
  required: true,
  readOnly: true,
  error: VALUE_MISSING,
};
const CLUB_MEMBER_FIELD_READONLY = {
  fieldName: CLUB_MEMBER,
  header: 'Club Member?',
  readOnly: true,
  type: CHECKBOX,
};

// possible parameters: quote, bike, pricesRequired, fieldExclusions
// field exclusions are (booleans - customer, status, history, bike, epic)
describe('quoteFields', () => {
  it('should return all fields read only for an archived quote', () => {
    const quote = { id: 23, bike: 123, quote_status: QUOTE_ARCHIVED };
    const callParameters = { quote, pricesRequired: true };
    const expectedFields = [
      QUOTE_DESC_FIELD_READONLY,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD_READONLY,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD_READONLY_REQD,
      FRAME_SIZE_FIELD_READONLY,
      COLOUR_FIELD_READONLY,
      FITTING_FIELD_READONLY,
      CALCULATED_PRICE_FIELD,
      QUOTE_PRICE_FIELD_READONLY,
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
  it('should return most fields read only for an ordered quote', () => {
    const quote = { id: 23, bike: 123, quote_status: QUOTE_ORDERED };
    const callParameters = { quote, pricesRequired: true };
    const expectedFields = [
      QUOTE_DESC_FIELD,
      VERSION_FIELD,
      CUSTOMER_FIELD,
      CLUB_MEMBER_FIELD,
      QUOTE_STATUS_FIELD,
      BIKE_FIELD,
      BIKE_PRICE_FIELD_READONLY_REQD,
      FRAME_SIZE_FIELD_READONLY,
      COLOUR_FIELD_READONLY,
      FITTING_FIELD,
      CALCULATED_PRICE_FIELD,
      QUOTE_PRICE_FIELD_READONLY,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
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
      FITTING_FIELD,
      QUOTE_PRICE_FIELD,
      TOTAL_PRICE_FIELD,
    ];
    expect(quoteFields(callParameters)).toEqual(expectedFields);
  });
});
