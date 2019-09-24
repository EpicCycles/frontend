import { ARCHIVED, BRAND, CHECKBOX, TEXT } from '../../app/model/helpers/fields';
export const REQUIRE_VALUES = 'Search criteria must be entered';
export const bikeSearchData = (updatedValue, fullModelData) => {
  if (!fullFields.some(field => field.searchField && !!fullModelData[field.fieldName]))
    return REQUIRE_VALUES;
};
const brandField = {
  fieldName: BRAND,
  header: 'Brand: ',
  displayName: 'Brand:',
  type: BRAND,
  validator: bikeSearchData,
  searchField: true,
  bikeOnly: true,
};
const frameNameField = {
  validator: bikeSearchData,
  displayName: 'Frame Name like:',
  header: 'Frame Name like:',
  fieldName: 'frameName',
  searchField: true,
  type: TEXT,
};
const archivedSelectField = {
  header: 'Include archived Frames:',
  displayName: 'Include archived Frames:',
  fieldName: ARCHIVED,
  type: CHECKBOX,
};
const fullFields = [brandField, frameNameField, archivedSelectField];
const partialFields = [brandField, frameNameField, archivedSelectField];

export const bikeSearchFields = canSelectArchived => {
  if (canSelectArchived) return fullFields;
  return partialFields;
};
