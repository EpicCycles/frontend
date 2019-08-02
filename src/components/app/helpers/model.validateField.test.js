import {
  INVALID_CURRENCY,
  INVALID_NUMBER,
  PART_NAME_MISSING,
  VALUE_MISSING,
} from '../model/helpers/error';
import { validateField } from '../model/helpers/model';
import { CURRENCY, NUMBER } from '../model/helpers/fields';

describe('validateField', () => {
  it('should return the provided error when a required field is missing', () => {
    const fieldToValidate = { required: true, error: PART_NAME_MISSING };
    expect(validateField(fieldToValidate, '', {})).toBe(PART_NAME_MISSING);
  });
  it('should return the generic error when a required field is missing', () => {
    const fieldToValidate = { required: true };
    expect(validateField(fieldToValidate, '', {})).toBe(VALUE_MISSING);
  });
  it('should return no error when a field is missing that is not required', () => {
    const fieldToValidate = { required: false };
    expect(validateField(fieldToValidate, '', {})).toBeUndefined();
  });
  it('should return invalid number when a number field contains non numeric data', () => {
    const fieldToValidate = { type: NUMBER };
    expect(validateField(fieldToValidate, 'a', {})).toBe(INVALID_NUMBER);
  });
  it('should return invalid integer when a number field contains numeric data with dp', () => {
    const fieldToValidate = { type: NUMBER };
    expect(validateField(fieldToValidate, '1.23', {})).toBe(INVALID_NUMBER);
  });
  it('should return no error when a number field contains an integer', () => {
    const fieldToValidate = { type: NUMBER };
    expect(validateField(fieldToValidate, '12', {})).toBeUndefined();
  });
  it('should return an error when a number field contains a padded integer', () => {
    const fieldToValidate = { type: NUMBER };
    expect(validateField(fieldToValidate, 'a12 ', {})).toBe(INVALID_NUMBER);
  });
  it('should return no error when a trimmed number field contains an integer', () => {
    const fieldToValidate = { type: NUMBER };
    expect(validateField(fieldToValidate, '  12 ', {})).toBeUndefined();
  });
  it('should return invalid currency when a currency field contains non numeric data', () => {
    const fieldToValidate = { type: CURRENCY };
    expect(validateField(fieldToValidate, 'a', {})).toBe(INVALID_CURRENCY);
  });
  it('should return invalid currency when a currency field contains numeric data with dp', () => {
    const fieldToValidate = { type: CURRENCY };
    expect(validateField(fieldToValidate, '1.234', {})).toBe(INVALID_CURRENCY);
  });
  it('should return no error when a currency field has one decimal place', () => {
    const fieldToValidate = { type: CURRENCY };
    expect(validateField(fieldToValidate, '12', {})).toBeUndefined();
  });
  it('should return no error when a currency field contains an integer', () => {
    const fieldToValidate = { type: CURRENCY };
    expect(validateField(fieldToValidate, '12.5', {})).toBeUndefined();
  });
  it('should return no error when a currency field has 2 dp', () => {
    const fieldToValidate = { type: CURRENCY };
    expect(validateField(fieldToValidate, '12.45', {})).toBeUndefined();
  });
  it('should return no error when a trimmed currency field contains an currency', () => {
    const fieldToValidate = { type: CURRENCY };
    expect(validateField(fieldToValidate, '  12 ', {})).toBeUndefined();
  });
  it('should call a validator when value and validator present', () => {
    const validator = jest.fn();
    const fieldToValidate = { validator };
    const resultOfCall = validateField(fieldToValidate, 'value', {});
    expect(resultOfCall).toBeUndefined();
    expect(validator).toHaveBeenCalledTimes(1);
  });
  it('should call a validator when no value and validator present', () => {
    const validator = jest.fn();
    const fieldToValidate = { validator };
    const resultOfCall = validateField(fieldToValidate, '', {});
    expect(resultOfCall).toBeUndefined();
    expect(validator).toHaveBeenCalledTimes(1);
  });
});
