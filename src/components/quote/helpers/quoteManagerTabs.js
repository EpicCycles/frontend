import { findObjectWithId } from '../../../helpers/utils';
import { QUOTE_ISSUED, QUOTE_ORDERED } from './quote';

export const customerTab = { tabText: 'Customer', tabValue: 1 };
export const quoteListTab = { tabText: 'Quote List', tabValue: 2 };
export const summaryTab = { tabText: 'Customer Summary', tabValue: 3 };
export const detailTab = { tabText: 'Quote Detail', tabValue: 4 };
export const historyTab = { tabText: 'QuoteHistory', tabValue: 5 };
export const compareTab = { tabText: 'Bike Quotes', tabValue: 6 };

export const quoteManagerTabs = (quotes, quoteId) => {
  let tabs = [customerTab, quoteListTab];
  let defaultTab = quoteListTab.tabValue;
  if (quoteId) {
    const quote = findObjectWithId(quotes, quoteId);
    if (quote) {
      if (quote.quote_status === QUOTE_ISSUED) {
        defaultTab = summaryTab.tabValue;
      } else {
        defaultTab = detailTab.tabValue;
      }
      if (quote.quote_status === QUOTE_ISSUED || quote.quote_status === QUOTE_ORDERED)
        tabs.push(summaryTab);
      tabs.push(detailTab);
      tabs.push(historyTab);
    }
  }
  if (quotes.find(q => q.bike)) tabs.push(compareTab);

  return { tabs, defaultTab };
};
