import { updateObject } from '../../../helpers/utils';
import { getPartType } from '../../partType/helpers/partType';
import { calculatePrice } from '../../part/helpers/price';
import { quotePartValidation } from './quotePartValidation';
import { textToNumber } from '../../../helpers/textToNumber';
import { quotePartPrice } from './quotePartPrice';

export const quotePartChanges = (
  quotePart,
  validatedQuotePart,
  sections,
  brands,
  parts,
  supplierProducts,
) => {
  // first apply extended validation and field resetting
  let updatedQuotePart = updateObject(validatedQuotePart);
  if (
    updatedQuotePart.partType &&
    (!updatedQuotePart._partType ||
      updatedQuotePart._partType.id !== textToNumber(String(updatedQuotePart.partType)))
  ) {
    updatedQuotePart._partType = getPartType(updatedQuotePart.partType, sections);
  }

  updatedQuotePart = quotePartValidation(updatedQuotePart, brands, parts);
  if (updatedQuotePart.desc !== quotePart.desc) {
    updatedQuotePart = updateObject(
      updatedQuotePart,
      calculatePrice(!!updatedQuotePart._isBike, updatedQuotePart._completePart, supplierProducts),
    );
  }
  if (updatedQuotePart.omit) {
    if (!quotePart.omit) {
      updatedQuotePart.tradeIn = updatedQuotePart._bikePart.trade_in_price;
    }
  } else if (updatedQuotePart.tradeIn) {
    updatedQuotePart.tradeIn = undefined;
  }
  return quotePartPrice(updatedQuotePart);
};
