import { updateObject } from '../../../helpers/utils';
import { getPartType } from '../../partType/helpers/partType';
import { calculatePrice } from '../../part/helpers/price';
import { quotePartValidation } from './quotePartValidation';
import { textToNumber } from '../../../helpers/textToNumber';

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
      updatedQuotePart._partType.id !== textToNumber(updatedQuotePart.partType))
  )
    updatedQuotePart._partType = getPartType(updatedQuotePart.partType, sections);

  updatedQuotePart = quotePartValidation(updatedQuotePart, brands, parts);
  if (
    updatedQuotePart.part_desc !== quotePart.part_desc ||
    updatedQuotePart.not_required !== quotePart.not_required
  ) {
    updatedQuotePart = updateObject(
      updatedQuotePart,
      calculatePrice(!!updatedQuotePart._isBike, updatedQuotePart._completePart, supplierProducts),
    );
  }
  if (updatedQuotePart.not_required && updatedQuotePart.not_required !== quotePart.not_required) {
    updatedQuotePart.trade_in_price = updatedQuotePart._bikePart.trade_in_price;
  }
  return updatedQuotePart;
};
