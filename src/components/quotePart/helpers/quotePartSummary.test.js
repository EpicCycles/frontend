import { quotePartSummary } from './quotePartSummary';

describe('quotePartSummary', () => {
  it('should return the part description when no quote part is present', () => {
    const bikePart = { brand_name: 'Brand 1', part_name: 'Bike Part' };
    expect(quotePartSummary(bikePart)).toBe('Brand 1 Bike Part');
  });
  it('should return the missing description when quote part is not a replacement', () => {
    const bikePart = { brand_name: 'Brand 1', part_name: 'Bike Part' };
    const quotePart = { part: 6, not_required: true };
    expect(quotePartSummary(bikePart, quotePart)).toBe('**** Not Required ****');
  });
  it('should return the replacement part description when quote part is a replacement', () => {
    const bikePart = { brand_name: 'Brand 1', part_name: 'Bike Part' };
    const quotePart = { part: 6, not_required: true };
    const replacementPart = { id: 6, brand_name: 'Brand 2', part_name: 'other Part' };
    expect(quotePartSummary(bikePart, quotePart, replacementPart)).toBe(
      '**** Brand 2 other Part ****',
    );
  });
  it('should return no qty and description when quote part has no quantity', () => {
    const bikePart = { brand_name: 'Brand 1', part_name: 'Bike Part' };
    const quotePart = { part: 6, not_required: true };
    const replacementPart = { id: 6, brand_name: 'Brand 2', part_name: 'other Part' };
    expect(quotePartSummary(bikePart, quotePart, replacementPart)).toBe(
      '**** Brand 2 other Part ****',
    );
  });
  it('should return qty and description when quote part has a quantity', () => {
    const bikePart = { brand_name: 'Brand 1', part_name: 'Bike Part' };
    const quotePart = { part: 6, not_required: true, quantity: 2 };
    const replacementPart = { id: 6, brand_name: 'Brand 2', part_name: 'other Part' };
    expect(quotePartSummary(bikePart, quotePart, replacementPart)).toBe(
      '**** Brand 2 other Part (qty 2) ****',
    );
  });
});
