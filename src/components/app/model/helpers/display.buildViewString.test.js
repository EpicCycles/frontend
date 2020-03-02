import {
  BIKE,
  BRAND,
  CHECKBOX,
  CURRENCY,
  CUSTOMER,
  DATE_TIME,
  PART_TYPE,
  SELECT_ONE,
  SUPPLIER,
  TEXT,
} from './fields';
import { buildViewString } from './display';
import { COUNTRIES } from '../../../address/helpers/address';
import { getBikeName } from '../../../bike/helpers/bike';
import { sampleBikes, sampleFrames } from '../../../../helpers/sampleData';
import { FITTING } from '../../../quote/helpers/quoteFields';
import { fittingText } from '../../../fitting/helpers/fitting';

const foundName = 'find me';
const sections = [
  {
    id: 1,
    partTypes: [
      { id: 11, name: 'id 11' },
      { id: 21, name: 'id 11' },
    ],
  },
  {
    id: 2,
    partTypes: [
      { id: 2, name: foundName },
      { id: 22, name: 'id 11' },
    ],
  },
];
const brands = [
  { id: 1, brand_name: 'id is 1' },
  { id: 2, brand_name: foundName },
  { id: 3, brand_name: 'id is 3' },
];
const suppliers = [
  { id: 1, supplier_name: 'id is 1' },
  { id: 2, supplier_name: foundName },
  { id: 3, supplier_name: 'id is 3' },
];

describe('buildViewString', () => {
  it('should return a formatted date when a value is passed', () => {
    const field = {
      fieldName: 'data_field',
      type: DATE_TIME,
    };
    const model = { data_field: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) };
    expect(buildViewString(model, field)).toBe('12/20/2012, 3:00:00 AM');
  });
  it('it renders a date field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: DATE_TIME,
      maxLength: 10,
    };
    expect(buildViewString(undefined, field)).toBe('');
  });
  it('it renders a currency field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
    };
    const model = { data_field: 23.9 };
    expect(buildViewString(model, field)).toBe('£23.90');
  });
  it('it renders a currency field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
    };
    expect(buildViewString(undefined, field)).toBe('');
  });
  it('it renders a country field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: SELECT_ONE,
      selectList: COUNTRIES,
    };
    const model = { data_field: 'DE' };
    expect(buildViewString(model, field)).toBe('Germany');
  });
  it('it renders a country field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: SELECT_ONE,
      selectList: COUNTRIES,
    };
    expect(buildViewString(undefined, field)).toBe('');
  });
  it('it renders a text field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT,
      maxLength: 10,
    };
    const model = { data_field: 'Show text' };
    expect(buildViewString(model, field)).toBe('Show text');
  });
  it('it renders a text field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT,
      maxLength: 10,
    };
    expect(buildViewString(undefined, field)).toBe('');
  });
  it('it renders a checkbox field that is true', () => {
    const field = {
      fieldName: 'data_field',
      type: CHECKBOX,
    };
    const model = { data_field: true };
    expect(buildViewString(model, field)).toBe('Yes');
  });
  it('it renders a checkbox field that is false', () => {
    const field = {
      fieldName: 'data_field',
      type: CHECKBOX,
    };
    const model = { data_field: false };
    expect(buildViewString(model, field)).toBe('No');
  });
  it('it renders a checkbox field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: CHECKBOX,
      maxLength: 10,
    };
    expect(buildViewString(undefined, field)).toBe('No');
  });
  it('it renders a part type field that has data that is found', () => {
    const field = {
      fieldName: 'data_field',
      type: PART_TYPE,
      maxLength: 10,
    };
    const model = { data_field: 2 };
    expect(buildViewString(model, field, { sections })).toBe('find me');
  });
  it('it renders a part type field that has data that is not found', () => {
    const field = {
      fieldName: 'data_field',
      type: PART_TYPE,
      maxLength: 10,
    };
    const model = { data_field: 202 };
    expect(buildViewString(model, field, { sections })).toBe('Unknown Part Type');
  });
  it('it renders a part Type field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: PART_TYPE,
      maxLength: 10,
    };
    expect(buildViewString(undefined, field, { sections })).toBe('');
  });
  it('it renders a brand field that has data that is found', () => {
    const field = {
      fieldName: 'data_field',
      type: BRAND,
      maxLength: 10,
    };
    const model = { data_field: 2 };
    expect(buildViewString(model, field, { brands })).toBe('find me');
  });
  it('it renders a brand field that has data that is not found', () => {
    const field = {
      fieldName: 'data_field',
      type: BRAND,
    };
    const model = { data_field: 202 };
    expect(buildViewString(model, field, { brands })).toBe('Unknown Brand');
  });
  it('it renders a brand field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: BRAND,
    };
    expect(buildViewString(undefined, field, { brands })).toBe('');
  });
  it('it renders a supplier field that has data that is found', () => {
    const field = {
      fieldName: 'data_field',
      type: SUPPLIER,
      maxLength: 10,
    };
    const model = { data_field: 2 };
    expect(buildViewString(model, field, { suppliers })).toBe('find me');
  });
  it('it renders a supplier field that has data that is not found', () => {
    const field = {
      fieldName: 'data_field',
      type: SUPPLIER,
    };
    const model = { data_field: 202 };
    expect(buildViewString(model, field, { suppliers })).toBe('Unknown Supplier');
  });
  it('it renders a supplier field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: SUPPLIER,
    };
    expect(buildViewString(undefined, field, { suppliers })).toBe('');
  });
  it('should return bike name when a bike is passed that is found', () => {
    const field = {
      fieldName: 'bike',
      type: BIKE,
    };
    const model = { bike: 58 };
    const expectedBike = getBikeName(58, sampleBikes, sampleFrames);
    expect(
      buildViewString(model, field, {
        bikes: sampleBikes,
        frames: sampleFrames,
      }),
    ).toBe(expectedBike);
  });
  it('should return customer name when a customer is passed that is found', () => {
    const field = {
      fieldName: 'customer',
      type: CUSTOMER,
    };
    const model = { customer: 34 };
    const customers = [{ id: 34, first_name: 'Bob' }];
    expect(buildViewString(model, field, { customers })).toBe('Bob');
  });
  describe('view fitting data', () => {
    const fittings = [
      { id: 12, type: 'C', saddle: '55cm', bar: '67cm, ', reach: '50cm' },
      { id: 14, type: 'C', saddle: '55cm', bar: '67cm, ', reach: '50cm' },
    ];
    it('it renders a fitting field that has data that is found', () => {
      const field = {
        fieldName: 'data_field',
        type: FITTING,
      };
      const model = { data_field: 12 };
      expect(buildViewString(model, field, { fittings })).toBe(fittingText(fittings[0]));
    });
    it('it renders a fitting field that has data that is not found', () => {
      const field = {
        fieldName: 'data_field',
        type: FITTING,
      };
      const model = { data_field: 202 };
      expect(buildViewString(model, field, { fittings })).toBe('');
    });
    it('it renders a fitting field that has no data', () => {
      const field = {
        fieldName: 'data_field',
        type: FITTING,
      };
      expect(buildViewString(undefined, field, { fittings })).toBe('');
    });
  });
});
