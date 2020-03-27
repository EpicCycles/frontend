import { customerToFrontEndFormat } from './customer';

describe('customerToFrontEndFormat', () => {
  it('should provide empty arrays when arrtibutes not provided', () => {
    const customerFromAPI = { id: 1, first_name: 'no arays' };
    const expectedResult = {
      id: 1,
      first_name: 'no arays',
      addresses: [],
      phoneNumbers: [],
      fittings: [],
    };
    expect(customerToFrontEndFormat(customerFromAPI)).toEqual(expectedResult);
  });
  it('should provide empty arrays when arrtibutes are null', () => {
    const customerFromAPI = {
      id: 1,
      first_name: 'no arays',
      addresses: null,
      phoneNumbers: null,
      fittings: null,
    };
    const expectedResult = {
      id: 1,
      first_name: 'no arays',
      addresses: [],
      phoneNumbers: [],
      fittings: [],
    };
    expect(customerToFrontEndFormat(customerFromAPI)).toEqual(expectedResult);
  });
  it('should parse arrays when they have data', () => {
    const customerFromAPI = {
      id: 1,
      first_name: 'Yes',
      addresses: JSON.stringify(['1', '2']),
      phoneNumbers: JSON.stringify(['10', '20']),
      fittings: JSON.stringify(['1011', '2022']),
    };
    const expectedResult = {
      id: 1,
      first_name: 'Yes',
      addresses: ['1', '2'],
      phoneNumbers: ['10', '20'],
      fittings: ['1011', '2022'],
    };
    expect(customerToFrontEndFormat(customerFromAPI)).toEqual(expectedResult);
  });
});
