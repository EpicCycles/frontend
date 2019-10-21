import { postUpdateProcessingCharge } from './postUpdateProcessingCharge';

describe('postUpdateProcessingCharge', () => {
  it('should return the charge unchanged when there are not new errors', () => {
    const charge = {};
    const expectedCharge = { error_detail: {} };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
  it('should return the charge unchanged when there are esisting errors', () => {
    const charge = { error_detail: { thing: 'rong' } };
    const expectedCharge = { error_detail: { thing: 'rong' } };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
  it('should return the charge unchanged when is a numeric price only', () => {
    const charge = { price: 130.0, error_detail: { thing: 'rong' } };
    const expectedCharge = { price: 130.0, error_detail: { thing: 'rong' } };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
  it('should return the charge unchanged when is a string price only', () => {
    const charge = { price: '130.0', error_detail: { thing: 'rong' } };
    const expectedCharge = { price: '130.0', error_detail: { thing: 'rong' } };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
  it('should return the charge unchanged when is a numeric percentage only', () => {
    const charge = { percentage: 5.0, error_detail: { thing: 'rong' } };
    const expectedCharge = { percentage: 5.0, error_detail: { thing: 'rong' } };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
  it('should return the charge unchanged when is a string percentage only', () => {
    const charge = { percentage: '5.0', error_detail: { thing: 'rong' } };
    const expectedCharge = { percentage: '5.0', error_detail: { thing: 'rong' } };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
  it('should add an error when charge and percentage are in place', () => {
    const charge = { price: '130.0', percentage: '5.0', error_detail: { thing: 'rong' } };
    const expectedCharge = {
      price: '130.0',
      percentage: '5.0',
      error_detail: {
        thing: 'rong',
        price: 'Either a price or a percentage can be specified',
        percentage: 'Either a price or a percentage can be specified',
      },
    };
    expect(postUpdateProcessingCharge(charge)).toEqual(expectedCharge);
  });
});
