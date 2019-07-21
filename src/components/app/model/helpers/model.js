import {
  doWeHaveObjects,
  generateRandomCode,
  isItAnObject,
  removeKey,
  updateObject,
} from '../../../../helpers/utils';
import { CHECKBOX, CURRENCY, NUMBER, SELECT_MULTIPLE, SELECT_ONE } from './fields';
import { INVALID_CURRENCY, INVALID_INTEGER, INVALID_NUMBER, VALUE_MISSING } from './error';
import { getDefaultFieldValue } from './getDefaultFieldValue';
import { textToNumber } from '../../../../helpers/textToNumber';

export const modelIsAlreadyInArray = (modelArray, modelToCheck, modelFields) => {
  if (!doWeHaveObjects(modelArray)) return false;
  return modelArray.some(
    modelInstance => !checkForChanges(modelFields, modelInstance, modelToCheck),
  );
};

export const createEmptyModelWithDefaultFields = fieldList => {
  let emptyModel = { dummyKey: generateRandomCode() };
  fieldList.forEach(field => {
    const defaultValue = getDefaultFieldValue(field);
    if (defaultValue) {
      emptyModel[field.fieldName] = defaultValue;
    }
  });
  return emptyModel;
};

export const eliminateReadOnlyFields = fieldList => {
  return fieldList.filter(field => !field.readOnly);
};

export const justReadOnlyFields = fieldList => {
  return fieldList.filter(field => field.readOnly);
};

export const checkForChanges = (fieldList, existingObject, newValues) => {
  return checkForChangesAllFields(eliminateReadOnlyFields(fieldList), existingObject, newValues);
};
export const checkForChangesAllFields = (fieldList, existingObject, newValues) => {
  return fieldList.some(field => {
    const existingValue = existingObject[field.fieldName];
    const newValue = newValues[field.fieldName];
    if (existingValue && newValue)
      switch (field.type) {
        case CURRENCY:
        case NUMBER:
        case SELECT_ONE:
          return textToNumber(String(existingValue)) !== textToNumber(String(newValue));
        case SELECT_MULTIPLE:
          if (Array.isArray(existingValue) && Array.isArray(newValue)) {
            if (existingValue.length !== newValue.length) return true;
            const existingArrayAsStrings = existingValue.map(eachValue => String(eachValue));
            const newArrayAsStrings = newValue.map(eachValue => String(eachValue));
            return newArrayAsStrings.some(
              stringValue => !existingArrayAsStrings.includes(stringValue),
            );
          } else if (Array.isArray(existingValue) || Array.isArray(newValue)) return true;
          break;
        default:
          return existingValue !== newValue;
      }
    else if (existingValue || newValue) return true;
    return false;
  });
};

export const addFieldToState = (initialState, fieldList, fieldName, input) => {
  let finalState = initialState;
  let modelField = getField(fieldList, fieldName);
  if (modelField) finalState = applyFieldValueToModel(initialState, modelField, input);

  return finalState;
};

export const getModelKey = modelInstance => {
  if (!modelInstance) return '';
  if (modelInstance.id) return modelInstance.id;
  if (modelInstance.dummyKey) return modelInstance.dummyKey;
  return '';
};

export const isModelValid = modelInstance => {
  return !(modelInstance.error || isItAnObject(modelInstance.error_detail));
};

