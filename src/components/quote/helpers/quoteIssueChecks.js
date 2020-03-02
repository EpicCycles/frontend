import { QUOTE_PRICE } from './quoteFields';

const SAVE_CHANGES_REQD = 'Save all changes before quote can be issued';
const QUOTE_PRICE_REQD = 'A sub total should be entered for the quote.';
const QUOTE_PART_PRICES_REQD = 'Parts need prices.';
const QUOTE_CHARGE_PRICES_REQD = 'Charges need prices.';
const TRADE_IN_PRICES_REQD =
  'All bike parts that are not required must have a trade in price (which can be zero)';
const QUOTE_PARTS_REQD = 'At least one part must be present';

export const quoteIssueChecks = (quote, checkPrices) => {
  const problems = [];
  const { charges = [], quoteParts = [] } = quote;
  if (quote.changed) problems.push(SAVE_CHANGES_REQD);
  if (checkPrices && !quote[QUOTE_PRICE]) problems.push(QUOTE_PRICE_REQD);

  if (!quote.bike && quoteParts.length === 0) problems.push(QUOTE_PARTS_REQD);
  if (!quote.bike && quoteParts.some(qp => !(qp.part || qp.part_desc)))
    problems.push(QUOTE_PARTS_REQD);
  if (checkPrices && quoteParts.some(qp => qp.not_required && !qp.trade_in_price))
    problems.push(TRADE_IN_PRICES_REQD);
  if (checkPrices && quoteParts.some(qp => (qp.part || qp.part_desc) && !qp.part_price))
    problems.push(QUOTE_PART_PRICES_REQD);
  if (checkPrices && charges.some(qc => !qc.price)) problems.push(QUOTE_CHARGE_PRICES_REQD);

  if (problems.length > 0) return problems;
};
