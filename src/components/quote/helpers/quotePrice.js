import { findObjectWithId, updateObject } from '../../../helpers/utils';
import { toDecimal } from '../../app/model/helpers/model';
const addNumber = numberList => {
  let total = 0;
  numberList.forEach(number => {
    if (!Number.isNaN(Number.parseFloat(number))) {
      total = total + parseFloat(number);
    }
  });
  return toDecimal(total);
};
export const quotePrice = (quote, bike, charges) => {
  const quoteWithPrices = updateObject(quote);

  const oldCalculatedPrice = toDecimal(quote.calculated_price);
  let fixedPrices = [];
  let chargesPrices = [];
  let calcPrices = [];
  if (quote.bike) {
    if (quote.bike_price) {
      calcPrices.push(quote.bike_price);
    } else if (bike) {
      if (quote.club_member && bike.club_price) {
        quoteWithPrices.bike_price = bike.club_price;
        calcPrices.push(bike.club_price);
      } else if (bike.epic_price) {
        quoteWithPrices.bike_price = bike.epic_price;
        calcPrices.push(bike.epic_price);
      } else if (bike.rrp) {
        quoteWithPrices.bike_price = bike.rrp;
        calcPrices.push(bike.rrp);
      }
    }
  }

  if (quote.quoteParts) {
    quote.quoteParts.forEach(qp => {
      if (qp.total_price) {
        if (qp.fixed) {
          fixedPrices.push(qp.total_price);
        } else {
          calcPrices.push(qp.total_price);
        }
      }
    });
  }
  const newCalculatedPrice = addNumber(calcPrices);
  const fixedPriceTotal = addNumber(fixedPrices);
  if (newCalculatedPrice !== oldCalculatedPrice) {
    quoteWithPrices.quote_price = undefined;
  }
  let newTotal = addNumber([newCalculatedPrice, fixedPriceTotal]);
  if (quoteWithPrices.quote_price) {
    newTotal = addNumber([quoteWithPrices.quote_price, fixedPriceTotal]);
  }

  quoteWithPrices.charges = quote.charges
    ? quote.charges.map(charge => {
        const chargeSettings = findObjectWithId(charges, charge.charge);
        if (chargeSettings && chargeSettings.percentage) {
          return updateObject(charge, { price: (newTotal * chargeSettings.percentage) / 100 });
        }
        return charge;
      })
    : [];
  quoteWithPrices.charges.forEach(charge => {
    chargesPrices.push(charge.price);
  });

  quoteWithPrices.calculated_price = newCalculatedPrice;
  quoteWithPrices.fixed_price_total = fixedPriceTotal;
  quoteWithPrices.charges_total = addNumber(chargesPrices);
  if (quoteWithPrices.quote_price) {
    quoteWithPrices.total_price = addNumber([
      quoteWithPrices.quote_price,
      fixedPriceTotal,
      quoteWithPrices.charges_total,
    ]);
  } else {
    quoteWithPrices.total_price = addNumber([
      newCalculatedPrice,
      fixedPriceTotal,
      quoteWithPrices.charges_total,
    ]);
  }

  return quoteWithPrices;
};
