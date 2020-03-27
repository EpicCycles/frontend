import { modelToDatabaseFormat } from './modelToDatabaseFormat';
const arrayFields = ['addresses', 'phoneNumbers', 'fittings'];

export const customerToDatabaseFormat = customer => {
  try {
    return modelToDatabaseFormat(customer, arrayFields);
  } catch (exception) {
    throw Error('customer data could not be parsed in customerToDatabaseFormat');
  }
};
