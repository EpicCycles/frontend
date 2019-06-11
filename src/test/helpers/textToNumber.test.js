import {textToNumber} from "../../helpers/textToNumber";

describe('textToNumber', () => {
  it('should cnvert when a valid integer is found', () => {
    const valueToConvert = '123';
    const expectedValue = 123;
    expect(textToNumber(valueToConvert)).toEqual(expectedValue);
  })
})