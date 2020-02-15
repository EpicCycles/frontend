import history from '../../history';
import { runSaga } from '@redux-saga/core';
import { USER_LOGOUT } from '../actions/user';
import { LOGIN_URL } from '../../components/menus/helpers/menu';
import { CLEAR_ALL_STATE } from '../actions/application';
import { changePassword } from './user';

jest.mock('./apis/user');
const { changePasswordApi } = require('./apis/user');

describe('user.changePassword saga', () => {
  const action = {
    type: `${USER_LOGOUT}_REQUESTED`,
    payload: { newPassword: 'myNewPasswrod!' },
  };
  afterEach(() => {
    changePasswordApi.mockClear();
  });
  it('should change pasword when api call succeeds', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    changePasswordApi.mockImplementation(() => {
      return {};
    });
    const result = await runSaga(myIO, changePassword, action);
    expect(changePasswordApi).toHaveBeenCalledWith({
      newPassword: 'myNewPasswrod!',
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([{ type: 'user/CHANGE_PASSWORD_SUCCESS' }]);
  });
  it('should return an error when password api faile', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    changePasswordApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, changePassword, action);
    expect(changePasswordApi).toHaveBeenCalledWith({
      newPassword: 'myNewPasswrod!',
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Password change was not successful',
        type: 'user/CHANGE_PASSWORD_FAILURE',
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
    const result = await runSaga(myIO, changePassword, action);
    expect(changePasswordApi).not.toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith(LOGIN_URL);
    expect(dispatched).toEqual([
      {
        type: CLEAR_ALL_STATE,
      },
    ]);
  });
});
