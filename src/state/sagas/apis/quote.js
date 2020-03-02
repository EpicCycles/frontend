import api from '../api';
import { buildSearchCriteria } from './utils/list';

const createQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quote = payload.quote;
  return await api.instance.post('/rest-epic/quotes', quote);
};

const archiveQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quoteId = payload.quoteId;
  return await api.instance.post(`/rest-epic/quote/${quoteId}/archive`);
};
const unarchiveQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quoteId = payload.quoteId;
  return api.instance.post(`/rest-epic/quote/${quoteId}/unarchive`);
};

const issueQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quoteId = payload.quoteId;
  return api.instance.post(`/rest-epic/quote/${quoteId}/issue`);
};
const orderQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quoteId = payload.quoteId;
  return api.instance.post(`/rest-epic/quote/${quoteId}/order`);
};
const saveQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quoteId = payload.quote.id;
  const quoteData = payload.quote;
  return api.instance.put(`/rest-epic/quote/${quoteId}`, quoteData);
};
const getQuote = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const quoteId = payload.quoteId;
  return api.instance.get(`/rest-epic/quote/${quoteId}`);
};
const getQuoteList = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const searchCriteria = payload.searchCriteria;
  const fullApiString = `/rest-epic/quotes${buildSearchCriteria(searchCriteria)}`;
  return api.instance.get(fullApiString);
};

export default {
  createQuote,
  getQuote,
  getQuoteList,
  saveQuote,
  archiveQuote,
  unarchiveQuote,
  issueQuote,
  orderQuote,
};
