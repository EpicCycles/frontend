import { quotePartSummary } from './quotePartSummary';

describe('quotePartSummary', () => {
  const brands = [
    { id: 1, brand_name: 'Brand 1' },
    { id: 2, brand_name: 'Brand 2' },
  ];
  it('should return the part description when no quote part is present', () => {
    const bikePart = { partName: 'Brand 1 Bike Part' };
    expect(quotePartSummary(bikePart, undefined, undefined, brands)).toBe('Brand 1 Bike Part');
  });
  it('should return the missing description when quote part is not a replacement', () => {
    const bikePart = { partName: 'Brand 1 Bike Part' };
    const quotePart = { part: 6, not_required: true };
    expect(quotePartSummary(bikePart, quotePart, undefined, brands)).toBe('**** Not Required ****');
  });
  it('should return the replacement part description when quote part is a replacement', () => {
    const bikePart = { partName: 'Brand 1 Bike Part' };
    const quotePart = { part: 6, not_required: true };
    const replacementPart = { id: 6, brand: 2, part_name: 'other Part' };
    expect(quotePartSummary(bikePart, quotePart, replacementPart, brands)).toBe(
      '**** Brand 2 other Part ****',
    );
  });
  it('should return no qty and description when quote part has no quantity', () => {
    const bikePart = { partName: 'Brand 1 Bike Part' };
    const quotePart = { part: 6, not_required: true };
    const replacementPart = { id: 6, brand: 2, part_name: 'other Part' };
    expect(quotePartSummary(bikePart, quotePart, replacementPart, brands)).toBe(
      '**** Brand 2 other Part ****',
    );
  });
  it('should return qty and description when quote part has a quantity', () => {
    const bikePart = { partName: 'Brand 1 Bike Part' };
    const quotePart = { part: 6, not_required: true, quantity: 2 };
    const replacementPart = { id: 6, brand: 2, part_name: 'other Part' };
    expect(quotePartSummary(bikePart, quotePart, replacementPart, brands)).toBe(
      '**** Brand 2 other Part (qty 2) ****',
    );
  });
});
