import {
  CHECKBOX,
  NUMBER,
  SELECT_MULTIPLE,
  SELECT_ONE,
  TEXT,
} from '../components/app/model/helpers/fields';

export const doesArrayContainMatches = (arrayOfObjects, searchFieldArray, searchCriteria) => {
  // first convert all search criteria to strings
  const fieldsToCheck = buildValueArray(searchFieldArray, searchCriteria);
  return arrayOfObjects.some(o => doesObjectMatchCriteria(o, fieldsToCheck));
};

export const buildValueArray = (searchFieldArray, searchCriteria) => {
  const fieldsWithValues = searchFieldArray.map(field => {
    const { searchFieldName, modelFieldName, fieldType } = field;
    if (searchCriteria[searchFieldName]) {
      let searchValue = searchCriteria[searchFieldName];
      switch (fieldType) {
        case NUMBER:
        case SELECT_ONE:
          searchValue = searchValue.toString();
          break;
        case TEXT:
          searchValue = searchValue.toLowerCase();
          break;
        case SELECT_MULTIPLE:
          searchValue = searchValue.map(v => v.toString());
          break;
        default:
          break;
      }
      return { modelFieldName, fieldType, searchValue };
    } else {
      return field;
    }
  });
  return fieldsWithValues.filter(f => f.searchValue);
};

export const doesObjectMatchCriteria = (model, fieldsToCheck) => {
  return fieldsToCheck.every(field => {
    const { modelFieldName, fieldType, searchValue } = field;
    const modelValue = model[modelFieldName];
    switch (fieldType) {
      case CHECKBOX:
        return searchValue === model[modelFieldName];
      case TEXT:
        return modelValue && modelValue.toLowerCase().includes(searchValue);
      case SELECT_MULTIPLE:
        return modelValue && searchValue.includes(modelValue.toString());
      default:
        return modelValue && searchValue === modelValue.toString();
    }
  });
};
