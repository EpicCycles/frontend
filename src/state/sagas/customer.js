import { call, put, select, takeLatest } from 'redux-saga/effects';
import history from '../../history.js';
import {
  createCustomerFailure,
  createCustomerSuccess,
  CUSTOMER_PAGE,
  deleteCustomerFailure,
  deleteCustomerSuccess,
  getCustomerFailure,
  getCustomerListFailure,
  getCustomerListSuccess,
  getCustomerSuccess,
  saveCustomerFailure,
  saveCustomerSuccess,
  CUSTOMER,
  CUSTOMER_LIST,
  CUSTOMER_DELETE,
  CUSTOMER_CREATE,
  CUSTOMER_SAVE,
} from '../actions/customer';

import * as selectors from '../selectors/user.js';
import * as customerSelectors from '../selectors/customer.js';
import { updateObject } from '../../helpers/utils';
import { logError } from '../../helpers/api_error';
import { LOGIN_URL } from '../../components/menus/helpers/menu';
import { getNoteList } from '../actions/note';
import {
  createCustomerApi,
  deleteCustomerApi,
  getCustomerApi,
  getCustomerListApi,
  saveCustomerApi,
} from './apis/customerApi';
import { logoutUser } from '../actions/user';

export function* getCustomerList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token, page: 1 });
      const response = yield call(getCustomerListApi, completePayload);
      yield put(getCustomerListSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(getCustomerListFailure('Get Customer List failed'));
  }
}

export function* watchForGetCustomerList() {
  yield takeLatest(`${CUSTOMER_LIST}_REQUESTED`, getCustomerList);
}

export function* getCustomerListPage(action) {
  try {
    const token = yield select(selectors.token);
    const searchParams = yield select(customerSelectors.searchParams);
    if (token) {
      const completePayload2 = updateObject(action.payload, { token }, searchParams);
      const response = yield call(getCustomerListApi, completePayload2);
      yield put(getCustomerListSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(getCustomerListFailure('Get Customer List Page failed'));
  }
}

export function* watchForGetCustomerListPage() {
  yield takeLatest(CUSTOMER_PAGE, getCustomerListPage);
}

export function* getCustomer(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(getCustomerApi, completePayload);
      yield put(getCustomerSuccess(response.data));
      yield put(getNoteList(action.payload.customerId));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(getCustomerFailure('Get Customer failed'));
  }
}

export function* watchForGetCustomer() {
  yield takeLatest(`${CUSTOMER}_REQUESTED`, getCustomer);
}

export function* createCustomer(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(createCustomerApi, completePayload);
      yield put(createCustomerSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(createCustomerFailure('Create Customer failed'));
    // yield put(history.push("/customer"));
  }
}

export function* watchForCreateCustomer() {
  yield takeLatest(`${CUSTOMER_CREATE}_REQUESTED`, createCustomer);
}

export function* saveCustomer(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(saveCustomerApi, completePayload);
      yield put(saveCustomerSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(saveCustomerFailure('Customer save failed'));
  }
}

export function* watchForSaveCustomer() {
  yield takeLatest(`${CUSTOMER_SAVE}_REQUESTED`, saveCustomer);
}

export function* deleteCustomer(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      yield call(deleteCustomerApi, completePayload);
      yield put(deleteCustomerSuccess(action.payload.customerId));
      yield call(history.push, '/');
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(deleteCustomerFailure('Customer delete failed'));
  }
}

export function* watchForDeleteCustomer() {
  yield takeLatest(`${CUSTOMER_DELETE}_REQUESTED`, deleteCustomer);
}
