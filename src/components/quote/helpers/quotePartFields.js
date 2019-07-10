import {
  CHECKBOX,
  CLUB_PRICE_FIELD,
  CURRENCY,
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  TEXT,
  TICKET_PRICE_FIELD,
  TRADE_IN_PRICE_FIELD,
} from '../../app/model/helpers/fields';
import { updateObject } from '../../../helpers/utils';

export const NOT_REQUIRED_FIELD = {
  fieldName: 'not_required',
  header: "Not Req'd",
  type: CHECKBOX,
};
export const PART_DESC_FIELD = {
  fieldName: 'part_desc',
  header: 'Part',
  type: TEXT,
  maxLength: 100,
  displaySize: 40,
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
export const TICKET_PRICE_FIELD_DISABLED = updateObject(TICKET_PRICE_FIELD, disabledAttribute);
export const CLUB_PRICE_FIELD_DISABLED = updateObject(CLUB_PRICE_FIELD, disabledAttribute);

export const SUPPLIER_FIELD_DISABLED = updateObject(SUPPLIER_FIELD_OPTIONAL, disabledAttribute);
