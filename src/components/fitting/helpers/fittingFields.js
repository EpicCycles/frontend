import { SELECT_ONE, TEXT, UPD_BY_FIELD, UPD_DATE_FIELD } from '../../app/model/helpers/fields';
import { VALUE_MISSING } from '../../app/model/helpers/error';

export const FITTING_TYPE_CHOICES = [
  { value: 'C', name: 'Customer' },
  { value: 'E', name: 'Epic' },
];

export const FITTING_TYPE_FIELD = {
  fieldName: 'type',
  header: 'Source',
  required: true,
  error: VALUE_MISSING,
  type: SELECT_ONE,
  selectList: FITTING_TYPE_CHOICES,
};
export const SADDLE_HEIGHT_FIELD = {
  fieldName: 'saddle',
  header: 'Saddle height',
  required: true,
  error: VALUE_MISSING,
  type: TEXT,
  displaySize: 10,
  maxLength: 20,
  maxWidth: '20px',
};
export const BAR_HEIGHT = {
  fieldName: 'bar',
  header: 'Bar height',
  required: true,
  error: VALUE_MISSING,
  type: TEXT,
  displaySize: 10,
  maxLength: 20,
  maxWidth: '20px',
};
export const REACH_FIELD = {
  fieldName: 'reach',
  header: 'Reach',
  required: true,
  error: VALUE_MISSING,
  type: TEXT,
  displaySize: 10,
  maxLength: 20,
  maxWidth: '20px',
};
export const fittingFields = [FITTING_TYPE_FIELD, SADDLE_HEIGHT_FIELD, BAR_HEIGHT, REACH_FIELD];
