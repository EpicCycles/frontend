import { CURRENCY, NUMBER, TEXT } from './fields';
import { applyFieldValueToModelOnly } from './model';

describe('applyFieldValueToModelOnly', () => {
  it('should set a default value if no value is saved', () => {
    const field = { fieldName: 'myField', type: TEXT, default: 'Pig' };
    const model = { ignoreMe: 'do not change', myField: 'change' };
    const expectedResult = { changed: true, ignoreMe: 'do not change', myField: 'Pig' };
    expect(applyFieldValueToModelOnly(model, field, undefined)).toEqual(expectedResult);
  });
  it('should set a integer default value if value is NUMBER', () => {
    const field = { fieldName: 'myField', type: NUMBER, default: 3 };
    const model = { ignoreMe: 'do not change', myField: 'change' };
    const expectedResult = { changed: true, ignoreMe: 'do not change', myField: 3 };
    expect(applyFieldValueToModelOnly(model, field, undefined)).toEqual(expectedResult);
  });
  it('should set a integer  value if value is NUMBER', () => {
    const field = { fieldName: 'myField', type: NUMBER, default: 3 };
    const model = { ignoreMe: 'do not change', myField: 'change' };
    const expectedResult = { changed: true, ignoreMe: 'do not change', myField: 13 };
    expect(applyFieldValueToModelOnly(model, field, '13')).toEqual(expectedResult);
  });
  it('should set a currency default value if value is CURRENCY', () => {
    const field = { fieldName: 'myField', type: CURRENCY, default: 35 };
    const model = { ignoreMe: 'do not change', myField: 'change' };
    const expectedResult = { changed: true, ignoreMe: 'do not change', myField: 35.0 };
    expect(applyFieldValueToModelOnly(model, field, undefined)).toEqual(expectedResult);
  });
  it('should set a currency value if value is CURRENCY', () => {
    const field = { fieldName: 'myField', type: CURRENCY, default: 3 };
    const model = { ignoreMe: 'do not change', myField: 'change' };
    const expectedResult = { changed: true, ignoreMe: 'do not change', myField: 25.99 };
    expect(applyFieldValueToModelOnly(model, field, '25.99')).toEqual(expectedResult);
  });
  it('should set a currency value of zero if value is CURRENCY', () => {
    const field = { fieldName: 'myField', type: CURRENCY, default: 3 };
    const model = { ignoreMe: 'do not change', myField: 'change' };
    const expectedResult = { changed: true, ignoreMe: 'do not change', myField: 0 };
    expect(applyFieldValueToModelOnly(model, field, '0')).toEqual(expectedResult);
  });
});
