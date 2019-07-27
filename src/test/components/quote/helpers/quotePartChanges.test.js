import { quotePartChanges } from '../../../../components/quote/helpers/quotePartChanges';
import { partType1, partType2, sampleSections } from '../../../../helpers/sampleData';

jest.mock('../../../../components/quote/helpers/quotePartValidation');
const { quotePartValidation } = require('../../../../components/quote/helpers/quotePartValidation');

jest.mock('../../../../components/part/helpers/price');
const { calculatePrice } = require('../../../../components/part/helpers/price');

describe('quotePartChanges', () => {
  beforeEach(() => {
    quotePartValidation.mockImplementation((quotePart, brands, parts) => quotePart);
    calculatePrice.mockImplementation((is_bike_quote, part, supplierProducts) => {
      if (part) return { part_price: 23.0, supplier: 4 };
      return { part_price: undefined, supplier: undefined };
    });
  });
  afterEach(() => {
    quotePartValidation.mockClear();
    calculatePrice.mockClear();
  });
  it('should call the extended validation method when the method is called', () => {
    const validatedQuotePart = { id: 12 };
    quotePartChanges(validatedQuotePart, validatedQuotePart, [], [], [], []);
    expect(quotePartValidation).toHaveBeenCalledWith(validatedQuotePart, [], []);
  });
  it('should find the part Type when the passed quotePart has a new partType', () => {
    const validatedQuotePart = { id: 12, partType: '2', _partType: partType1 };
    const expectedQuotePart = { id: 12, partType: '2', _partType: partType2 };
    const finalQuotePart = quotePartChanges({}, validatedQuotePart, sampleSections, [], [], []);
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
  it('should find the part Type when the passed quotePart no part type object', () => {
    const validatedQuotePart = { id: 12, partType: '2' };
    const expectedQuotePart = { id: 12, partType: '2', _partType: partType2 };
    const finalQuotePart = quotePartChanges({}, validatedQuotePart, sampleSections, [], [], []);
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
  it('should not change the part Type when the value is unchanged', () => {
    const validatedQuotePart = { id: 12, partType: '2', _partType: partType2 };
    const expectedQuotePart = { id: 12, partType: '2', _partType: partType2 };
    const finalQuotePart = quotePartChanges({}, validatedQuotePart, sampleSections, [], [], []);
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
  it('should use found prices when the part changes', () => {
    const validatedQuotePart = {
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const expectedQuotePart = {
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
      part_price: 23.0,
      supplier: 4,
    };
    const finalQuotePart = quotePartChanges({}, validatedQuotePart, sampleSections, [], [], []);
    expect(calculatePrice).toHaveBeenCalledWith(false, validatedQuotePart._completePart, []);
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
  it('should not change prices when the part does not change', () => {
    const quotePart = {
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const validatedQuotePart = {
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const expectedQuotePart = {
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const finalQuotePart = quotePartChanges(
      quotePart,
      validatedQuotePart,
      sampleSections,
      [],
      [],
      [],
    );
    expect(calculatePrice).not.toHaveBeenCalled();
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
  it('should take trade in price from bike part when newly not required', () => {
    const quotePart = {
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const validatedQuotePart = {
      id: 12,
      not_required: true,
      partType: '2',
      _partType: partType2,
      _bikePart: { trade_in_price: 23.5 },
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const expectedQuotePart = {
      id: 12,
      partType: '2',
      not_required: true,
      trade_in_price: 23.5,
      part_price: 23.0,
      supplier: 4,
      _partType: partType2,
      _bikePart: { trade_in_price: 23.5 },
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const finalQuotePart = quotePartChanges(
      quotePart,
      validatedQuotePart,
      sampleSections,
      [],
      [],
      [],
    );
    expect(calculatePrice).toHaveBeenCalled();
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
  it('should not take trade in price from bike part when already not required', () => {
    const quotePart = {
      not_required: true,
      id: 12,
      partType: '2',
      _partType: partType2,
      part_desc: 'new part desc',
      _completePart: { id: 234 },
    };
    const validatedQuotePart = {
      id: 12,
      not_required: true,
      part_desc: 'new part desc',
      partType: '2',
      _partType: partType2,
      _bikePart: { trade_in_price: 23.5 },
      _completePart: { id: 234 },
      trade_in_price: '34.4',
    };
    const expectedQuotePart = {
      id: 12,
      partType: '2',
      not_required: true,
      part_desc: 'new part desc',
      trade_in_price: '34.4',
      _partType: partType2,
      _bikePart: { trade_in_price: 23.5 },
      _completePart: { id: 234 },
    };
    const finalQuotePart = quotePartChanges(
      quotePart,
      validatedQuotePart,
      sampleSections,
      [],
      [],
      [],
    );
    expect(calculatePrice).not.toHaveBeenCalled();
    expect(finalQuotePart).toEqual(expectedQuotePart);
  });
});
