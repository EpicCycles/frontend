import { bikeSearchFields } from './bikeSearch';

describe('bikeSearchFields', () => {
  it('should return all fields when archived can be selected', () => {
    expect(bikeSearchFields(true)).toHaveLength(3);
  });
  it('should return two fields when archived cannot be selected', () => {
    expect(bikeSearchFields(false)).toHaveLength(2);
  });
});
