import { bikeSearchData, REQUIRE_VALUES } from './bikeSearch';

describe('bikeSearchData', () => {
  it('should return an error when there is no search data', () => {
    expect(bikeSearchData('', {})).toEqual(REQUIRE_VALUES);
  });
  it('should return an error when there is no data in search Fields', () => {
    expect(bikeSearchData('', { archived: true })).toEqual(REQUIRE_VALUES);
  });
  it('should not return an error when there is data in a search Field', () => {
    expect(bikeSearchData('', { brand: 2, archived: true })).toBeUndefined();
  });
});
