import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  createNoteFailure,
  createNoteSuccess,
  deleteNoteFailure,
  deleteNoteSuccess,
  getNoteListFailure,
  getNoteListSuccess,
  NOTE_CREATE,
  NOTE_DELETE,
  NOTE_LIST,
  NOTE_SAVE,
  saveNoteFailure,
  saveNoteSuccess,
} from '../actions/note';

import * as selectors from '../selectors/user';
import { updateObject } from '../../helpers/utils';
import { logError } from '../../helpers/api_error';
import { createNoteApi, deleteNoteApi, getNoteListApi, saveNoteApi } from './apis/noteApi';
import { logoutUser } from '../actions/user';

export function* getNoteList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(getNoteListApi, completePayload);
      yield put(getNoteListSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(getNoteListFailure(error));
  }
}

export function* watchForGetNoteList() {
  yield takeLatest(`${NOTE_LIST}_REQUESTED`, getNoteList);
}

export function* createNote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(createNoteApi, completePayload);
      yield put(createNoteSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(createNoteFailure('Create Note failed'));
  }
}

export function* watchForCreateNote() {
  yield takeLatest(`${NOTE_CREATE}_REQUESTED`, createNote);
}

export function* saveNote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(saveNoteApi, completePayload);
      yield put(saveNoteSuccess(response.data));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(saveNoteFailure('Note save failed'));
  }
}

export function* watchForSaveNote() {
  yield takeLatest(`${NOTE_SAVE}_REQUESTED`, saveNote);
}

export function* deleteNote(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      yield call(deleteNoteApi, completePayload);
      yield put(deleteNoteSuccess(action.payload.noteId));
    } else {
      yield put(logoutUser());
    }
  } catch (error) {
    logError(error);
    yield put(deleteNoteFailure('Note delete failed'));
  }
}

export function* watchForDeleteNote() {
  yield takeLatest(`${NOTE_DELETE}_REQUESTED`, deleteNote);
}
