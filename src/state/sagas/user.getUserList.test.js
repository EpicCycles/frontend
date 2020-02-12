import history from '../../history';
import { runSaga } from '@redux-saga/core';
import { GET_USERS } from '../actions/user';
import { LOGIN_URL } from '../../components/menus/helpers/menu';
import { CLEAR_ALL_STATE } from '../actions/application';
import { getUserList } from './user';

jest.mock('./apis/user');
const { getUsersApi } = require('./apis/user');

describe('user.getUserList saga', () => {
  const action = {
    type: `${GET_USERS}_REQUESTED`,
  };
  afterEach(() => {
    getUsersApi.mockClear();
  });
  it('should create action to put users in stae when api succeeds', async () => {
    const dispatched = [];
    const users = [{ id: 1 }, { id: 2 }];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getUsersApi.mockImplementation(() => {
      return { data: users };
    });
    const result = await runSaga(myIO, getUserList, action);
    expect(getUsersApi).toHaveBeenCalledWith({ token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/GET_USERS_SUCCESS',
        payload: { users },
      },
    ]);
  });
  it('should send error when get users fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getUsersApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, getUserList, action);
    expect(getUsersApi).toHaveBeenCalledWith({ token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Get Users was not successful',
        type: 'user/GET_USERS_ERROR',
      },
    ]);
  });
  it('should clear state and redirect to login page when no token', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: {} }),
    };
    const historySpy = jest.spyOn(history, 'push');
    const result = await runSaga(myIO, getUserList, action);
    expect(getUsersApi).not.toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith(LOGIN_URL);
    expect(dispatched).toEqual([
      {
        type: CLEAR_ALL_STATE,
      },
    ]);
  });
});
