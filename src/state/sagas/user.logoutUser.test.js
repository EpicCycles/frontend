import history from '../../history';
import { runSaga } from '@redux-saga/core';
import { USER_LOGOUT } from '../actions/user';
import { LOGIN_URL } from '../../components/menus/helpers/menu';
import { CLEAR_ALL_STATE } from '../actions/application';
import { logoutUser } from './user';

jest.mock('./apis/user');
const { logoutUserApi } = require('./apis/user');

describe('user.logoutUser saga', () => {
  const action = {
    type: `${USER_LOGOUT}_REQUESTED`,
  };
  afterEach(() => {
    logoutUserApi.mockClear();
  });
  it('should log user out and redirect to login page when logout succeeds', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    logoutUserApi.mockImplementation(() => {
      return {};
    });
    const result = await runSaga(myIO, logoutUser, action);
    expect(logoutUserApi).toHaveBeenCalledWith({ token: 'existingToken' });
    expect(historySpy).toHaveBeenCalledWith(LOGIN_URL);
    expect(dispatched).toEqual([
      {
        type: USER_LOGOUT,
      },
      {
        type: CLEAR_ALL_STATE,
      },
    ]);
  });
  it('should clear state and redirect to login page when logout fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    logoutUserApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, logoutUser, action);
    expect(logoutUserApi).toHaveBeenCalledWith({ token: 'existingToken' });
    expect(historySpy).toHaveBeenCalledWith(LOGIN_URL);
    expect(dispatched).toEqual([
      {
        payload: 'Logout was not successful',
        type: 'user/USER_LOGOUT_ERROR',
      },
      {
        type: CLEAR_ALL_STATE,
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
    const result = await runSaga(myIO, logoutUser, action);
    expect(logoutUserApi).not.toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith(LOGIN_URL);
    expect(dispatched).toEqual([
      {
        type: CLEAR_ALL_STATE,
      },
    ]);
  });
});
