/* eslint-disable max-len */
import api from '../api';
import { updateObject } from '../../../helpers/utils';
import { customerToDatabaseFormat } from './utils/customerToDatabaseFormat';

export const getCustomerListApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const customerApi = `/rest-epic/customers?firstName=${payload.firstName}&lastName=${payload.lastName}&email=${payload.email}&page=${payload.page}`;
  return await api.instance.get(customerApi);
};

export const getCustomerApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.get(`/rest-epic/customer/${payload.customerId}`);
};

export const createCustomerApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const customer = customerToDatabaseFormat(payload.customer);
  return await api.instance.post('/rest-epic/customer', customer);
};
export const saveCustomerApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const customer = customerToDatabaseFormat(payload.customer);
  return await api.instance.post(`/rest-epic/customer/${customer.id}`, customer);
};
export const deleteCustomerApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const customerId = payload.customerId;
  return await api.instance.delete(`/rest-epic/customer/${customerId}`);
};
