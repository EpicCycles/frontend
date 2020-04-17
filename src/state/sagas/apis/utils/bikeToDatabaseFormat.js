import { modelToDatabaseFormat } from './modelToDatabaseFormat';
const arrayFields = ['bikeParts'];

export const bikeToDatabaseFormat = bike => {
  try {
    return modelToDatabaseFormat(bike, arrayFields);
  } catch (exception) {
    throw Error('bike data could not be parsed in bikeToDatabaseFormat');
  }
};
