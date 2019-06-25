import {
  FRAMEWORK,
  FRAMEWORK_SAVE,
  getFrameworkFailure,
  getFrameworkSuccess,
  saveFrameworkFailure,
  saveFrameworkSuccess,
} from '../actions/framework';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import history from '../../history';
import * as selectors from '../selectors/user';
import framework from './apis/framework';
import { logError } from '../../helpers/api_error';
import { updateObject } from '../../helpers/utils';
import { LOGIN_URL } from '../../components/menus/helpers/menu';

export function* getFramework(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(framework.getFramework, completePayload);
      yield put(getFrameworkSuccess(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(getFrameworkFailure('Get Framework failed'));
  }
}

export function* watchForGetFramework() {
  yield takeLatest(`${FRAMEWORK}_REQUESTED`, getFramework);
}

export function* saveFramework(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(framework.saveFramework, completePayload);
      yield put(saveFrameworkSuccess(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(saveFrameworkFailure('Save Framework failed'));
  }
}

export function* watchForSaveFramework() {
  yield takeLatest(`${FRAMEWORK_SAVE}_REQUESTED`, saveFramework);
}
