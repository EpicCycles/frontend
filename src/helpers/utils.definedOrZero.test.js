import { definedOrZero } from './utils';
describe('definedOrZero', () => {
  it('undefined returns false', () => {
    expect(definedOrZero()).toBeFalsy();
  });
  it('empty string returns false', () => {
    expect(definedOrZero('')).toBeFalsy();
  });
  it('0 returns true', () => {
    expect(definedOrZero(0)).toBeTruthy();
  });
  it('12 returns true', () => {
    expect(definedOrZero(12)).toBeTruthy();
  });
});
