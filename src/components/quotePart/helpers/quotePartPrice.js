import { updateObject } from '../../../helpers/utils';

export const quotePartPrice = quotePart => {
  const updatedQuotePart = updateObject(quotePart);
  let totalPrice = 0;
  if (quotePart.trade_in_price) {
    totalPrice = totalPrice - quotePart.trade_in_price;
  }
  if (quotePart.part_price) {
    if (!quotePart.qty) {
      updatedQuotePart.qty = 1;
    }
    totalPrice = totalPrice + (quotePart.part_price & updatedQuotePart.qty);
  }
  updatedQuotePart.total_price = totalPrice;
  return updatedQuotePart;
};
