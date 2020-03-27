import { VALUE_MISSING } from '../../app/model/helpers/error';
import { CURRENCY, SELECT_ONE } from '../../app/model/helpers/fields';
import { updateObject } from '../../../helpers/utils';
import { toDecimal, toInteger } from '../../app/model/helpers/model';

export const CHARGE = 'charge';
const validateQuotePrice = (value, fullModelData) => {
  if (fullModelData.charge && !value) return 'Price must be provided for a charge';
};
const populateChargePrice = (updatedModel, modelFields) => {
  if (updatedModel.charge && !updatedModel.price) {
    const charges = modelFields.find(field => field.fieldName === CHARGE).charges;
    const selectedCharge = charges.find(charge => charge.id === toInteger(updatedModel.charge));
    if (selectedCharge.price) {
      return updateObject(updatedModel, { price: toDecimal(selectedCharge.price) });
    }
  }
  return updatedModel;
};
const PRICE_FIELD = {
  fieldName: 'price',
  header: 'Charge £',
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
  validator: validateQuotePrice,
};
export const quoteChargeFieldsBasic = [{ fieldName: CHARGE }, { fieldName: 'price' }];
export const quoteChargeFields = charges => {
  const chargeField = {
    fieldName: CHARGE,
    header: 'Charge Type',
    required: true,
    error: VALUE_MISSING,
    type: SELECT_ONE,
    addDataMethod: populateChargePrice,
    selectList: charges.map(charge => {
      return { name: charge.charge_name, value: charge.id };
    }),
    charges,
  };

  return [chargeField, PRICE_FIELD];
};
