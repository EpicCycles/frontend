import { stringToAlphanumeric } from '../../../../helpers/stringToAlphanumerics';

export const matchOnField = (modelArray, fieldName, value) => {
  const valueToCheck = value.trim().toLowerCase();
  //first find an exact match
  const exactMatch = modelArray.find(
    part => part[fieldName] && part[fieldName].trim().toLowerCase() === valueToCheck,
  );
  if (exactMatch) return exactMatch;

  //strip out all except numbers and letters and check
  const refinedValue = stringToAlphanumeric(valueToCheck);
  return modelArray.find(
    part => part[fieldName] && stringToAlphanumeric(part[fieldName]).toLowerCase() === refinedValue,
  );
};
