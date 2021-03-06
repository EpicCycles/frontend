import api from '../api';
import { buildSearchCriteria } from './utils/list';

const getParts = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const listCriteria = payload.listCriteria;
  const partApi = `rest-epic/productsearch${buildSearchCriteria(listCriteria)}`;
  return await api.instance.get(partApi);
};

const uploadParts = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.post('rest-epic/parts', payload.parts);
};
const savePart = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.patch(`rest-epic/part/${payload.part.id}`, payload.part);
};
const createPart = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.post('rest-epic/part', payload.part);
};
const deletePart = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.delete(`rest-epic/part/${payload.partId}`);
};
const saveSupplierProduct = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.patch(
    `rest-epic/supplier-product/${payload.supplierProduct.id}`,
    payload.supplierProduct,
  );
};
const createSupplierProduct = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.post('rest-epic/supplier-product', payload.supplierProduct);
};
const deleteSupplierProduct = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.delete(`rest-epic/supplier-product/${payload.supplierProductId}`);
};
export default {
  getParts,
  uploadParts,
  savePart,
  deletePart,
  createPart,
  saveSupplierProduct,
  deleteSupplierProduct,
  createSupplierProduct,
};
