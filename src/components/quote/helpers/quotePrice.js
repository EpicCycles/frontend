import {findObjectWithId, updateObject} from '../../../helpers/utils';

export const quotePrice = (quote, bike, charges) => {
  const quoteWithPrices = updateObject(quote);

  const oldCalculatedPrice = quote.calculated_price;
  let newCalculatedPrice = 0;
  let fixedPriceTotal = 0;
  let charges_total = 0;
  if (quote.bike) {
    if (quote.bike_price) {
      newCalculatedPrice = newCalculatedPrice + quote.bike_price;
    } else if (quote.club_member && bike.club_price) {
      quote.bike_price = bike.club_price;
      newCalculatedPrice = newCalculatedPrice + bike.club_price;
    } else if (bike.epic_price) {
      quote.bike_price = quote.bike.epic_price;
      newCalculatedPrice = newCalculatedPrice + bike.epic_price;
    } else if (bike.rrp) {
      quote.bike_price = que.bike.rrp;
      newCalculatedPrice = newCalculatedPrice + quote.bike.rrp;
    }
  }

  quote.quoteParts.forEach(qp => {
    if (qp.fixed_price) {
      fixedPriceTotal = fixedPriceTotal + qp.totalPrice;
    } else {
      newCalculatedPrice = newCalculatedPrice + qp.totalPrice;
    }
  });

  if (newCalculatedPrice !== oldCalculatedPrice) {
    quote.quote_price = undefined;
  }
  let newTotal = newCalculatedPrice + fixedPriceTotal;
  if (quote.quote_price) {
    newTotal = quote.quote_price + fixedPriceTotal;
  }

  quoteWithPrices.charges = quote.charges.map(charge => {
    const chargeSettings = findObjectWithId(charges, charge.charge);
    if (chargeSettings.percentage) {
      return updateObject(charge, { price: (newTotal * chargeSettings.percentage) / 100 });
    }
    return charge;
  });
  quoteWithPrices.charges.forEach(charge => {
    quote.charges_total = quote.charges_total + charge.price;
  });

  quoteWithPrices.calculated_price = newCalculatedPrice;
  quoteWithPrices.fixed_price_total = fixedPriceTotal;
  quoteWithPrices.charges_total = charges_total;
  if (quoteWithPrices.quote_price) {
    quoteWithPrices.total_price = quoteWithPrices.quote_price + fixedPriceTotal + charges_total;
  } else {
    quoteWithPrices.total_price = newCalculatedPrice + fixedPriceTotal + charges_total;
  }

  return quoteWithPrices;
};
