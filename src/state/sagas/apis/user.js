import api from '../api';

// from https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html#basic

export const loginUserApi = async payload => {
  api.instance.defaults.headers.common.Authorization = '';
  const loginApi = 'rest-epic/api-token-auth';
  return await api.instance.post(loginApi, payload);
};

export const getUsersApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const getUserApi = 'rest-epic/user';
  return await api.instance.get(getUserApi);
};

export const logoutUserApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const logoutApi = '/rest-auth/logout/';
  return await api.instance.post(logoutApi);
};

export const changePasswordApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const changePasswordApi = 'rest-auth/password/change/';
  return await api.instance.post(changePasswordApi, payload.passwordData);
};

export const changeUserDataApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const changeUserDataApi = 'rest-auth/user/';
  return await api.instance.patch(changeUserDataApi, payload.user);
};
