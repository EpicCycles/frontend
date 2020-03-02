import { removeModelFromArrayOnModel } from './removeModelFromArrayOnModel';

describe('removeModelFromArrayOnModel', () => {
  it('should return an empty array when field is not found', () => {
    const expectedResult = { arrayOfThings: [] };
    expect(removeModelFromArrayOnModel(undefined, 'arrayOfThings', 123)).toEqual(expectedResult);
  });
  it('should return an empty array when field is found but empty', () => {
    const expectedResult = { id: 123, arrayOfThings: [] };
    const model = { id: 123, arrayOfThings: [] };
    expect(removeModelFromArrayOnModel(model, 'arrayOfThings', 123)).toEqual(expectedResult);
  });
  it('should return an unchanged array when id is not in array', () => {
    const expectedResult = {
      id: 123,
      arrayOfThings: [
        { id: 12, fieldvaluu: 'jhg jhg' },
        { id: 1234, fieldvaluu: 'jhg jhg x' },
      ],
    };
    const model = {
      id: 123,
      arrayOfThings: [
        { id: 12, fieldvaluu: 'jhg jhg' },
        { id: 1234, fieldvaluu: 'jhg jhg x' },
      ],
    };
    expect(removeModelFromArrayOnModel(model, 'arrayOfThings', 123)).toEqual(expectedResult);
  });
  it('should remove element from array when id is in array', () => {
    const expectedResult = {
      id: 123,
      arrayOfThings: [
        { id: 12, fieldvaluu: 'jhg jhg' },
        { id: 1234, fieldvaluu: 'jhg jhg x' },
      ],
    };
    const model = {
      id: 123,
      arrayOfThings: [
        { id: 12, fieldvaluu: 'jhg jhg' },
        { id: 123, fieldvaluu: 'jhg jhg fdf' },
        { id: 1234, fieldvaluu: 'jhg jhg x' },
      ],
    };
    expect(removeModelFromArrayOnModel(model, 'arrayOfThings', 123)).toEqual(expectedResult);
  });
  it('should remove element from array when id is only item in array', () => {
    const expectedResult = { id: 123, arrayOfThings: [] };
    const model = { id: 123, arrayOfThings: [{ id: 123, fieldvaluu: 'jhg jhg fdf' }] };
    expect(removeModelFromArrayOnModel(model, 'arrayOfThings', 123)).toEqual(expectedResult);
  });
});
