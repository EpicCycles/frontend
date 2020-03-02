import { call, put, select, takeLatest } from 'redux-saga/effects';
import history from '../../history';
import { updateObject } from '../../helpers/utils';
import * as selectors from '../selectors/user';
import quote from './apis/quote';

import {
  ARCHIVE_QUOTE,
  archiveQuoteError,
  archiveQuoteOK,
  clearQuoteState,
  CREATE_QUOTE,
  createQuoteError,
  createQuoteOK,
  FIND_QUOTES,
  GET_QUOTE,
  GET_QUOTE_TO_COPY,
  getQuoteError,
  getQuoteListError,
  getQuoteListOK,
  getQuoteOK,
  getQuoteToCopyError,
  getQuoteToCopyOK,
  ISSUE_QUOTE,
  issueQuoteError,
  issueQuoteOK,
  ORDER_QUOTE,
  orderQuoteError,
  orderQuoteOK,
  saveQuoteError,
  saveQuoteOK,
  UNARCHIVE_QUOTE,
  unarchiveQuoteError,
  unarchiveQuoteOK,
  UPDATE_QUOTE,
} from '../actions/quote';
import { errorAsMessage, logError } from '../../helpers/api_error';

import { getCustomer } from '../actions/customer';
import { LOGIN_URL } from '../../components/menus/helpers/menu';
import { addMessage } from '../actions/application';

export function* saveQuoteProcess(action) {
  const quoteToSave = action.payload.quote;
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = { quote: quoteToSave, token };
      const response = yield call(quote.saveQuote, completePayload);
      yield put(saveQuoteOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (apiError) {
    const error = 'Save Quote failed';
    let error_detail;
    logError(apiError);
    if (apiError.response) {
      error_detail = apiError.response.data;
    }
    yield put(saveQuoteError({ quoteToSave, error, error_detail }));
  }
}
export function* watchForSaveQuote() {
  yield takeLatest(`${UPDATE_QUOTE}_REQUESTED`, saveQuoteProcess);
}

export function* archiveQuote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.archiveQuote, completePayload);
      yield put(archiveQuoteOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(archiveQuoteError(errorAsMessage(error, 'Archive Quote failed')));
  }
}
export function* watchForArchiveQuote() {
  yield takeLatest(`${ARCHIVE_QUOTE}_REQUESTED`, archiveQuote);
}

export function* unarchiveQuote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.unarchiveQuote, completePayload);
      yield put(unarchiveQuoteOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(unarchiveQuoteError(errorAsMessage(error, 'Quote restore failed')));
  }
}
export function* watchForUnarchiveQuote() {
  yield takeLatest(`${UNARCHIVE_QUOTE}_REQUESTED`, unarchiveQuote);
}

export function* getQuote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.getQuote, completePayload);
      yield put(getQuoteOK(response.data));
      yield put(getCustomer(response.data.customerId));
      yield call(history.push, '/quote');
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(getQuoteError(errorAsMessage(error, 'Failed to get quote')));
  }
}
export function* watchForGetQuote() {
  yield takeLatest(`${GET_QUOTE}_REQUESTED`, getQuote);
}

export function* getQuoteToCopy(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.getQuote, completePayload);
      yield put(getQuoteToCopyOK(response.data));
      yield call(history.push, '/quote-copy');
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(getQuoteToCopyError(errorAsMessage(error, 'Failed to get quote')));
  }
}
export function* watchForGetQuoteToCopy() {
  yield takeLatest(`${GET_QUOTE_TO_COPY}_REQUESTED`, getQuoteToCopy);
}

export function* getQuoteList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.getQuoteList, completePayload);
      if (response.data) {
        yield put(getQuoteListOK(response.data));
      } else {
        yield put(addMessage('No quotes matching criteria'));
        yield put(clearQuoteState());
      }
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(getQuoteListError(errorAsMessage(error, 'Failed to get quotes')));
  }
}
export function* watchForGetQuoteList() {
  yield takeLatest(`${FIND_QUOTES}_REQUESTED`, getQuoteList);
}

export function* createQuote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.createQuote, completePayload);
      yield put(createQuoteOK(response.data));
      yield put(getCustomer(response.data.customerId));
      yield call(history.push, '/quote');
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(createQuoteError(errorAsMessage(error, 'Create Quote failed')));
  }
}
export function* watchForCreateQuote() {
  yield takeLatest(`${CREATE_QUOTE}_REQUESTED`, createQuote);
}

export function* issueQuote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.issueQuote, completePayload);
      yield put(issueQuoteOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(issueQuoteError(errorAsMessage(error, 'Issue Quote failed')));
  }
}
export function* watchForIssueQuote() {
  yield takeLatest(`${ISSUE_QUOTE}_REQUESTED`, issueQuote);
}

export function* orderQuote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(quote.orderQuote, completePayload);
      yield put(orderQuoteOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(orderQuoteError(errorAsMessage(error, 'Quote Order failed')));
  }
}
export function* watchForOrderQuote() {
  yield takeLatest(`${ORDER_QUOTE}_REQUESTED`, orderQuote);
}
