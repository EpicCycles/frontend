import { isItAnObject, updateObject } from '../../../helpers/utils';
import { findPartWithDescription } from '../../part/helpers/part';

export const quotePartValidation = (updatedQuotePart, brands, parts) => {
  const validatedQuotePart = updateObject(updatedQuotePart);
  if (!validatedQuotePart.error_detail) validatedQuotePart.error_detail = {};
  // reset price if there is no part or this is not a replacement

  if (updatedQuotePart.not_required) {
    if (!updatedQuotePart._partType.can_be_substituted) validatedQuotePart.part_desc = undefined;
  } else {
    validatedQuotePart.trade_in_price = undefined;
  }

  if (validatedQuotePart.part_desc) {
    const _completePart = findPartWithDescription(
      validatedQuotePart.part_desc,
      validatedQuotePart.partType,
      parts,
      brands,
    );
    if (!_completePart)
      validatedQuotePart.error_detail.part_desc =
        'Please include a brand in the part name to add this part.';
    validatedQuotePart._completePart = _completePart;
  } else {
    validatedQuotePart._completePart = undefined;
  }

  if (! validatedQuotePart._completePart) {
    validatedQuotePart.quantity = undefined;
    validatedQuotePart.part_price = undefined;
    validatedQuotePart.additional_data = undefined;
  }

  validatedQuotePart.error = isItAnObject(validatedQuotePart.error_detail);
  return validatedQuotePart;
};
