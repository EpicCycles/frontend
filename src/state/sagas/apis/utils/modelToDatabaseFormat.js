import { isItAnObject, updateObject } from '../../../../helpers/utils';

export const modelToDatabaseFormat = (modelInstance, arrayFields) => {
  try {
    const dataBaseData = updateObject(modelInstance);
    if (!isItAnObject(modelInstance)) {
      throw Error('Data was not present to save');
    }
    arrayFields.forEach(field => {
      const fieldValue = modelInstance[field] || [];
      dataBaseData[field] = JSON.stringify(fieldValue);
    });
    return dataBaseData;
  } catch (exception) {
    throw Error('Data could not be parsed in modelToDatabaseFormat');
  }
};
