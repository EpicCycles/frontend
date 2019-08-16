import {
  CHECKBOX,
  CREATED_BY_FIELD,
  CREATED_DATE_FIELD,
  TEXT_AREA,
} from '../../app/model/helpers/fields';

export const CUSTOMER_VISIBLE = 'customer_visible';
export const NOTE_TEXT = 'note_text';
export const CUSTOMER_VISIBLE_FIELD = {
  fieldName: CUSTOMER_VISIBLE,
  type: CHECKBOX,
  header: 'Public',
};
export const SYSTEM_GENERATED_FIELD = {
  fieldName: 'system_generated',
  type: CHECKBOX,
  header: 'System Generated',
  readOnly: true,
};
export const NOTE_TEXT_FIELD = {
  fieldName: NOTE_TEXT,
  header: 'Note',
  type: TEXT_AREA,
  displaySize: 400,
};
export const customerNoteFields = [
  NOTE_TEXT_FIELD,
  CUSTOMER_VISIBLE_FIELD,
  SYSTEM_GENERATED_FIELD,
  CREATED_DATE_FIELD,
  CREATED_BY_FIELD,
];
