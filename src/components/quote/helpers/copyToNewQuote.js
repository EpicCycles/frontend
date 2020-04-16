import { quoteDescription } from './quote';
import { updateObject } from '../../../helpers/utils';
import { quotePrice } from './quotePrice';
import { quotePartPrice } from '../../quotePart/helpers/quotePartPrice';

export const copyToNewQuote = (quote, customer, bike, frames, brands, charges) => {
  if (customer.id === quote.customer && (!quote.bike || (bike && bike.id === quote.bike))) {
    return updateObject(quote, { id: undefined, version: quote.version ? quote.version + 1 : 1 });
  }

  const oldBikeId = quote.bike;
  const newBikeId = bike ? bike.id : undefined;
  const oldCustomerId = quote.customer;
  const newCustomerId = customer.id;
  const oldQuoteParts = quote.quoteParts || [];

  const quote_desc = quoteDescription(newCustomerId, newBikeId, [customer], frames, [bike], brands);
  const copiedQuote = updateObject(quote, {
    id: undefined,
    quote_desc,
    version: 1,
    customer: newCustomerId,
    bike: newBikeId,
  });
  copiedQuote.quoteParts = oldQuoteParts.map(qp => {
    const newQuotePart = updateObject(qp);
    if (qp.omit && bike && newBikeId !== oldBikeId) {
      const bikePart = bike.bikeParts.find(bp => bp.partType === qp.partType);
      if (!bikePart) {
        newQuotePart.omit = false;
      }
      newQuotePart.tradeIn = undefined;
    }
    return quotePartPrice(newQuotePart);
  });

  if (newCustomerId !== oldCustomerId) {
    copiedQuote.charges = [];
    copiedQuote.answers = [];
    copiedQuote.version = 1;
  } else {
    if (!copiedQuote.charges) copiedQuote.charges = [];
    if (!copiedQuote.answers) copiedQuote.answers = [];
  }
  if (quote.bike && newBikeId !== oldBikeId) {
    copiedQuote.bike_price = undefined;
    copiedQuote.version = 1;
  }
  return quotePrice(copiedQuote, bike, charges);
};
