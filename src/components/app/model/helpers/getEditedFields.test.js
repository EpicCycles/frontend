import { getEditedFields } from './getEditedFields';

describe('getEditedFields', () => {
  const testModelFields = [{ fieldName: 'itemValue' }, { fieldName: 'itemName' }];

  it('should return an empty object when no fields fond on input model', () => {
    expect(getEditedFields({ unUsedField: 'ignore me' }, testModelFields)).toEqual({});
  });
  it('should return any field with details when some fields fond on input model', () => {
    expect(
      getEditedFields({ unUsedField: 'ignore me', itemValue: 'use me 1' }, testModelFields),
    ).toEqual({ itemValue: 'use me 1' });
  });
  it('should return all field with details when all fields fond on input model', () => {
    expect(
      getEditedFields(
        { unUsedField: 'ignore me', itemName: 'also me', itemValue: 'use me 1' },
        testModelFields,
      ),
    ).toEqual({ itemValue: 'use me 1', itemName: 'also me' });
  });
});
