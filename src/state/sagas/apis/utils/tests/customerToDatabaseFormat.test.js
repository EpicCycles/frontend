import { customerToDatabaseFormat } from '../customerToDatabaseFormat';

describe('customerToDatabaseFormat', () => {
  it('should throw an error when no data is passed', () => {
    expect(() => customerToDatabaseFormat(undefined)).toThrow();
    expect(() => customerToDatabaseFormat({})).toThrow();
  });
  it('should parse arrays when no data is present', () => {
    const customer = { id: 23 };
    const expectedCustomer = { id: 23, addresses: '[]', phoneNumbers: '[]', fittings: '[]' };
    expect(customerToDatabaseFormat(customer)).toEqual(expectedCustomer);
  });
  it('should parse arrays when data is present', () => {
    const customer = {
      id: 23,
      addresses: [{ id: 12 }],
      phoneNumbers: [{ id: 23 }],
      fittings: [{ id: 97 }],
    };
    const expectedCustomer = {
      id: 23,
      addresses: '[{"id":12}]',
      phoneNumbers: '[{"id":23}]',
      fittings: '[{"id":97}]',
    };
    expect(customerToDatabaseFormat(customer)).toEqual(expectedCustomer);
  });
});
