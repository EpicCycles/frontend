import { updateObjectInArray } from './utils';

describe('updateObjectInArray', () => {
  it('should create a new array when the initial array is not an array', () => {
    const newObject = { id: 1, attribute: 'thing' };
    expect(updateObjectInArray('', newObject)).toEqual([newObject]);
  });
  it('should create a new array when the initial array is undefined', () => {
    const newObject = { id: 1, attribute: 'thing' };
    expect(updateObjectInArray(undefined, newObject)).toEqual([newObject]);
  });
  it('should add to an array when the initial array is empty', () => {
    const newObject = { id: 1, attribute: 'thing' };
    expect(updateObjectInArray([], newObject)).toEqual([newObject]);
  });
  it('should replace item in array when the initial array has only that id', () => {
    const newObject = { id: 1, attribute: 'thing' };
    const initialArray = [{ id: 1, attribute: 'not a thing' }];
    expect(updateObjectInArray(initialArray, newObject)).toEqual([newObject]);
  });
  it('should replace item in array when the initial array has the key passed', () => {
    const newObject = { id: 27, attribute: 'thing' };
    const initialArray = [{ id: 1, attribute: 'not a thing' }];
    expect(updateObjectInArray(initialArray, newObject, 1)).toEqual([newObject]);
  });
  it('should add new item to array when the initial array does not have the item', () => {
    const newObject = { dummyKey: 27, attribute: 'thing' };
    const initialArray = [{ id: 1, attribute: 'not a thing' }];
    const expectedArray = [
      { id: 1, attribute: 'not a thing' },
      { dummyKey: 27, attribute: 'thing' },
    ];
    expect(updateObjectInArray(initialArray, newObject, 1)).toEqual([newObject]);
  });
  it('should add new item when the initial array does not have the item with dummyKey', () => {
    const newObject = { dummyKey: 27, attribute: 'thing' };
    const initialArray = [{ id: 1, attribute: 'not a thing' }];
    const expectedArray = [
      { id: 1, attribute: 'not a thing' },
      { dummyKey: 27, attribute: 'thing' },
    ];
    expect(updateObjectInArray(initialArray, newObject)).toEqual([newObject]);
  });
});
