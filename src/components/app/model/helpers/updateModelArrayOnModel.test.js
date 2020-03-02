import { updateModelArrayOnModel } from './updateModelArrayOnModel';

describe('updateModelArrayOnModel', () => {
  const testModelFields = [{ fieldName: 'itemValue' }, { fieldName: 'itemName' }];
  const model = {
    id: 1,
    arrayOfThings: [
      { id: 101, itemValue: 'value before' },
      { id: 21, itemValue: 'value before', itemName: 'Name before save' },
    ],
  };

  it('should replace values for an existing id', () => {
    const expectedValue = { id: 101, itemName: 'new item name' };
    const valueToSave = { id: 101, itemName: 'new item name', changed: true, valie: true };
    const expectedUpdatedModel = {
      id: 1,
      changed: true,
      arrayOfThings: [
        expectedValue,
        { id: 21, itemValue: 'value before', itemName: 'Name before save' },
      ],
    };
    expect(updateModelArrayOnModel(model, 'arrayOfThings', testModelFields, valueToSave)).toEqual(
      expectedUpdatedModel,
    );
  });
  it('should include values for ann unknown existing id', () => {
    const expectedValue = { id: 103, itemName: 'new item name' };
    const valueToSave = { id: 103, itemName: 'new item name', changed: true, valie: true };
    const expectedUpdatedModel = {
      id: 1,
      changed: true,
      arrayOfThings: [
        { id: 101, itemValue: 'value before' },
        { id: 21, itemValue: 'value before', itemName: 'Name before save' },
        expectedValue,
      ],
    };
    expect(updateModelArrayOnModel(model, 'arrayOfThings', testModelFields, valueToSave)).toEqual(
      expectedUpdatedModel,
    );
  });
  it('should add a new element', () => {
    const expectedValue = { id: 102, itemName: 'new item name' };
    const valueToSave = { itemName: 'new item name', changed: true, valie: true };
    const expectedUpdatedModel = {
      id: 1,
      changed: true,
      arrayOfThings: [
        { id: 101, itemValue: 'value before' },
        { id: 21, itemValue: 'value before', itemName: 'Name before save' },
        expectedValue,
      ],
    };
    expect(updateModelArrayOnModel(model, 'arrayOfThings', testModelFields, valueToSave)).toEqual(
      expectedUpdatedModel,
    );
  });
  it('should add an element if nothing exists', () => {
    const expectedValue = { id: 1, itemName: 'new item name' };
    const valueToSave = { itemName: 'new item name', changed: true, valie: true };
    const expectedUpdatedModel = {
      changed: true,
      arrayOfThings: [expectedValue],
    };
    expect(
      updateModelArrayOnModel(undefined, 'arrayOfThings', testModelFields, valueToSave),
    ).toEqual(expectedUpdatedModel);
  });
  it('should add an element when array element does not exist', () => {
    const expectedValue = { id: 1, itemName: 'new item name' };
    const valueToSave = { itemName: 'new item name', changed: true, valie: true };
    const expectedUpdatedModel = {
      id: 123,
      changed: true,
      arrayOfThings: [expectedValue],
    };
    expect(
      updateModelArrayOnModel({ id: 123 }, 'arrayOfThings', testModelFields, valueToSave),
    ).toEqual(expectedUpdatedModel);
  });
});
