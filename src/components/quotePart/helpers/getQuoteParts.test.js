import { getQuoteParts } from './getQuoteParts';
import { partType1, partType2, sampleBrands, sampleSections } from '../../../helpers/sampleData';
import { buildPartString } from '../../part/helpers/part';
const nonBikeQuote = { id: 'nbq', bike: undefined };
const bikeQuote = { id: 'bq', bike: 57 };

const part65 = {
  id: 65,
  part_name: 'A-Head Tapered Cartridge aluminium',
  trade_in_price: null,
  standard: false,
  stocked: false,
  partType: 3,
  brand: 3,
};
const part73 = {
  id: 73,
  part_name: 'Part 73',
  trade_in_price: null,
  standard: false,
  stocked: false,
  partType: 1,
  brand: 3,
};
const part74 = {
  id: 74,
  part_name: 'Part 74',
  trade_in_price: null,
  standard: false,
  stocked: false,
  partType: 2,
  brand: 3,
};
const part74Replacement = {
  id: 741,
  part_name: 'Part name',
  trade_in_price: null,
  standard: false,
  stocked: false,
  partType: 2,
  brand: 7,
};

describe('getQuoteParts', () => {
  describe('non bike quotes', () => {
    it('should return an empty array when not a bike quote and no quote parts', () => {
      expect(getQuoteParts(nonBikeQuote, sampleSections, [], [], [], [])).toEqual([]);
    });
    it('should return quote parts when some are present', () => {
      const parts = [part65, part74, part73, part74Replacement];
      const quoteParts = [
        { quote: 'nbq', id: 'qp1', partType: 2, part: part74Replacement.id, quantity: 1 },
      ];
      const expectedResults = [
        {
          quote: 'nbq',
          _isBike: false,
          part_desc: buildPartString(part74Replacement, sampleBrands),
          id: 'qp1',
          part: part74Replacement.id,
          _completePart: part74Replacement,
          partType: 2,
          quantity: 1,
          _partType: partType2,
        },
      ];
      expect(
        getQuoteParts(nonBikeQuote, sampleSections, quoteParts, [], parts, sampleBrands),
      ).toEqual(expectedResults);
    });
    it('should return quote parts when they have no part type', () => {
      const parts = [part65, part74, part73, part74Replacement];
      const quoteParts = [
        { quote: 'nbq', dummyKey: 'newPart' },
        { quote: 'bq', dummyKey: 'newPartignore' },
      ];
      const expectedResults = [
        {
          quote: 'nbq',
          _isBike: false,
          dummyKey: 'newPart',
        },
      ];
      expect(
        getQuoteParts(nonBikeQuote, sampleSections, quoteParts, [], parts, sampleBrands),
      ).toEqual(expectedResults);
    });
  });
  describe('bike quotes', () => {
    it('should return bike parts when no quote parts exist for a bike quote', () => {
      const bikeParts = [
        { id: 'bp1', bike: 57, part: 73 },
        { id: 'bp2', bike: 57, part: 74 },
      ];
      const parts = [part65, part74, part73];
      const expectedResults = [
        {
          quote: 'bq',
          _isBike: true,
          dummyKey: 'bikePart_73',
          partType: 1,
          _bikePart: part73,
          _partType: partType1,
        },
        {
          quote: 'bq',
          _isBike: true,
          dummyKey: 'bikePart_74',
          partType: 2,
          _bikePart: part74,
          _partType: partType2,
        },
      ];
      expect(getQuoteParts(bikeQuote, sampleSections, [], bikeParts, parts, sampleBrands)).toEqual(
        expectedResults,
      );
    });
    it('should return quote part when replacement part exists', () => {
      const bikeParts = [
        { id: 'bp1', bike: 57, part: 73 },
        { id: 'bp2', bike: 57, part: 74 },
      ];
      const parts = [part65, part74, part73, part74Replacement];
      const quoteParts = [
        { quote: 'bq', id: 'qp1', partType: 2, not_required: true, part: 741, quantity: 1 },
      ];
      const expectedResults = [
        {
          quote: 'bq',
          partType: 1,
          _isBike: true,
          dummyKey: 'bikePart_73',
          _bikePart: part73,
          _partType: partType1,
        },
        {
          quote: 'bq',
          _isBike: true,
          _completePart: part74Replacement,
          part_desc: buildPartString(part74Replacement, sampleBrands),
          id: 'qp1',
          not_required: true,
          part: 741,
          quantity: 1,
          partType: 2,
          _bikePart: part74,
          _partType: partType2,
        },
      ];
      expect(
        getQuoteParts(bikeQuote, sampleSections, quoteParts, bikeParts, parts, sampleBrands),
      ).toEqual(expectedResults);
    });
    it('should return quote part when part not required', () => {
      const bikeParts = [
        { id: 'bp1', bike: 57, part: 73 },
        { id: 'bp2', bike: 57, part: 74 },
      ];
      const parts = [part65, part74, part73, part74Replacement];
      const quoteParts = [{ quote: 'bq', id: 'qp1', partType: 2, not_required: true }];
      const expectedResults = [
        {
          quote: 'bq',
          partType: 1,
          _isBike: true,
          dummyKey: 'bikePart_73',
          _bikePart: part73,
          _partType: partType1,
        },
        {
          quote: 'bq',
          _isBike: true,
          id: 'qp1',
          partType: 2,
          not_required: true,
          _bikePart: part74,
          _partType: partType2,
        },
      ];
      expect(
        getQuoteParts(bikeQuote, sampleSections, quoteParts, bikeParts, parts, sampleBrands),
      ).toEqual(expectedResults);
    });
    it('should return quote part when not a replacement part and no part', () => {
      const bikeParts = [
        { id: 'bp1', bike: 57, part: 73 },
        { id: 'bp2', bike: 57, part: 74 },
      ];
      const parts = [part65, part74, part73, part74Replacement];
      const quoteParts = [{ quote: 'bq', id: 'qp1', partType: 2 }];
      const expectedResults = [
        {
          quote: 'bq',
          _isBike: true,
          dummyKey: 'bikePart_73',
          partType: 1,
          _bikePart: part73,
          _partType: partType1,
        },
        {
          quote: 'bq',
          _isBike: true,
          partType: 2,
          _bikePart: part74,
          _partType: partType2,
          dummyKey: 'bikePart_74',
        },
        {
          quote: 'bq',
          _isBike: true,
          id: 'qp1',
          partType: 2,
          _partType: partType2,
        },
      ];
      expect(
        getQuoteParts(bikeQuote, sampleSections, quoteParts, bikeParts, parts, sampleBrands),
      ).toEqual(expectedResults);
    });
  });
  it('should return quote part when not a replacement part', () => {
    const bikeParts = [
      { id: 'bp1', bike: 57, part: 73 },
      { id: 'bp2', bike: 57, part: 74 },
    ];
    const parts = [part65, part74, part73, part74Replacement];
    const quoteParts = [
      { quote: 'bq', id: 'qp1', partType: 2, part: part74Replacement.id, quantity: 1 },
    ];
    const expectedResults = [
      {
        quote: 'bq',
        _isBike: true,
        dummyKey: 'bikePart_73',
        partType: 1,
        _bikePart: part73,
        _partType: partType1,
      },
      {
        quote: 'bq',
        _isBike: true,
        partType: 2,
        _bikePart: part74,
        _partType: partType2,
        dummyKey: 'bikePart_74',
      },
      {
        quote: 'bq',
        _isBike: true,
        part_desc: buildPartString(part74Replacement, sampleBrands),
        _completePart: part74Replacement,
        id: 'qp1',
        part: 741,
        partType: 2,
        quantity: 1,
        _partType: partType2,
      },
    ];
    expect(
      getQuoteParts(bikeQuote, sampleSections, quoteParts, bikeParts, parts, sampleBrands),
    ).toEqual(expectedResults);
  });
  it('should return quote part when no part type', () => {
    const bikeParts = [
      { id: 'bp1', bike: 57, part: 73 },
      { id: 'bp2', bike: 57, part: 74 },
    ];
    const parts = [part65, part74, part73, part74Replacement];
    const quoteParts = [
      { quote: 'bq', id: 'qp1', partType: 2, part: part74Replacement.id, quantity: 1 },
      { quote: 'bq', dummyKey: 'nopt' },
      { quote: 'nbq', dummyKey: 'noptignre' },
    ];
    const expectedResults = [
      {
        quote: 'bq',
        _isBike: true,
        dummyKey: 'bikePart_73',
        partType: 1,
        _bikePart: part73,
        _partType: partType1,
      },
      {
        quote: 'bq',
        _isBike: true,
        partType: 2,
        _bikePart: part74,
        _partType: partType2,
        dummyKey: 'bikePart_74',
      },
      {
        quote: 'bq',
        _isBike: true,
        part_desc: buildPartString(part74Replacement, sampleBrands),
        _completePart: part74Replacement,
        id: 'qp1',
        part: 741,
        partType: 2,
        quantity: 1,
        _partType: partType2,
      },
      {
        quote: 'bq',
        _isBike: true,
        dummyKey: 'nopt',
      },
    ];
    expect(
      getQuoteParts(bikeQuote, sampleSections, quoteParts, bikeParts, parts, sampleBrands),
    ).toEqual(expectedResults);
  });
});
