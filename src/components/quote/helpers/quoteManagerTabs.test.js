import { quoteManagerTabs } from './quoteManagerTabs';
import {QUOTE_ARCHIVED, QUOTE_ISSUED, QUOTE_ORDERED} from './quote';

describe('quoteManagerTabs', () => {
  it('should return just customer and list tabs when no quote and no bike quotes', () => {
    const quotes = [];
    const quoteId = undefined;
    const expectedResult = {
      tabs: [{ tabText: 'Customer', tabValue: 1 }, { tabText: 'Quote List', tabValue: 2 }],
      defaultTab: 2,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
  it('should return bike list tabs when bike quotes in list', () => {
    const quotes = [{ id: 16, bike: 53 }];
    const quoteId = 12;
    const expectedResult = {
      tabs: [
        { tabText: 'Customer', tabValue: 1 },
        { tabText: 'Quote List', tabValue: 2 },
        { tabText: 'Bike Quotes', tabValue: 6 },
      ],
      defaultTab: 2,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
  it('should show summary tab when quote is issued as default', () => {
    const quotes = [{ id: 16, bike: 53 }, { id: 12, bike: 14, quote_status: QUOTE_ISSUED }];
    const quoteId = 12;
    const expectedResult = {
      tabs: [
        { tabText: 'Customer', tabValue: 1 },
        { tabText: 'Quote List', tabValue: 2 },
        { tabText: 'Customer Summary', tabValue: 3 },
        { tabText: 'Quote Detail', tabValue: 4 },
        { tabText: 'QuoteHistory', tabValue: 5 },
        { tabText: 'Bike Quotes', tabValue: 6 },
      ],
      defaultTab: 3,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
  it('should show summary tab when quote is ordered with detail as default', () => {
    const quotes = [
      { id: 16, bike: 53 },
      { id: 12, bike: 14, quote_status: QUOTE_ISSUED },
      { id: 121, bike: 14, quote_status: QUOTE_ORDERED },
    ];
    const quoteId = 121;
    const expectedResult = {
      tabs: [
        { tabText: 'Customer', tabValue: 1 },
        { tabText: 'Quote List', tabValue: 2 },
        { tabText: 'Customer Summary', tabValue: 3 },
        { tabText: 'Quote Detail', tabValue: 4 },
        { tabText: 'QuoteHistory', tabValue: 5 },
        { tabText: 'Bike Quotes', tabValue: 6 },
      ],
      defaultTab: 4,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
  it('should not show summary tab when quote is archived with detail as default', () => {
    const quotes = [
      { id: 16, bike: 53, quote_status: QUOTE_ARCHIVED },
      { id: 12, bike: 14, quote_status: QUOTE_ISSUED },
      { id: 121, bike: 14, quote_status: QUOTE_ORDERED },
    ];
    const quoteId = 16;
    const expectedResult = {
      tabs: [
        { tabText: 'Customer', tabValue: 1 },
        { tabText: 'Quote List', tabValue: 2 },
        { tabText: 'Quote Detail', tabValue: 4 },
        { tabText: 'QuoteHistory', tabValue: 5 },
        { tabText: 'Bike Quotes', tabValue: 6 },
      ],
      defaultTab: 4,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
});
