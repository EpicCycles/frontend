import { textToNumber } from '../../helpers/textToNumber';

describe('textToNumber', () => {
  it('should convert when a valid integer is found', () => {
    const valueToConvert = '123';
    const expectedValue = 123;
    expect(textToNumber(valueToConvert)).toEqual(expectedValue);
  });
  it('should convert when a valid decimal is found', () => {
    const valueToConvert = '123.45';
    const expectedValue = 123.45;
    expect(textToNumber(valueToConvert)).toEqual(expectedValue);
  });
  it('should convert when a value with commas and currency symbols', () => {
    const valueToConvert = '£1,123.45';
    const expectedValue = 1123.45;
    expect(textToNumber(valueToConvert)).toEqual(expectedValue);
  });
});
