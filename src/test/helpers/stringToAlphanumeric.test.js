import { stringToAlphanumeric } from '../../helpers/stringToAlphanumerics';

describe('stringToAlphanumeric', () => {
  it('should return a word as it is when there are numbers and characters', () => {
    const inputString = 'Mavic2019';
    const expectedOutput = 'Mavic2019';
    expect(stringToAlphanumeric(inputString)).toEqual(expectedOutput);
  });
  it('should return no spaces when there are numbers and characters with spaces', () => {
    const inputString = 'Mavic 2019';
    const expectedOutput = 'Mavic2019';
    expect(stringToAlphanumeric(inputString)).toEqual(expectedOutput);
  });
});
