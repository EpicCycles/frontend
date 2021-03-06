import { displayForPartTypeAndQuote } from './display';

describe('displayForPartTypeAndQuote', () => {
  const quoteParts = [
    { id: 11, quote: 17, partType: 231, part: 1, omit: true },
    { id: 11, quote: 19, partType: 231, part: 1, omit: true },
    { id: 12, quote: 17, partType: 231 },
    { id: 92, quote: 17, part: 192, partType: 91 },
    { id: 9331, quote: 17, part: 19331, partType: 91 },
    { dummyKey: 'adummy', quote: 17, partType: 34, error_detail: { part: 'part is required' } },
  ];
  const quote = { id: 17, bike: 45, quoteParts };

  const bike = {
    bikeParts: [
      { partType: 231, partName: 'Part name 231' },
      { partType: 331, partName: 'Part name 331' },
      { partType: 631, partName: 'Part name 631' },
      { partType: 331, partName: 'Part name 331' },
    ],
  };
  const parts = [
    { id: 1, partType: 231 },
    { id: 2, partType: 331 },
    { id: 331, partType: 331 },
    { id: 192, partType: 91 },
    { id: 19331, partType: 91 },
    { id: 11, partType: 231 },
    { id: 31, partType: 331 },
    { id: 131, partType: 631 },
    { id: 331, partType: 631 },
  ];
  it('should return all a replacement part', () => {
    const partTypeId = 231;
    const expectedResult = {
      bikePart: { partType: 231, partName: 'Part name 231' },
      quotePart: { id: 11, quote: 17, partType: 231, part: 1, omit: true },
      replacementPart: { id: 1, partType: 231 },
      additionalParts: [{ id: 12, quote: 17, partType: 231 }],
    };
    expect(displayForPartTypeAndQuote(quote, partTypeId, bike, parts)).toEqual(expectedResult);
  });
  it('should return replacement parts when they have a dummy key only', () => {
    const partTypeId = 34;
    const expectedResult = {
      bikePart: undefined,
      quotePart: undefined,
      replacementPart: undefined,
      additionalParts: [
        { dummyKey: 'adummy', quote: 17, partType: 34, error_detail: { part: 'part is required' } },
      ],
    };
    expect(displayForPartTypeAndQuote(quote, partTypeId, bike, parts)).toEqual(expectedResult);
  });
  it('should return no values if none are found', () => {
    const partTypeId = 23;
    const expectedResult = {
      bikePart: undefined,
      quotePart: undefined,
      replacementPart: undefined,
      additionalParts: [],
    };
    expect(displayForPartTypeAndQuote(quote, partTypeId, bike, parts)).toEqual(expectedResult);
  });
  it('should return just a bike part when there are no matching quote parts', () => {
    const partTypeId = 631;
    const expectedResult = {
      bikePart: { partName: 'Part name 631', partType: 631 },
      quotePart: undefined,
      replacementPart: undefined,
      additionalParts: [],
    };
    expect(displayForPartTypeAndQuote(quote, partTypeId, bike, parts)).toEqual(expectedResult);
  });
  it('should return just additional parts when there are no matching quote parts', () => {
    const partTypeId = 91;
    const expectedResult = {
      bikePart: undefined,
      quotePart: undefined,
      replacementPart: undefined,
      additionalParts: [
        { id: 92, quote: 17, part: 192, partType: 91 },
        { id: 9331, quote: 17, part: 19331, partType: 91 },
      ],
    };
    expect(displayForPartTypeAndQuote(quote, partTypeId, bike, parts)).toEqual(expectedResult);
  });
});
