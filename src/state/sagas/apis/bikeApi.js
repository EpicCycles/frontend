import api from '../api';
import { buildSearchCriteria } from './utils/list';
import { bikeToDatabaseFormat } from './utils/bikeToDatabaseFormat';

const deleteBike = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.delete(`rest-epic/bike/${payload.bikeId}`);
};
const saveBike = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const bike = bikeToDatabaseFormat(payload.bike);
  return await api.instance.patch(`rest-epic/bike/${bike.id}`, bike);
};
const getBike = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.get(`rest-epic/bike/${payload.bikeId}`);
};
const saveFrame = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.patch(`rest-epic/frames/${payload.frame.id}`, payload.frame);
};
const deleteFrame = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.delete(`rest-epic/frames/${payload.frameId}`);
};

const uploadFrame = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.post('rest-epic/frame/upload', payload.frame);
};

const getFrames = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const frameApi = `/rest-epic/frames${buildSearchCriteria(payload.searchCriteria)}`;
  return await api.instance.get(frameApi);
};

export default {
  getBike,
  deleteBike,
  saveBike,
  deleteFrame,
  uploadFrame,
  getFrames,
  saveFrame,
};