const financial = x => {
  return Number.parseFloat(x).toFixed(2);
};
export const validateField = (field, value, fullModelData) => {
  if (field.required && !value) {
    if (field.error) return field.error;
    return VALUE_MISSING;
  }
  if (value && field.type === NUMBER) {
    const numberValue = Number(String(value).trim());
    if (!Number.isInteger(numberValue)) return INVALID_NUMBER;
    if (numberValue < 1) return INVALID_INTEGER;
  }
  if (value && field.type === CURRENCY) {
    const numberValue = Number(String(value).trim());
    if (Number.isNaN(numberValue)) return INVALID_CURRENCY;
    const displayNumber = financial(numberValue);
    if (Number(displayNumber) !== numberValue) return INVALID_CURRENCY;
  }
  if (value && field.maxLength) {
    if (value.length > field.maxLength) return `Maximum size is ${field.maxLength}`;
  }
  if (field.validator) {
    const error = field.validator(value, fullModelData);
    if (error) {
      return error;
    }
  }
};
export const applyFieldValueToModel = (modelInstance, field, value) => {
  let updatedModelInstance = applyFieldValueToModelOnly(modelInstance, field, value);
  if (!updatedModelInstance.error_detail) updatedModelInstance.error_detail = {};
  const fieldError = validateField(field, value, updatedModelInstance);
  if (fieldError) {
    updatedModelInstance.error_detail[field.fieldName] = fieldError;
    return updatedModelInstance;
  }
  updatedModelInstance.error_detail = removeKey(updatedModelInstance.error_detail, field.fieldName);
  return updatedModelInstance;
};
export const applyFieldValueToModelOnly = (modelInstance, field, value) => {
  let updatedModelInstance = updateObject(modelInstance);
  if (value) updatedModelInstance[field.fieldName] = value;
  else updatedModelInstance[field.fieldName] = defaultFieldValue(field);
  updatedModelInstance.changed = true;
  return updatedModelInstance;
};
const defaultFieldValue = field => {
  if (field.default) return field.default;
  let defaultValue;
  switch (field.type) {
    case CURRENCY:
      defaultValue = '';
      break;
    case CHECKBOX:
      defaultValue = false;
      break;
    default:
      defaultValue = '';
  }
  return defaultValue;
};
export const validateModelAndSetErrors = (modelInstance, modelFields) => {
  let error_detail = {};
  modelFields.forEach(field => {
    const error = validateField(field, modelInstance[field.fieldName], modelInstance);
    if (error) error_detail[field.fieldName] = error;
  });
  return error_detail;
};

export const getAttribute = (modelFields, fieldName) => {
  let attribute;
  const modelFieldsSorted = modelFields
    .slice()
    .sort((a, b) => b.fieldName.length - a.fieldName.length);
  modelFieldsSorted.some(field => {
    if (fieldName.startsWith(field.fieldName)) {
      attribute = field.fieldName;
      return true;
    }
    return false;
  });
  return attribute;
};

export const getField = (modelFields, fieldName) => {
  let modelField;
  const modelFieldsSorted = modelFields
    .slice()
    .sort((a, b) => b.fieldName.length - a.fieldName.length);
  modelFieldsSorted.some(field => {
    if (fieldName.startsWith(field.fieldName)) {
      modelField = field;
      return true;
    }
    return false;
  });
  return modelField;
};

export const updateModel = (model, modelFields, fieldName, fieldValue) => {
  const modelField = getField(modelFields, fieldName);
  if (modelField) {
    const updatedModel = applyFieldValueToModelOnly(model, modelField, fieldValue);
    updatedModel.error_detail = validateModelAndSetErrors(updatedModel, modelFields);
    return removeKey(updatedModel, 'error');
  }
  return model;
};

export const displayModelErrorSummary = (model, modelFields) => {
  let displayErrors = model.error;
  const fieldErrors = isItAnObject(model.error_detail) ? model.error_detail : {};
  for (const property in fieldErrors) {
    const displayErrorText = fieldErrors[property].join(' ');
    if (!displayErrors) {
      displayErrors = '';
    } else {
      displayErrors += '<br>';
    }
    if (property === 'non_field_errors') {
      displayErrors += displayErrorText;
    } else {
      const field = getField(modelFields, property);
      if (field) {
        displayErrors += field.header + ': ' + displayErrorText;
      } else {
        displayErrors += property + ': ' + displayErrorText;
      }
    }
  }

  return displayErrors;
};

export const getNameForValue = (value, sourceArray) => {
  if (!value) return undefined;
  let name = value;

  sourceArray.some(pair => {
    if (pair.value === value) {
      name = pair.name;
      return true;
    }
    return false;
  });
  return name;
};

export const hasErrors = model => {
  if (model.error && model.error.length > 0) return true;
  return !!isItAnObject(model.error_detail);
};

export const createNewModelInstance = fields => {
  const basicModel = { dummyKey: generateRandomCode() };
  if (isItAnObject(fields)) {
    return updateObject(fields, basicModel, { changed: true });
  }
  return basicModel;
};
export const matchesModel = (persistedModel, modelFields, modelToCheck) => {
  return !checkForChanges(modelFields, persistedModel, modelToCheck);
};
