import { modelToDatabaseFormat } from './modelToDatabaseFormat';
const arrayFields = ['quoteParts', 'charges', 'answers'];

export const quoteToDatabaseFormat = quote => {
  try {
    return modelToDatabaseFormat(quote, arrayFields);
  } catch (exception) {
    throw Error('quote data could not be parsed in quoteToDatabaseFormat');
  }
};
