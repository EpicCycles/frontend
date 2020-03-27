import {
  CHECKBOX,
  CURRENCY,
  PART_TYPE,
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  TEXT,
} from '../../app/model/helpers/fields';
import { updateObject } from '../../../helpers/utils';
import { attributePlaceholder } from '../../partType/helpers/partType';
import { TOTAL_PRICE_FIELD } from '../../quote/helpers/quoteFields';

export const OMIT_FIELD = {
  fieldName: 'omit',
  header: "Not Req'd",
  type: CHECKBOX,
};
export const FIXED_FIELD = {
  fieldName: 'fixed',
  header: 'Fixed Price',
  type: CHECKBOX,
};
export const DESC_FIELD = {
  fieldName: 'desc',
  header: 'Part',
  type: TEXT,
  maxLength: 100,
  maxWidth: '250px',
  displaySize: 40,
  listId: 'parts-all',
};
export const PART_PRICE_FIELD = {
  fieldName: 'price',
  header: 'Price £',
  synonyms: [],
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
};
export const INFO_FIELD = {
  fieldName: 'info',
  header: 'Attributes',
  type: TEXT,
  maxLength: 100,
  displaySize: 20,
};
export const TRADE_IN_FIELD = {
  fieldName: 'tradeIn',
  header: 'Trade In £',
  type: CURRENCY,
  displaySize: 5,
  maxLength: 10,
};
const disabledAttribute = { disabled: true };
export const OMIT_FIELD_DISABLED = updateObject(OMIT_FIELD, disabledAttribute);
export const INFO_FIELD_DISABLED = updateObject(INFO_FIELD, disabledAttribute);
export const DESC_FIELD_DISABLED = updateObject(DESC_FIELD, disabledAttribute);
export const PART_TYPE_FIELD_DISABLED = updateObject(PART_TYPE_FIELD, disabledAttribute);
export const QUANTITY_FIELD_DISABLED = updateObject(QUANTITY_FIELD, disabledAttribute);
export const PART_PRICE_FIELD_DISABLED = updateObject(PART_PRICE_FIELD, disabledAttribute);
export const TRADE_IN_FIELD_DISABLED = updateObject(TRADE_IN_FIELD, disabledAttribute);
export const FIXED_FIELD_DISABLED = updateObject(FIXED_FIELD, disabledAttribute);
export const SUPPLIER_FIELD_DISABLED = updateObject(SUPPLIER_FIELD_OPTIONAL, disabledAttribute);
export const QUOTE_PART_FOR_BIKE = [
  PART_TYPE_FIELD,
  OMIT_FIELD,
  TRADE_IN_FIELD,
  DESC_FIELD,
  FIXED_FIELD,
  QUANTITY_FIELD,
  PART_PRICE_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  INFO_FIELD,
  TOTAL_PRICE_FIELD,
];

export const QUOTE_PART_NON_BIKE = [
  PART_TYPE_FIELD,
  DESC_FIELD,
  FIXED_FIELD,
  QUANTITY_FIELD,
  PART_PRICE_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  INFO_FIELD,
  TOTAL_PRICE_FIELD,
];
export const quotePartFields = (
  modelFields,
  quotePart = {},
  additionalProcessing,
  pricesRequired,
) => {
  const mustHavePrices = !!pricesRequired;

  let desc = !!quotePart._partType;
  const part = quotePart._completePart;
  if (quotePart._bikePart && quotePart._partType) {
    desc = quotePart._partType.can_be_substituted;
  }

  return modelFields.map(field => {
    const updatedField = updateObject(field);
    switch (field.fieldName) {
      case PART_TYPE:
        if (quotePart && (quotePart._bikePart || quotePart._completePart)) {
          updatedField.disabled = true;
        }
        break;
      case 'omit':
        if (!(quotePart._bikePart && quotePart._partType.can_be_substituted)) {
          updatedField.disabled = true;
        }
        break;
      case 'tradeIn':
        if (!quotePart.omit) {
          updatedField.disabled = true;
        } else {
          const defaultTradePrice = quotePart._bikePart
            ? quotePart._bikePart.trade_in_price
            : undefined;
          updatedField.required = mustHavePrices;
          updatedField.default = defaultTradePrice;
        }
        break;
      case 'desc':
        if (desc) {
          updatedField.listId = `parts-${quotePart._partType.id}`;
          updatedField.required = !!quotePart._partType && !quotePart.omit;
        } else {
          updatedField.disabled = true;
        }
        break;
      case 'info':
        if (quotePart.desc || part) {
          const attributes = attributePlaceholder(quotePart._partType);
          updatedField.placeholder = attributes;
          updatedField.title = attributes;
        } else {
          updatedField.disabled = true;
        }
        break;
      case 'qty':
        if (quotePart.desc || part) {
          updatedField.required = true;
          updatedField.default = 1;
        } else {
          updatedField.disabled = true;
        }
        break;
      case 'price':
        if (quotePart.desc || part) {
          updatedField.required = mustHavePrices;
        } else {
          updatedField.disabled = true;
        }
        break;
      default:
        if (!updatedField.readOnly) {
          if (!(quotePart.desc || part)) {
            updatedField.disabled = true;
          }
        }
    }
    if (!(updatedField.disabled || updatedField.readOnly)) {
      if (additionalProcessing) {
        updatedField.addDataMethod = additionalProcessing;
      }
    }
    return updatedField;
  });
};
