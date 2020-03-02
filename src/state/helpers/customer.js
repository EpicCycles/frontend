import { updateObject } from '../../helpers/utils';

export const customerToFrontEndFormat = customer => {
  const addresses = JSON.parse(customer.addresses);
  const fittings = JSON.parse(customer.fittings);
  const phoneNumbers = JSON.parse(customer.phoneNumbers);
  return updateObject(customer, { addresses, fittings, phoneNumbers });
};
export const customerListToFrontEndFormat = customers => {
  return customers.map(customer => customerToFrontEndFormat(customer));
};
