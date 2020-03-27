import { updateObject } from '../../../helpers/utils';

export const quotePartPrice = quotePart => {
  if (quotePart.tradeIn || (quotePart.price && quotePart.qty)) {
    const updatedQuotePart = updateObject(quotePart);
    let totalPrice = 0;
    if (quotePart.tradeIn) {
      totalPrice = totalPrice - quotePart.tradeIn;
    }
    if (quotePart.price) {
      if (!quotePart.qty) {
        updatedQuotePart.qty = 1;
      }
      totalPrice = totalPrice + quotePart.price * updatedQuotePart.qty;
    }
    updatedQuotePart.total_price = totalPrice;
    return updatedQuotePart;
  }

  return quotePart;
};
