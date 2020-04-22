import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});
export default { instance };
