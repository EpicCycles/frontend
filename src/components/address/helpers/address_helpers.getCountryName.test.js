import { getCountryName } from './address';
describe('getCountryName', () => {
  it('no country code no name', () => {
    expect(getCountryName()).not.toBeDefined();
  });
  it('no country matching code use code', () => {
    expect(getCountryName('ZZZ')).toBe('ZZZ');
  });
  it('when country code found return name', () => {
    expect(getCountryName('GB')).toBe('United Kingdom');
  });
});
