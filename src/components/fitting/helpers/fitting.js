import { getNameForValue } from '../../app/model/helpers/model';
import { FITTING_TYPE_CHOICES, fittingFields } from './fittingFields';
const getFittingType = fittingType => {
  return getNameForValue(fittingType, FITTING_TYPE_CHOICES);
};
export const fittingText = fitting => {
  let valuesToShow = [];
  fittingFields.forEach(field => {
    if (!field.readOnly) {
      const fieldValue = fitting[field.fieldName] ? fitting[field.fieldName] : 'Unknown';
      if (field.fieldName === 'fitting_type') {
        valuesToShow.push(`(${getFittingType(fieldValue)})`);
      } else {
        valuesToShow.push(` ${field.header}: ${fieldValue}`);
      }
    }
  });
  return valuesToShow.join('');
};
