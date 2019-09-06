import {
  answerTab,
  compareTab,
  customerTab,
  detailTab,
  historyTab,
  quoteListTab,
  quoteManagerTabs,
  summaryTab,
} from './quoteManagerTabs';
import { QUOTE_ARCHIVED, QUOTE_ISSUED, QUOTE_ORDERED } from './quote';

describe('quoteManagerTabs', () => {
  it('should return just customer and list tabs when no quote and no bike quotes', () => {
    const quotes = [];
    const quoteId = undefined;
    const expectedResult = {
      tabs: [customerTab, quoteListTab],
      defaultTab: quoteListTab.tabValue,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
  it('should return bike list tabs when bike quotes in list', () => {
    const quotes = [{ id: 16, bike: 53 }];
    const quoteId = 12;
    const expectedResult = {
      tabs: [customerTab, quoteListTab, compareTab],
      defaultTab: quoteListTab.tabValue,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
  it('should show summary tab when quote is issued as default', () => {
    const quotes = [{ id: 16, bike: 53 }, { id: 12, bike: 14, quote_status: QUOTE_ISSUED }];
    const quoteId = 12;
    const expectedResult = {
      tabs: [customerTab, quoteListTab, summaryTab, answerTab, detailTab, historyTab, compareTab],
      defaultTab: summaryTab.tabValue,
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
      tabs: [customerTab, quoteListTab, summaryTab, answerTab, detailTab, historyTab, compareTab],
      defaultTab: summaryTab.tabValue,
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
      tabs: [customerTab, quoteListTab, detailTab, historyTab, compareTab],
      defaultTab: detailTab.tabValue,
    };
    expect(quoteManagerTabs(quotes, quoteId)).toEqual(expectedResult);
  });
});
