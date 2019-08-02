import { chargeOptions } from './chargeOptions';

describe('chargeOptions', () => {
  it('should return an empty array when no charges are passed', () => {
    const expectedOptions = [];
    const charges = undefined;
    expect(chargeOptions(charges)).toEqual(expectedOptions);
  });
  it('should return an empty array when no persisted charges are passed', () => {
    const expectedOptions = [];
    const charges = [{ dummyKey: 'notsaved', charge_name: 'do not see me' }];
    expect(chargeOptions(charges)).toEqual(expectedOptions);
  });
  it('should return all persisted values when charges are passed', () => {
    const expectedOptions = [{ value: '1', name: 'CHarge 1' }, { value: '21', name: 'Charge 21' }];
    const charges = [
      { id: 1, charge_name: 'CHarge 1' },
      { dummyKey: 'notsaved', charge_name: 'do not see me' },
      { id: 21, charge_name: 'Charge 21' },
    ];
    expect(chargeOptions(charges)).toEqual(expectedOptions);
  });
});
