/* eslint-disable max-len */
import axios from 'axios';
import { buildSearchCriteria } from './apis/utils/list';

const instance = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});
export default { instance };
