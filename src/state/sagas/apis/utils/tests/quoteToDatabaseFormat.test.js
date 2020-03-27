import { quoteToDatabaseFormat } from '../quoteToDatabaseFormat';

describe('quoteToDatabaseFormat', () => {
  it('should throw an error when no data is passed', () => {
    expect(() => quoteToDatabaseFormat(undefined)).toThrow();
    expect(() => quoteToDatabaseFormat({})).toThrow();
  });
  it('should parse arrays when no data is present', () => {
    const quote = { id: 23 };
    const expectedCustomer = { id: 23, quoteParts: '[]', answers: '[]', charges: '[]' };
    expect(quoteToDatabaseFormat(quote)).toEqual(expectedCustomer);
  });
  it('should parse arrays when data is present', () => {
    const quote = {
      id: 23,
      quoteParts: [{ id: 12 }],
      answers: [{ id: 23 }],
      charges: [{ id: 97 }],
    };
    const expectedCustomer = {
      id: 23,
      quoteParts: '[{"id":12}]',
      answers: '[{"id":23}]',
      charges: '[{"id":97}]',
    };
    expect(quoteToDatabaseFormat(quote)).toEqual(expectedCustomer);
  });
});
