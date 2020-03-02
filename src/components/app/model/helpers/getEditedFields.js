export const getEditedFields = (model, modelElementFields) => {
  const dataToSave = {};
  modelElementFields.forEach(field => (dataToSave[field.fieldName] = model[field.fieldName]));
  return dataToSave;
};
