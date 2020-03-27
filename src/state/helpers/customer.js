import { updateObject } from '../../helpers/utils';

export const customerToFrontEndFormat = customer => {
  const addresses = customer.addresses ? JSON.parse(customer.addresses) : [];
  const fittings = customer.fittings ? JSON.parse(customer.fittings) : [];
  const phoneNumbers = customer.phoneNumbers ? JSON.parse(customer.phoneNumbers) : [];
  return updateObject(customer, { addresses, fittings, phoneNumbers });
};
export const customerListToFrontEndFormat = customers => {
  return customers.map(customer => customerToFrontEndFormat(customer));
};
