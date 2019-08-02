import { getModelKey } from '../../app/model/helpers/model';
import { CHARGE_NAME_FIELD } from './chargeFields';

export const chargeOptions = charges => {
  if (charges) {
    const chargesPersisted = charges.filter(charge => !!charge.id);
    return chargesPersisted.map(charge => {
      return {
        value: String(getModelKey(charge)),
        name: charge[CHARGE_NAME_FIELD.fieldName],
      };
    });
  }
  return [];
};
