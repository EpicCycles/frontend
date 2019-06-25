import history from '../../history';
import { CHANGE_ROUTE } from '../actions/application';
import { call, takeLatest } from 'redux-saga/effects';

export function* changeApplicationRoute(action) {
  if (action.payload && action.payload.newRoute) yield call(history.push, action.payload.newRoute);
}

export function* watchForChangeRoute() {
  yield takeLatest(CHANGE_ROUTE, changeApplicationRoute);
}
