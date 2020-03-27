import { modelToDatabaseFormat } from '../modelToDatabaseFormat';

describe('modelToDatabaseFormat', () => {
  const testFields = ['addresses', 'phoneNumbers', 'fittings'];
  it('should throw an error when no data is passed', () => {
    expect(() => modelToDatabaseFormat(undefined, testFields)).toThrow();
    expect(() => modelToDatabaseFormat({}, testFields)).toThrow();
  });
  it('should parse arrays when no data is present', () => {
    const customer = { id: 23 };
    const expectedCustomer = { id: 23, addresses: '[]', phoneNumbers: '[]', fittings: '[]' };
    expect(modelToDatabaseFormat(customer, testFields)).toEqual(expectedCustomer);
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
    expect(modelToDatabaseFormat(customer, testFields)).toEqual(expectedCustomer);
  });
});
