import { chargeName } from './chargeName';

describe('chargeName', () => {
  const charges = [
    { id: 2, charge_name: 'Charge 2' },
    { id: 21, charge_name: 'Charge 21' },
    { id: 1, charge_name: 'Charge 1' },
  ];
  it('should return a found name when a string id is provided', () => {
    expect(chargeName('1', charges)).toEqual('Charge 1');
  });
  it('should return a found name when a numeric id is provided', () => {
    expect(chargeName(21, charges)).toEqual('Charge 21');
  });
  it('should return unknown when an id is not in the array', () => {
    expect(chargeName(212, charges)).toEqual('Unknown Charge');
  });
  it('should return unknown when an id is not passed', () => {
    expect(chargeName(undefined, charges)).toBeUndefined();
  });
});
