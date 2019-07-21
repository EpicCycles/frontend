import {
  BRAND_FIELD,
  customerAddressFields,
  DESCRIPTION_FIELD,
  FRAME_NAME_FIELD,
  RRP_FIELD,
  SELECT_MULTIPLE,
} from '../../../../components/app/model/helpers/fields';
import { checkForChanges } from '../../../../components/app/model/helpers/model';

const fieldListForTest = [BRAND_FIELD, RRP_FIELD, DESCRIPTION_FIELD, FRAME_NAME_FIELD];
describe('model.checkForChanges', () => {
  it('no field values returns false', () => {
    const existingObject = {};
    const newValues = {};
    expect(checkForChanges(fieldListForTest, existingObject, newValues)).toBeFalsy();
  });
  it('no field changes returns false', () => {
    const existingObject = {};
    const newValues = {};
    existingObject[BRAND_FIELD.fieldName] = 'Brand 1;';
    newValues[BRAND_FIELD.fieldName] = 'Brand 1;';
    expect(checkForChanges(fieldListForTest, existingObject, newValues)).toBeFalsy();
  });
  it('a single field change returns true', () => {
    const existingObject = {};
    const newValues = {};
    existingObject[BRAND_FIELD.fieldName] = 'Brand 1;';
    existingObject[RRP_FIELD.fieldName] = '27.99';
    newValues[BRAND_FIELD.fieldName] = 'Brand 1;';
    newValues[RRP_FIELD.fieldName] = '26.99';
    expect(checkForChanges(fieldListForTest, existingObject, newValues)).toBeTruthy();
  });
  it('a single field not present on the original object returns true', () => {
    const existingObject = {};
    const newValues = {};
    existingObject[BRAND_FIELD.fieldName] = 'Brand 1;';
    existingObject[RRP_FIELD.fieldName] = '27.99';
    newValues[BRAND_FIELD.fieldName] = 'Brand 1;';
    newValues[RRP_FIELD.fieldName] = '27.99';
    newValues[DESCRIPTION_FIELD.fieldName] = 'Added description';
    expect(checkForChanges(fieldListForTest, existingObject, newValues)).toBeTruthy();
  });
  it("field changes for field not in field list don't affect the result", () => {
    const existingObject = {};
    const newValues = {};
    existingObject['not on new'] = 'ignore old';
    existingObject[BRAND_FIELD.fieldName] = 'Brand 1;';
    existingObject[RRP_FIELD.fieldName] = '27.99';
    existingObject[DESCRIPTION_FIELD.fieldName] = 'My description';
    newValues[BRAND_FIELD.fieldName] = 'Brand 1;';
    newValues[RRP_FIELD.fieldName] = '27.99';
    newValues[DESCRIPTION_FIELD.fieldName] = 'My description';
    newValues['not on old'] = 'ignore new';
    expect(checkForChanges(fieldListForTest, existingObject, newValues)).toBeFalsy();
  });
  it('should return false when a field is added with no content', () => {
    const existingObject = {
      id: 19,
      address1: '1 Mill Lane',
      address2: '',
      address3: '',
      address4: '',
      postcode: 'SY8 1EE',
      country: 'GB',
      add_date: '2019-03-12T14:11:24.900467Z',
      upd_date: '2019-03-12T14:11:24.901461Z',
      customer: 28,
    };
    const newValues = {
      id: 19,
      address1: '1 Mill Lane',
      postcode: 'SY8 1EE',
      country: 'GB',
      add_date: '2019-02-12T14:11:24.900467Z',
      upd_date: '2019-03-12T14:11:24.901461Z',
      dummyKey: 'jhgfkdsjfkadshfgasdf',
    };
    expect(checkForChanges(customerAddressFields, existingObject, newValues)).toBeFalsy();
  });
  it('should return false when a number is represented as a string', () => {
    const modelFields = [RRP_FIELD];
    const existingObject = { rrp: 234 };
    const updatedObject = { rrp: '234.00' };
    expect(checkForChanges(modelFields, existingObject, updatedObject)).toBeFalsy();
  });
  describe('select multiple tests', () => {
    const selectMultipleTestFields = [{ type: SELECT_MULTIPLE, fieldName: 'multiple' }];
    it('should return true when select multiple and one value is empty', () => {
      const existingObject = { multiple: [] };
      const updatedObject = { multiple: [1] };
      expect(checkForChanges(selectMultipleTestFields, existingObject, updatedObject)).toBeTruthy();
    });
    it('should return true when select multiple and one value is missing', () => {
      const existingObject = {};
      const updatedObject = { multiple: [1] };
      expect(checkForChanges(selectMultipleTestFields, existingObject, updatedObject)).toBeTruthy();
    });
    it('should return true when select multiple and different number of selections', () => {
      const existingObject = { multiple: ['1', '2'] };
      const updatedObject = { multiple: [1] };
      expect(checkForChanges(selectMultipleTestFields, existingObject, updatedObject)).toBeTruthy();
    });
    it('should return false when select multiple and same values present', () => {
      const existingObject = { multiple: ['1', 2] };
      const updatedObject = { multiple: ['2', 1] };
      expect(checkForChanges(selectMultipleTestFields, existingObject, updatedObject)).toBeFalsy();
    });
  });
});
