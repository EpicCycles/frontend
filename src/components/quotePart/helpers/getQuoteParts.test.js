import { getQuoteParts } from './getQuoteParts';
import { partType1, partType2, sampleBrands, sampleSections } from '../../../helpers/sampleData';
import { buildPartString } from '../../part/helpers/part';
import { updateObject } from '../../../helpers/utils';
const nonBikeQuote = { id: 'nbq', bike: undefined };
const bikeQuote = { id: 'bq', bike: 57 };

const part65 = {
  id: 65,
  part_name: 'A-Head Tapered Cartridge aluminium',
  tradeIn: null,
  standard: false,
  stocked: false,
  partType: 3,
  brand: 3,
};
const part73 = {
  id: 73,
  part_name: 'Part 73',
  tradeIn: null,
  standard: false,
  stocked: false,
  partType: 1,
  brand: 3,
};
const part74 = {
  id: 74,
  part_name: 'Part 74',
  tradeIn: null,
  standard: false,
  stocked: false,
  partType: 2,
  brand: 3,
};
const part74Replacement = {
  id: 741,
  part_name: 'Part name',
  tradeIn: null,
  standard: false,
  stocked: false,
  partType: 2,
  brand: 7,
};

describe('getQuoteParts', () => {
  describe('non bike quotes', () => {
    it('should return an empty array when not a bike quote and no quote parts', () => {
      expect(getQuoteParts(nonBikeQuote, sampleSections, { bikeParts: [] }, [], [])).toEqual([]);
    });
    it('should return quote parts when some are present', () => {
      const parts = [part65, part74, part73, part74Replacement];
      const testQuote = updateObject(nonBikeQuote, {
        quoteParts: [{ id: 'qp1', partType: 2, part: part74Replacement.id, qty: 1 }],
      });
      const expectedResults = [
        {
          _isBike: false,
          desc: buildPartString(part74Replacement, sampleBrands),
          id: 'qp1',
          part: part74Replacement.id,
          _completePart: part74Replacement,
          partType: 2,
          qty: 1,
          _partType: partType2,
        },
      ];
      expect(getQuoteParts(testQuote, sampleSections, undefined, parts, sampleBrands)).toEqual(
        expectedResults,
      );
    });
    it('should return quote parts when they have no part type', () => {
      const parts = [part65, part74, part73, part74Replacement];
      const testQuote = updateObject(nonBikeQuote, {
        quoteParts: [{ dummyKey: 'newPart' }],
      });
      const expectedResults = [
        {
          _isBike: false,
          dummyKey: 'newPart',
        },
      ];
      expect(getQuoteParts(testQuote, sampleSections, undefined, parts, sampleBrands)).toEqual(
        expectedResults,
      );
    });
  });
  describe('bike quotes', () => {
    it('should return bike parts when no quote parts exist for a bike quote', () => {
      const bikeParts = [
        { id: 2, partType: 2, partName: 'part for bike 2' },
        { id: 1, partType: 1, partName: 'part for bike 1' },
      ];
      const parts = [part65, part74, part73];
      const expectedResults = [
        {
          _isBike: true,
          dummyKey: 'bikePart_1',
          partType: 1,
          _bikePart: { id: 1, partType: 1, partName: 'part for bike 1' },
          _partType: partType1,
        },
        {
          _isBike: true,
          dummyKey: 'bikePart_2',
          partType: 2,
          _bikePart: { id: 2, partType: 2, partName: 'part for bike 2' },
          _partType: partType2,
        },
      ];
      expect(getQuoteParts(bikeQuote, sampleSections, { bikeParts }, parts, sampleBrands)).toEqual(
        expectedResults,
      );
    });
    it('should return quote part when replacement part exists', () => {
      const bikeParts = [
        { id: 2, partType: 2, partName: 'part for bike 2' },
        { id: 1, partType: 1, partName: 'part for bike 1' },
      ];
      const parts = [part65, part74, part73, part74Replacement];
      const testQuote = updateObject(bikeQuote, {
        quoteParts: [{ id: 'qp1', partType: 2, omit: true, part: 741, qty: 1 }],
      });
      const expectedResults = [
        {
          desc: undefined,
          partType: 1,
          _isBike: true,
          dummyKey: 'bikePart_1',
          _bikePart: { id: 1, partType: 1, partName: 'part for bike 1' },
          _partType: partType1,
        },
        {
          _isBike: true,
          _completePart: part74Replacement,
          desc: buildPartString(part74Replacement, sampleBrands),
          id: 'qp1',
          omit: true,
          part: 741,
          qty: 1,
          partType: 2,
          _bikePart: { id: 2, partType: 2, partName: 'part for bike 2' },
          _partType: partType2,
        },
      ];
      const result = getQuoteParts(testQuote, sampleSections, { bikeParts }, parts, sampleBrands);
      expect(result).toHaveLength(2);
      expect(result).toEqual(expectedResults);
    });
    it('should return quote part when part not required', () => {
      const bikeParts = [
        { id: 2, partType: 2, partName: 'part for bike 2' },
        { id: 1, partType: 1, partName: 'part for bike 1' },
      ];
      const parts = [part65, part74, part73, part74Replacement];
      const testQuote = updateObject(bikeQuote, {
        quoteParts: [{ id: 'qp1', partType: 2, omit: true }],
      });
      const expectedResults = [
        {
          partType: 1,
          _isBike: true,
          dummyKey: 'bikePart_1',
          _bikePart: { id: 1, partType: 1, partName: 'part for bike 1' },
          _partType: partType1,
        },
        {
          _isBike: true,
          id: 'qp1',
          partType: 2,
          omit: true,
          _bikePart: { id: 2, partType: 2, partName: 'part for bike 2' },
          _partType: partType2,
        },
      ];
      expect(getQuoteParts(testQuote, sampleSections, { bikeParts }, parts, sampleBrands)).toEqual(
        expectedResults,
      );
    });
    it('should return quote part when not a replacement part and no part', () => {
      const bikeParts = [
        { id: 2, partType: 2, partName: 'part for bike 2' },
        { id: 1, partType: 1, partName: 'part for bike 1' },
      ];
      const parts = [part65, part74, part73, part74Replacement];
      const testQuote = updateObject(bikeQuote, {
        quoteParts: [{ id: 'qp1', partType: 2 }],
      });
      const expectedResults = [
        {
          desc: undefined,
          _isBike: true,
          dummyKey: 'bikePart_1',
          partType: 1,
          _bikePart: { id: 1, partType: 1, partName: 'part for bike 1' },
          _partType: partType1,
        },
        {
          _isBike: true,
          desc: undefined,
          partType: 2,
          _bikePart: { id: 2, partType: 2, partName: 'part for bike 2' },
          _partType: partType2,
          dummyKey: 'bikePart_2',
        },
        {
          _isBike: true,
          desc: undefined,
          id: 'qp1',
          partType: 2,
          _partType: partType2,
        },
      ];
      expect(getQuoteParts(testQuote, sampleSections, { bikeParts }, parts, sampleBrands)).toEqual(
        expectedResults,
      );
    });
  });
  it('should return quote part when not a replacement part', () => {
    const bikeParts = [
      { id: 2, partType: 2, partName: 'part for bike 2' },
      { id: 1, partType: 1, partName: 'part for bike 1' },
    ];
    const parts = [part65, part74, part73, part74Replacement];
    const testQuote = updateObject(bikeQuote, {
      quoteParts: [{ id: 'qp1', partType: 2, part: part74Replacement.id, qty: 1 }],
    });
    const expectedResults = [
      {
        _isBike: true,
        dummyKey: 'bikePart_1',
        partType: 1,
        _bikePart: { id: 1, partType: 1, partName: 'part for bike 1' },
        _partType: partType1,
      },
      {
        _isBike: true,
        partType: 2,
        _bikePart: { id: 2, partType: 2, partName: 'part for bike 2' },
        _partType: partType2,
        dummyKey: 'bikePart_2',
      },
      {
        _isBike: true,
        desc: buildPartString(part74Replacement, sampleBrands),
        _completePart: part74Replacement,
        id: 'qp1',
        part: 741,
        partType: 2,
        qty: 1,
        _partType: partType2,
      },
    ];
    expect(getQuoteParts(testQuote, sampleSections, { bikeParts }, parts, sampleBrands)).toEqual(
      expectedResults,
    );
  });
  it('should return quote part when no part type', () => {
    const bikeParts = [
      { id: 2, partType: 2, partName: 'part for bike 2' },
      { id: 1, partType: 1, partName: 'part for bike 1' },
    ];
    const parts = [part65, part74, part73, part74Replacement];
    const testQuote = updateObject(bikeQuote, {
      quoteParts: [
        { id: 'qp1', partType: 2, part: part74Replacement.id, qty: 1 },
        { dummyKey: 'nopt' },
      ],
    });
    const expectedResults = [
      {
        _isBike: true,
        dummyKey: 'bikePart_1',
        partType: 1,
        _bikePart: { id: 1, partType: 1, partName: 'part for bike 1' },
        _partType: partType1,
      },
      {
        _isBike: true,
        partType: 2,
        _bikePart: { id: 2, partType: 2, partName: 'part for bike 2' },
        _partType: partType2,
        dummyKey: 'bikePart_2',
      },
      {
        _isBike: true,
        desc: buildPartString(part74Replacement, sampleBrands),
        _completePart: part74Replacement,
        id: 'qp1',
        part: 741,
        partType: 2,
        qty: 1,
        _partType: partType2,
      },
      {
        _isBike: true,
        dummyKey: 'nopt',
      },
    ];
    expect(getQuoteParts(testQuote, sampleSections, { bikeParts }, parts, sampleBrands)).toEqual(
      expectedResults,
    );
  });
});
