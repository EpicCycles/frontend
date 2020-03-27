import { updateObject } from '../../helpers/utils';

export const quoteToFrontEndFormat = quote => {
  const answers = quote.answers ? JSON.parse(quote.answers) : [];
  const charges = quote.charges ? JSON.parse(quote.charges) : [];
  const quoteParts = quote.quoteParts ? JSON.parse(quote.quoteParts) : [];
  return updateObject(quote, { answers, charges, quoteParts });
};
export const quoteListToFrontEndFormat = quotes => {
  return quotes.map(quote => quoteToFrontEndFormat(quote));
};
