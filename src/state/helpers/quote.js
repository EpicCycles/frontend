import { updateObject } from '../../helpers/utils';

export const quoteToFrontEndFormat = quote => {
  const answers = JSON.parse(quote.answers);
  const charges = JSON.parse(quote.charges);
  const quoteParts = JSON.parse(quote.quoteParts);
  return updateObject(quote, { answers, charges, quoteParts });
};
export const quoteListToFrontEndFormat = quotes => {
  return quotes.map(quote => quoteToFrontEndFormat(quote));
};
