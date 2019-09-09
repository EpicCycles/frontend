import { updateObject } from '../../../helpers/utils';
const NOT_BOTH_PRICES = 'Either a price or a percentage can be specified';

export const postUpdateProcessingCharge = charge => {
  const validatedCharge = updateObject(charge);
  if (!validatedCharge.error_detail) validatedCharge.error_detail = {};

  if (validatedCharge.price && validatedCharge.percentage) {
    validatedCharge.error_detail.price = NOT_BOTH_PRICES;
    validatedCharge.error_detail.percentage = NOT_BOTH_PRICES;
  }
  return validatedCharge;
};
