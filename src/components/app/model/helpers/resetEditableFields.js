import { removeKey, updateObject } from '../../../../helpers/utils';
import { getDefaultFieldValue } from './getDefaultFieldValue';
import { eliminateReadOnlyFields, validateModelAndSetErrors } from './model';

export const resetEditableFields = (model, modelFields) => {
  let returnModel = updateObject(model);
  const editableFields = eliminateReadOnlyFields(modelFields);
  editableFields.forEach(field => {
    const defaultValue = getDefaultFieldValue(field);
    if (defaultValue) returnModel[field.fieldName] = defaultValue;
    else returnModel = removeKey(returnModel, field.fieldName);
  });
  returnModel.error_detail = validateModelAndSetErrors(returnModel, modelFields);

  return returnModel;
};
