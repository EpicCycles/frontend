import {
  CHECKBOX,
  EMAIL_FIELD,
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  TEXT,
} from '../../app/model/helpers/fields';
//'is_staff', 'is_active', 'is_superuser'
export const STAFF_FIELD = {
  fieldName: 'is_staff',
  header: 'Staff',
  type: CHECKBOX,
  readOnly: true,
};
export const ADMIN_FIELD = {
  fieldName: 'is_superuser',
  header: 'Admin',
  type: CHECKBOX,
  readOnly: true,
};
export const USER_NAME_FIELD = {
  fieldName: 'username',
  header: 'Login Id',
  type: TEXT,
  readOnly: true,
};

export const userFields = [
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  EMAIL_FIELD,
  USER_NAME_FIELD,
  STAFF_FIELD,
  ADMIN_FIELD,
];
