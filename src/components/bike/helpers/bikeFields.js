import {
  CLUB_PRICE_FIELD,
  COLOURS_FIELD,
  DESCRIPTION_FIELD,
  EPIC_PRICE_FIELD,
  MODEL_NAME_FIELD,
  PART_TYPE_FIELD,
  PRODUCT_CODE_FIELD,
  RRP_FIELD,
  SIZES_FIELD,
  TEXT,
} from '../../app/model/helpers/fields';
import { PART_NAME_MISSING } from '../../app/model/helpers/error';

export const bikeFields = [
  MODEL_NAME_FIELD,
  DESCRIPTION_FIELD,
  PRODUCT_CODE_FIELD,
  COLOURS_FIELD,
  RRP_FIELD,
  EPIC_PRICE_FIELD,
  CLUB_PRICE_FIELD,
  SIZES_FIELD,
];
export const bikePartFields = [
  PART_TYPE_FIELD,
  {
    fieldName: 'partName',
    header: 'Part Name',
    required: true,
    error: PART_NAME_MISSING,
    type: TEXT,
    displaySize: 40,
    maxLength: 200,
    maxWidth: '250px',
  },
];
