import { findObjectWithId } from '../../../helpers/utils';

export const chargeName = (chargeId, charges) => {
  if (!chargeId) return undefined;
  const charge = findObjectWithId(charges, chargeId);
  if (charge) return charge.charge_name;
  return 'Unknown Charge';
};
