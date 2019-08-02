import { generateRandomCode } from '../../../helpers/utils';
import { getModelKey } from '../model/helpers/model';

test('no model returns new element id', () => {
  expect(getModelKey()).toBe('');
});
test('empty model returns new element id', () => {
  expect(getModelKey({})).toBe('');
});
test('model with only id returns that', () => {
  const modelInstance = {
    id: 23,
    field: 'another field',
  };
  expect(getModelKey(modelInstance)).toBe(23);
});
test('model with id and dummy key returns id', () => {
  const modelInstance = {
    id: 23,
    field: 'another field',
    dummyKey: generateRandomCode(),
  };
  expect(getModelKey(modelInstance)).toBe(23);
});
test('model with dummy key only returns dummyKey', () => {
  const modelInstance = {
    idTypeField: 23,
    field: 'another field',
    dummyKey: generateRandomCode(),
  };
  expect(getModelKey(modelInstance)).toBe(modelInstance.dummyKey);
});
