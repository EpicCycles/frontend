import { validateField } from './model';
import { INVALID_CURRENCY, INVALID_INTEGER, INVALID_NUMBER, VALUE_MISSING } from './error';
import { CURRENCY, NUMBER } from './fields';

describe('model.validateField', () => {
  it('should not validate when field is readOnly', () => {
    const field = { fieldName: 'field1', readOnly: true, required: true };
    const fullModelData = {};
    expect(validateField(field, undefined, fullModelData)).not.toBeDefined();
  });
  it('should not return error when value is empty and field is not required', () => {
    const field = { fieldName: 'field1', readOnly: true, required: false };
    const fullModelData = {};
    const fieldCurrency = { type: NUMBER, fieldName: 'field1', readOnly: false, required: false };
    expect(validateField(field, undefined, fullModelData)).not.toBeDefined();
    expect(validateField(field, '', fullModelData)).not.toBeDefined();
    expect(validateField(fieldCurrency, null, fullModelData)).not.toBeDefined();
  });
  it('should return error when no value and field is required', () => {
    const field = { fieldName: 'field1', readOnly: false, required: true };
    const fieldNumber = { type: NUMBER, fieldName: 'field1', readOnly: false, required: true };
    const fullModelData = {};
    expect(validateField(field, undefined, fullModelData)).toEqual(VALUE_MISSING);
    expect(validateField(field, '', fullModelData)).toEqual(VALUE_MISSING);
    expect(validateField(fieldNumber, undefined, fullModelData)).toEqual(VALUE_MISSING);
  });
  it('should validate when field type is numeric', () => {
    const fieldNumber = { type: NUMBER, fieldName: 'field1', readOnly: false, required: true };
    const fullModelData = {};
    expect(validateField(fieldNumber, undefined, fullModelData)).toEqual(VALUE_MISSING);
    expect(validateField(fieldNumber, '', fullModelData)).toEqual(VALUE_MISSING);
    expect(validateField(fieldNumber, 0, fullModelData)).toEqual(INVALID_INTEGER);
    expect(validateField(fieldNumber, '0.0.0', fullModelData)).toEqual(INVALID_NUMBER);
    expect(validateField(fieldNumber, '1,000.0', fullModelData)).toEqual(INVALID_NUMBER);
    expect(validateField(fieldNumber, '3', fullModelData)).not.toBeDefined();
  });
  it('should validate when field type is currency', () => {
    const fieldNumber = { type: CURRENCY, fieldName: 'field1', readOnly: false, required: true };
    const fullModelData = {};
    expect(validateField(fieldNumber, undefined, fullModelData)).toEqual(VALUE_MISSING);
    expect(validateField(fieldNumber, '', fullModelData)).toEqual(VALUE_MISSING);
    expect(validateField(fieldNumber, 0, fullModelData)).not.toBeDefined();
    expect(validateField(fieldNumber, 0.15, fullModelData)).not.toBeDefined();
    expect(validateField(fieldNumber, '0.0.0', fullModelData)).toEqual(INVALID_CURRENCY);
    expect(validateField(fieldNumber, '1,000.0', fullModelData)).toEqual(INVALID_CURRENCY);
    expect(validateField(fieldNumber, '1000.123', fullModelData)).toEqual(INVALID_CURRENCY);
    expect(validateField(fieldNumber, '3', fullModelData)).not.toBeDefined();
    expect(validateField(fieldNumber, '3.56', fullModelData)).not.toBeDefined();
  });
});
