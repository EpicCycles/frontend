import {
  getDefaultFieldValue
} from '../../../../components/app/model/helpers/getDefaultFieldValue';
import {
  CHECKBOX,
  IN_USE,
  NUMBER_TYPE,
  QUOTE_STATUS,
  SELECT_ONE,
  TEXT,
} from '../../../../components/app/model/helpers/fields';
import {
  QUOTE_ARCHIVED,
  QUOTE_INITIAL,
  QUOTE_ISSUED,
  QUOTE_ORDERED,
} from '../../../../components/quote/helpers/quote';

describe('getDefaultFieldValue', () => {
  it('should return no value when a field has no default', () => {
    const modelField = {
      fieldName: 'first_name',
      type: TEXT,
      displaySize: 20,
      maxLength: 60,
      header: 'First Name',
      synonyms: [],
      required: true,
    };
    expect(getDefaultFieldValue(modelField)).toBeUndefined();
  });
  it('should return no value when a select field has no default', () => {
    const modelField = {
      fieldName: QUOTE_STATUS,
      type: SELECT_ONE,
      readOnly: true,
      header: 'Status',
      selectList: [
        { value: QUOTE_INITIAL, name: 'New' },
        { value: QUOTE_ISSUED, name: 'Issued' },
        { value: QUOTE_ARCHIVED, name: 'Archived' },
        { value: QUOTE_ORDERED, name: 'Order Created' },
      ],
    };
    expect(getDefaultFieldValue(modelField)).toBeUndefined();
  });
  it('should return default value when a field has a default', () => {
    const modelField = {
      fieldName: IN_USE,
      type: CHECKBOX,
      header: 'In Use',
      default: true,
    };
    expect(getDefaultFieldValue(modelField)).toBeTruthy();
  });
  it('should return default value when a select field has a default', () => {
    const modelField = {
      fieldName: NUMBER_TYPE,
      header: 'Type',
      type: SELECT_ONE,
      selectList: [
        { name: 'Home', value: 'H', isDefault: true },
        { name: 'Work', value: 'M' },
        { name: 'Mobile', value: 'W' },
      ],
    };
    expect(getDefaultFieldValue(modelField)).toBe('H');
  });
});
