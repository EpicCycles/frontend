import { TEXT } from '../../app/model/helpers/fields';

export const REQUIRE_VALUES = 'Search criteria must be entered';
export const SEARCH_LENGTH = 'Search criteria should be at least 2 characters long';
export const EMAIL_ERROR = 'Please enter at least 4 characters of email address with no spaces';

export const searchFieldsHaveData = (updatedValue, fullModelData) => {
  if (updatedValue && updatedValue.length < 2) return SEARCH_LENGTH;
  if (!customerSearchFields.some(field => !!fullModelData[field.fieldName])) return REQUIRE_VALUES;
};
export const searchEmailValidator = (email, fullModelData) => {
  if (email) {
    const regex = /[^\w]/g;

    const emailCleaned = email.replace(regex, '');
    if (emailCleaned.length < 4) {
      return EMAIL_ERROR;
    }
    return;
  }
  return searchFieldsHaveData(email, fullModelData);
};

export const customerSearchFields = [
  {
    header: 'First name like:',
    displayName: 'First name like:',
    fieldName: 'firstName',
    type: TEXT,
    displaySize: 20,
    maxLength: 60,
    placeholder: 'first name or part',
    validator: searchFieldsHaveData,
  },
  {
    header: 'Last name like:',
    displayName: 'Last name like:',
    fieldName: 'lastName',
    displaySize: 20,
    maxLength: 60,
    type: TEXT,
    placeholder: 'last name or part',
    validator: searchFieldsHaveData,
  },
  {
    header: 'email name like:',
    displaySize: 20,
    maxLength: 60,
    displayName: 'email name like:',
    fieldName: 'email',
    type: TEXT,
    placeholder: 'email or part',
    validator: searchEmailValidator,
  },
];
