import { quoteIssueChecks } from './quoteIssueChecks';

const SAVE_CHANGES_REQD = 'Save all changes before quote can be issued';
const QUOTE_PRICE_REQD = 'A sub total should be entered for the quote.';
const QUOTE_PART_PRICES_REQD = 'Parts need prices.';
const TRADE_IN_PRICES_REQD =
  'All bike parts that are not required must have a trade in price (which can be zero)';
const QUOTE_PARTS_REQD = 'At least one part must be present';

describe('quoteIssueChecks', () => {
  it('should return quote price warning when quote is missing quote price', () => {
    const quote = { id: 'qb', bike: 23 };
    expect(quoteIssueChecks([], [], quote, true)).toEqual([QUOTE_PRICE_REQD]);
  });
  it('should return quote item warning when parts quote is missing parts', () => {
    const quote = { id: 'qb', quote_price: 1234 };
    expect(quoteIssueChecks([], [], quote)).toEqual([QUOTE_PARTS_REQD]);
  });
  it('should return quote item warning when parts quote has no parts', () => {
    const quote = { id: 'qb', quote_price: 1234 };
    const quoteParts = [{ quote: 'qb', partType: 2 }, { quote: 'qb', partType: 3 }];
    expect(quoteIssueChecks([], quoteParts, quote)).toEqual([QUOTE_PARTS_REQD]);
  });
  it('should message when unsaved changes to quote exist', () => {
    const quote = { id: 'qb', bike: 23, quote_price: 1234, changed: true };
    const updatedQuoteParts = [];
    expect(quoteIssueChecks(updatedQuoteParts, [], quote)).toEqual([SAVE_CHANGES_REQD]);
  });
  it('should message when unsaved changes to quote parts exist', () => {
    const quote = { id: 'qb', bike: 23, quote_price: 1234 };
    const updatedQuoteParts = [{ quote: 'qb', id: '1' }];
    expect(quoteIssueChecks(updatedQuoteParts, [], quote)).toEqual([SAVE_CHANGES_REQD]);
  });
  it('should return no warning when bike quote all ok', () => {
    const quote = { id: 'qb', bike: 23, quote_price: 1234 };
    const quoteParts = [
      { quote: 'qb', partType: 2, not_required: true, trade_in_price: 10 },
      { quote: 'qb', partType: 3, part: 234, part_price: 123.45 },
    ];
    expect(quoteIssueChecks([], quoteParts, quote)).toBeUndefined();
  });
  it('should return no warning when bike quote has no price', () => {
    const quote = { id: 'qb', bike: 23 };
    const quoteParts = [
      { quote: 'qb', partType: 2, not_required: true, trade_in_price: 10 },
      { quote: 'qb', partType: 3, part: 234, part_price: 123.45 },
    ];
    expect(quoteIssueChecks([], quoteParts, quote)).toBeUndefined();
  });
  it('should return no warning when bike quote replacement with no trade in', () => {
    const quote = { id: 'qb', bike: 23, quote_price: 1234 };
    const quoteParts = [
      { quote: 'qb', partType: 2, not_required: true },
      { quote: 'qb', partType: 3, part: 234, part_price: 123.45 },
    ];
    expect(quoteIssueChecks([], quoteParts, quote)).toBeUndefined();
  });
  it('should return no warning when parts quote missing prices', () => {
    const quote = { id: 'qb', quote_price: 1234 };
    const quoteParts = [{ quote: 'qb', partType: 2 }, { quote: 'qb', partType: 3, part: 234 }];
    expect(quoteIssueChecks([], quoteParts, quote)).toBeUndefined();
  });
  it('should return trade in price warning when bike quote missing those', () => {
    const quote = { id: 'qb', quote_price: 1234, bike: 23 };
    const quoteParts = [
      { quote: 'qb', partType: 2, not_required: true },
      { quote: 'qb', partType: 3 },
    ];
    expect(quoteIssueChecks([], quoteParts, quote, true)).toEqual([TRADE_IN_PRICES_REQD]);
  });
  it('should return part price warning when quote missing those', () => {
    const quote = { id: 'qb', quote_price: 1234 };
    const quoteParts = [
      { quote: 'qb', partType: 2, not_required: true, trade_in_price: 10 },
      { quote: 'qb', partType: 3, part: 234 },
    ];
    expect(quoteIssueChecks([], quoteParts, quote, true)).toEqual([QUOTE_PART_PRICES_REQD]);
  });
});
