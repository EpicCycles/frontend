import {
  CHECKBOX,
  CURRENCY,
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  TEXT,
  TRADE_IN_PRICE_FIELD,
} from '../../app/model/helpers/fields';
import { updateObject } from '../../../helpers/utils';
import { attributePlaceholder } from '../../partType/helpers/partType';
import { TOTAL_PRICE_FIELD } from '../../quote/helpers/quoteFields';

export const NOT_REQUIRED_FIELD = {
  fieldName: 'not_required',
  header: "Not Req'd",
  type: CHECKBOX,
};
export const FIXED_PRICE_FIELD = {
  fieldName: 'fixed_price',
  header: 'Fixed Price',
  type: CHECKBOX,
};
export const PART_DESC_FIELD = {
  fieldName: 'part_desc',
  header: 'Part',
  type: TEXT,
  maxLength: 100,
  maxWidth: '250px',
  displaySize: 40,
  listId: 'parts-all',
};
export const PART_PRICE_FIELD = {
  fieldName: 'part_price',
  header: 'Price £',
  synonyms: [],
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
};
export const ADDITIONAL_DATA_FIELD = {
  fieldName: 'additional_data',
  header: 'Attributes',
  type: TEXT,
  maxLength: 100,
  displaySize: 20,
};
const disabledAttribute = { disabled: true };
export const NOT_REQUIRED_FIELD_DISABLED = updateObject(NOT_REQUIRED_FIELD, disabledAttribute);
export const ADDITIONAL_DATA_FIELD_DISABLED = updateObject(
  ADDITIONAL_DATA_FIELD,
  disabledAttribute,
);
export const PART_DESC_FIELD_DISABLED = updateObject(PART_DESC_FIELD, disabledAttribute);
export const PART_TYPE_FIELD_DISABLED = updateObject(PART_TYPE_FIELD, disabledAttribute);
export const QUANTITY_FIELD_DISABLED = updateObject(QUANTITY_FIELD, disabledAttribute);
export const PART_PRICE_FIELD_DISABLED = updateObject(PART_PRICE_FIELD, disabledAttribute);
export const TRADE_IN_PRICE_FIELD_DISABLED = updateObject(TRADE_IN_PRICE_FIELD, disabledAttribute);
export const FIXED_PRICE_FIELD_DISABLED = updateObject(FIXED_PRICE_FIELD, disabledAttribute);
export const SUPPLIER_FIELD_DISABLED = updateObject(SUPPLIER_FIELD_OPTIONAL, disabledAttribute);
export const QUOTE_PART_FOR_BIKE = [
  PART_TYPE_FIELD,
  NOT_REQUIRED_FIELD,
  TRADE_IN_PRICE_FIELD,
  PART_DESC_FIELD,
  FIXED_PRICE_FIELD,
  QUANTITY_FIELD,
  PART_PRICE_FIELD,
  SUPPLIER_FIELD_DISABLED,
  ADDITIONAL_DATA_FIELD,
  TOTAL_PRICE_FIELD,
];

export const QUOTE_PART_NON_BIKE = [
  PART_TYPE_FIELD,
  PART_DESC_FIELD,
  FIXED_PRICE_FIELD,
  QUANTITY_FIELD,
  PART_PRICE_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  ADDITIONAL_DATA_FIELD,
  TOTAL_PRICE_FIELD,
];
export const quotePartFields = (quotePart = {}, additionalProcessing, pricesRequired) => {
  const fields = [];
  const additionalActionAttribute = additionalProcessing
    ? { addDataMethod: additionalProcessing }
    : {};
  if (quotePart && (quotePart._bikePart || quotePart.id || quotePart._completePart)) {
    fields.push(PART_TYPE_FIELD_DISABLED);
  } else {
    fields.push(updateObject(PART_TYPE_FIELD, additionalActionAttribute));
  }
  const isBikeQuote = quotePart && quotePart._isBike;
  const mustHavePrices = !!pricesRequired;

  const required =
    quotePart._bikePart &&
    quotePart._partType &&
    (quotePart._partType.can_be_omitted || quotePart._partType.can_be_substituted);
  let desc = !!quotePart._partType;
  const part = quotePart._completePart;

  if (quotePart._bikePart && quotePart._partType) {
    desc = quotePart._partType.can_be_substituted;
  }

  if (isBikeQuote) {
    if (required) {
      fields.push(NOT_REQUIRED_FIELD);
      if (quotePart && quotePart.not_required) {
        const defaultTradePrice = quotePart._bikePart
          ? quotePart._bikePart.trade_in_price
          : undefined;
        fields.push(
          updateObject(
            TRADE_IN_PRICE_FIELD,
            { required: mustHavePrices, default: defaultTradePrice },
            additionalActionAttribute,
          ),
        );
      } else {
        fields.push(TRADE_IN_PRICE_FIELD_DISABLED);
      }
    } else {
      fields.push(NOT_REQUIRED_FIELD_DISABLED);
      fields.push(TRADE_IN_PRICE_FIELD_DISABLED);
    }
  }
  if (desc) {
    const mustHaveDesc = !quotePart._bikePart;
    fields.push(
      updateObject(
        PART_DESC_FIELD,
        { listId: `parts-${quotePart._partType.id}`, required: mustHaveDesc },
        additionalActionAttribute,
      ),
    );
  } else {
    fields.push(PART_DESC_FIELD_DISABLED);
  }

  if (part) {
    const attributes = attributePlaceholder(quotePart._partType);
    const additionalDataField = updateObject(
      ADDITIONAL_DATA_FIELD,
      {
        placeholder: attributes,
        title: attributes,
      },
      additionalActionAttribute,
    );
    fields.push(FIXED_PRICE_FIELD);
    fields.push(
      updateObject(QUANTITY_FIELD, { required: true, default: '1' }, additionalActionAttribute),
    );
    fields.push(
      updateObject(PART_PRICE_FIELD, { required: mustHavePrices }, additionalActionAttribute),
    );
    fields.push(updateObject(SUPPLIER_FIELD_OPTIONAL, additionalActionAttribute));
    fields.push(additionalDataField);
  } else {
    fields.push(FIXED_PRICE_FIELD_DISABLED);
    fields.push(QUANTITY_FIELD_DISABLED);
    fields.push(PART_PRICE_FIELD_DISABLED);
    fields.push(SUPPLIER_FIELD_DISABLED);
    fields.push(ADDITIONAL_DATA_FIELD_DISABLED);
  }
  fields.push(TOTAL_PRICE_FIELD);

  return fields;
};
