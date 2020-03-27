import { isItAnObject, updateObject } from '../../../helpers/utils';
import { findPartWithDescription } from '../../part/helpers/part';

export const quotePartValidation = (updatedQuotePart, brands, parts) => {
  const validatedQuotePart = updateObject(updatedQuotePart);
  if (!validatedQuotePart.error_detail) validatedQuotePart.error_detail = {};
  // reset price if there is no part or this is not a replacement

  if (updatedQuotePart.omit) {
    if (!updatedQuotePart._partType.can_be_substituted) validatedQuotePart.desc = undefined;
  } else {
    validatedQuotePart.tradeIn = undefined;
  }

  if (validatedQuotePart.desc) {
    const _completePart = findPartWithDescription(
      validatedQuotePart.desc,
      validatedQuotePart.partType,
      parts,
      brands,
    );
    if (_completePart) {
      validatedQuotePart.part = _completePart.id;
    } else {
      validatedQuotePart.part = undefined;
    }
    validatedQuotePart._completePart = _completePart;
  } else {
    validatedQuotePart._completePart = undefined;
    validatedQuotePart.part = undefined;
    validatedQuotePart.qty = undefined;
    validatedQuotePart.price = undefined;
    validatedQuotePart.info = undefined;
  }

  validatedQuotePart.error = isItAnObject(validatedQuotePart.error_detail);
  return validatedQuotePart;
};
