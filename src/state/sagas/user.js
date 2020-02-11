import { call, put, select, takeLatest } from 'redux-saga/effects';
import history from '../../history.js';
import * as userApis from './apis/user';

import {
  cancelActionForLogin,
  CHANGE_PASSWORD,
  CHANGE_USER_DATA,
  changePasswordError,
  changePasswordOK,
  changeUserDataError,
  changeUserDataOK,
  GET_USERS,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  loginUserFailure,
  loginUserSuccess,
  logoutUserFailure,
  logoutUserSuccess,
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions/user';
import { updateObject } from '../../helpers/utils';
import { errorAsMessage, logError } from '../../helpers/api_error';
import * as selectors from '../selectors/user';
import { clearAllState } from '../actions/application';
import { getCoreData } from '../actions/core';
import { getFramework } from '../actions/framework';
import { listParts } from '../actions/part';
import { LOGIN_URL } from '../../components/menus/helpers/menu';

export function* loginUser(action) {
  try {
    yield put(cancelActionForLogin());
    const loginResponse = yield call(userApis.loginUserApi, action.payload);
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    if (token) {
      yield put(loginUserSuccess(token, user));
      yield call(history.push, '/');

      // start fetch of basic data
      yield put(getCoreData());
      yield put(getFramework());
      yield put(listParts({}));
      yield put(getUsers());
    } else {
      yield put(loginUserFailure('Login was not successful'));

    }
  } catch (error) {
    logError(error);
    yield put(loginUserFailure(errorAsMessage(error, 'Login was not successful')));
  }
}

export function* watchForLoginUser() {
  yield takeLatest(`${USER_LOGIN}_REQUESTED`, loginUser);
}

export function* logoutUser(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      yield call(userApis.logoutUser, completePayload);
      yield put(logoutUserSuccess());
      yield put(clearAllState());
    }
    yield call(history.push, LOGIN_URL);
  } catch (error) {
    yield put(logoutUserFailure(errorAsMessage(error, 'Logout was not successful')));
  }
}

export function* watchForLogoutUser() {
  yield takeLatest(`${USER_LOGOUT}_REQUESTED`, logoutUser);
}

export function* changePassword(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      yield call(userApis.changePassword, completePayload);
      yield put(changePasswordOK());
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(changePasswordError(errorAsMessage(error, 'Password change was not successful')));
  }
}

export function* watchForChangePassword() {
  yield takeLatest(`${CHANGE_PASSWORD}_REQUESTED`, changePassword);
}

export function* changeUserData(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const changeUserResponse = yield call(userApis.changeUserData, completePayload);
      yield put(changeUserDataOK(changeUserResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(changeUserDataError('Data change was not successful'));
  }
}

export function* watchForChangeUserData() {
  yield takeLatest(`${CHANGE_USER_DATA}_REQUESTED`, changeUserData);
}

export function* getUserList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const getUsersResponse = yield call(userApis.getUsers, completePayload);
      yield put(getUsersSuccess(getUsersResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(getUsersFailure('Get Users was not successful'));
    yield call(history.push, LOGIN_URL);
  }
}

export function* watchForGetUserList() {
  yield takeLatest(`${GET_USERS}_REQUESTED`, getUserList);
}
