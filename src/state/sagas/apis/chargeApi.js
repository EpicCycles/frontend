import api from '../api';

const createCharge = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const charge = payload.charge;
  const chargesApi = '/rest-epic/charge';
  return await api.instance.post(chargesApi, charge);
};
const deleteCharge = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.delete(`/rest-epic/charge/${payload.chargeId}`);
};
const saveCharge = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const charge = payload.charge;
  const chargeApi = `/rest-epic/charge/${payload.charge.id}`;
  return await api.instance.post(chargeApi, charge);
};

const getCharges = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const chargesApi = '/rest-epic/charge';
  return await api.instance.get(chargesApi);
};

export default {
  getCharges,
  createCharge,
  saveCharge,
  deleteCharge,
};
