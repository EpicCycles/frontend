import { percentageValidator } from './percentageValidator';

const INVALID_PERCENTAGE = 'Percentage values should be between 0.01 and 100';

describe('percentageValidator', () => {
  it('should not raise an error when passed an empty field', () => {
    const inputData = '';
    const errorReturned = undefined;
    expect(percentageValidator(inputData)).toEqual(errorReturned);
  });
  it('should not raise an error when passed string 0.01', () => {
    const inputData = '0.01';
    const errorReturned = undefined;
    expect(percentageValidator(inputData)).toEqual(errorReturned);
  });
  it('should not raise an error when passed numeric 0.01', () => {
    const inputData = 0.01;
    const errorReturned = undefined;
    expect(percentageValidator(inputData)).toEqual(errorReturned);
  });
  it('should not raise an error when passed string 99.99', () => {
    const inputData = '99.99';
    const errorReturned = undefined;
    expect(percentageValidator(inputData)).toEqual(errorReturned);
  });
  it('should not raise an error when passed numeric 99.99', () => {
    const inputData = 99.99;
    const errorReturned = undefined;
    expect(percentageValidator(inputData)).toEqual(errorReturned);
  });
  it('should raise an error when passed string > 100', () => {
    const inputData = '100.01';
    expect(percentageValidator(inputData)).toEqual(INVALID_PERCENTAGE);
  });
  it('should raise an error when passed numeric > 100', () => {
    const inputData = 101;
    expect(percentageValidator(inputData)).toEqual(INVALID_PERCENTAGE);
  });
  it('should raise an error when passed string 0', () => {
    const inputData = '0.00';
    expect(percentageValidator(inputData)).toEqual(INVALID_PERCENTAGE);
  });
  it('should raise an error when passed numeric -1', () => {
    const inputData = -1;
    expect(percentageValidator(inputData)).toEqual(INVALID_PERCENTAGE);
  });
});
