import axios from 'axios';
import { USER_LOGIN, USER_NOT_VALIDATED } from '../actions/user';
import { loginUser } from './user';
jest.mock('axios');
jest.mock('./apis/user');
const { loginUserApi } = require('./apis/user');
import history from '../../history';
import { runSaga } from '@redux-saga/core';

describe('user loginUser saga', () => {
  const action = {
    type: `${USER_LOGIN}_REQUESTED`,
    payload: { username: 'aUser', password: 'aPassword' },
  };
  afterEach(() => {
    loginUserApi.mockClear();
  });
  test('should call functions when login succeeds', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    };
    const historySpy = jest.spyOn(history, 'push');

    loginUserApi.mockImplementation(() => {
      return { data: { token: '1234abcd', user: { userId: 'id' } } };
    });
    const result = await runSaga(myIO, loginUser, action);

    expect(loginUserApi).toHaveBeenCalledWith(action.payload);
    expect(historySpy).toHaveBeenCalledWith('/');
    expect(dispatched).toEqual([
      {
        type: USER_NOT_VALIDATED,
      },
      {
        type: USER_LOGIN,
        payload: { token: '1234abcd', user: { userId: 'id' } },
      },
      {
        type: 'core/CORE_DATA_REQUESTED',
        payload: {},
      },
      {
        type: 'framework/FRAMEWORK_REQUESTED',
        payload: {},
      },
      {
        type: 'part/PART_LIST_REQUESTED',
        payload: { listCriteria: {} },
      },
      {
        type: 'user/GET_USERS_REQUESTED',
      },
    ]);
    historySpy.mockRestore();
  });
  test('should put error when login fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    };
    const historySpy = jest.spyOn(history, 'push');

    loginUserApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, loginUser, action);

    expect(loginUserApi).toHaveBeenCalledWith(action.payload);
    expect(dispatched).toEqual([
      {
        type: USER_NOT_VALIDATED,
      },
      { payload: 'Login was not successful', type: 'user/USER_LOGIN_ERROR' },
    ]);
    expect(historySpy).not.toHaveBeenCalled();
    historySpy.mockRestore();
  });
  test('should put error when login does not return token', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    };
    const historySpy = jest.spyOn(history, 'push');

    loginUserApi.mockImplementation(() => {
      return { data: { user: { userId: 'id' } } };
    });
    const result = await runSaga(myIO, loginUser, action);

    expect(loginUserApi).toHaveBeenCalledWith(action.payload);
    expect(dispatched).toEqual([
      {
        type: USER_NOT_VALIDATED,
      },
      { payload: 'Login was not successful', type: 'user/USER_LOGIN_ERROR' },
    ]);
    expect(historySpy).not.toHaveBeenCalled();
    historySpy.mockRestore();
  });
});
