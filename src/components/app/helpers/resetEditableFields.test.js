import { resetEditableFields } from '../model/helpers/resetEditableFields';
import { VALUE_MISSING } from '../model/helpers/error';

describe('resetEditableFields', () => {
  it('should return the model unchanged when no editable fields', () => {
    const model = { field1: 'value', field2: true, field3: 23, error_detail: {} };
    const modelFields = [];
    expect(resetEditableFields(model, modelFields)).toEqual(model);
  });
  it('should return the model unchanged when no editable fields vave values', () => {
    const model = { field1: 'value', field2: true, field3: 23, error_detail: {} };
    const modelFields = [{ fieldName: 'field1', readOnly: true }, { fieldName: 'field4' }];
    expect(resetEditableFields(model, modelFields)).toEqual(model);
  });
  it('should return the model with editable fields reset when editable fields vave values', () => {
    const model = { field1: 'value', field2: true, field3: 23 };
    const modelFields = [{ fieldName: 'field1', readOnly: true }, { fieldName: 'field2' }];
    const modelReturned = { field1: 'value', field3: 23, error_detail: {} };
    expect(resetEditableFields(model, modelFields)).toEqual(modelReturned);
  });
  it('should return an empty model when all fields are reset', () => {
    const model = { field1: 'value', field2: true, field3: 23 };
    const modelFields = [
      { fieldName: 'field1' },
      { fieldName: 'field2' },
      { fieldName: 'field3' },
      { fieldName: 'field4' },
    ];
    const modelReturned = { error_detail: {} };
    expect(resetEditableFields(model, modelFields)).toEqual(modelReturned);
  });
  it('should set fields with default values when those exist', () => {
    const model = { dummyKey: 'JHJHGJKGKJfsd', field1: 'value', field2: true, field3: 23 };
    const modelFields = [
      { fieldName: 'field1', default: 'default Value' },
      { fieldName: 'field2' },
      { fieldName: 'field3' },
      { fieldName: 'field4' },
    ];
    const modelReturned = { dummyKey: 'JHJHGJKGKJfsd', field1: 'default Value', error_detail: {} };
    expect(resetEditableFields(model, modelFields)).toEqual(modelReturned);
  });
  it('should replace existing errors with created errors when required', () => {
    const model = { dummyKey: 'JHJHGJKGKJfsd', field1: 'value', field2: true, field3: 23 };
    const modelFields = [
      { fieldName: 'field1', default: 'default Value' },
      { fieldName: 'field2' },
      { fieldName: 'field3', required: true, error: VALUE_MISSING },
      { fieldName: 'field4' },
    ];
    const modelReturned = {
      dummyKey: 'JHJHGJKGKJfsd',
      field1: 'default Value',
      error_detail: { field3: VALUE_MISSING },
    };
    expect(resetEditableFields(model, modelFields)).toEqual(modelReturned);
  });
});
