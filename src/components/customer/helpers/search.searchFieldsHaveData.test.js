import { REQUIRE_VALUES, SEARCH_LENGTH, searchFieldsHaveData } from './search';

describe('search.searchFieldsHaveData', () => {
  it('should return no error if there is data', () => {
    const modelData = { firstName: 'ob' };
    expect(searchFieldsHaveData(undefined, modelData)).toBeUndefined();
  });
  it('should return no error if all fields have data', () => {
    const modelData = { firstName: 'ob', lastName: 'p', email: 'te' };
    expect(searchFieldsHaveData(undefined, modelData)).toBeUndefined();
  });
  it('should return an error if no fields have data', () => {
    const modelData = {};
    expect(searchFieldsHaveData(undefined, modelData)).toBe(REQUIRE_VALUES);
  });
  it('should return an error if changed field is 1 character', () => {
    const modelData = {};
    expect(searchFieldsHaveData('o', modelData)).toBe(SEARCH_LENGTH);
  });
});
