import { QUOTE_PRICE } from '../../app/model/helpers/fields';

const SAVE_CHANGES_REQD = 'Save all changes before quote can be issued';
const QUOTE_PRICE_REQD = 'A Quote Price should be entered';
const QUOTE_PART_PRICES_REQD = 'Parts need prices.';
const TRADE_IN_PRICES_REQD =
  'All bike parts that are not required must have a trade in price (which can be zero)';
const QUOTE_PARTS_REQD = 'At least one part must be present';

export const quoteIssueChecks = (updatedQuoteParts, quoteParts, quote, checkPrices) => {
  const problems = [];
  if (quote.changed || updatedQuoteParts.length > 0) problems.push(SAVE_CHANGES_REQD);
  if (checkPrices && !quote[QUOTE_PRICE]) problems.push(QUOTE_PRICE_REQD);

  const quotePartsForQuote = quoteParts.filter(qp => qp.quote === quote.id);
  if (!quote.bike) {
    if (quotePartsForQuote.length === 0) problems.push(QUOTE_PARTS_REQD);
    else if (!quotePartsForQuote.some(qp => qp.part)) problems.push(QUOTE_PARTS_REQD);
  }
  if (checkPrices && quotePartsForQuote.some(qp => qp.not_required && !qp.trade_in_price))
    problems.push(TRADE_IN_PRICES_REQD);
  if (checkPrices && quotePartsForQuote.some(qp => qp.part && !qp.part_price))
    problems.push(QUOTE_PART_PRICES_REQD);

  if (problems.length > 0) return problems;
};
