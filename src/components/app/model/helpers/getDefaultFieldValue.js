export const getDefaultFieldValue = modelField => {
  if (modelField.selectList && Array.isArray(modelField.selectList)) {
    const defaultValue = modelField.selectList.filter(listitem => listitem.isDefault);
    if (defaultValue.length > 0) return defaultValue[0].value;
  }
  return modelField.default;
};
