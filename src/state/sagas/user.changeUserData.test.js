import history from '../../history';
import { runSaga } from '@redux-saga/core';
import { USER_LOGOUT } from '../actions/user';
import { LOGIN_URL } from '../../components/menus/helpers/menu';
import { CLEAR_ALL_STATE } from '../actions/application';
import { changeUserData } from './user';

jest.mock('./apis/user');
const { changeUserDataApi } = require('./apis/user');

describe('user.changeUserData saga', () => {
  const action = {
    type: `${USER_LOGOUT}_REQUESTED`,
    payload: { name: 'A New Name', email: 'a.b@dd.ef.com' },
  };
  afterEach(() => {
    changeUserDataApi.mockClear();
  });
  it('should change user data when api call succeeds', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    changeUserDataApi.mockImplementation(() => {
      return { data: { userName: 'The Name' } };
    });
    const result = await runSaga(myIO, changeUserData, action);
    expect(changeUserDataApi).toHaveBeenCalledWith({
      name: 'A New Name',
      email: 'a.b@dd.ef.com',
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      { payload: { user: { userName: 'The Name' } }, type: 'user/CHANGE_USER_DATA_SUCCESS' },
    ]);
  });
  it('should return an error when user data api faile', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    changeUserDataApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, changeUserData, action);
    expect(changeUserDataApi).toHaveBeenCalledWith({
      name: 'A New Name',
      email: 'a.b@dd.ef.com',
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Data change was not successful',
        type: 'user/CHANGE_USER_DATA_FAILURE',
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
    const result = await runSaga(myIO, changeUserData, action);
    expect(changeUserDataApi).not.toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith(LOGIN_URL);
    expect(dispatched).toEqual([
      {
        type: CLEAR_ALL_STATE,
      },
    ]);
  });
});
