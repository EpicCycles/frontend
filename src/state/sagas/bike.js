import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as selectors from '../selectors/user';
import bikeApi from './apis/bikeApi';
import history from '../../history';
import {
  archiveFramesError,
  archiveFramesSuccess,
  BIKE_DELETE,
  BIKE_SAVE,
  bikeDeleted,
  deleteBikesError,
  deleteBikesSuccess,
  deleteFramesError,
  deleteFramesSuccess,
  FRAME_ARCHIVE,
  FRAME_DELETE,
  FRAME_LIST,
  FRAME_SAVE,
  FRAME_UPLOAD,
  GET_BIKE,
  getBikeError,
  getBikeOK,
  getFrameList,
  getFrameListError,
  getFrameListOK,
  saveBikeError,
  saveBikeOK,
  saveFrameError,
  saveFrameSuccess,
  uploadFrameError,
  uploadFrameSuccess,
} from '../actions/bike';
import { logError } from '../../helpers/api_error';
import { addMessage } from '../actions/application';
import {
  INFO_MESSAGE,
  UPLOAD_PARTIAL_SUCCESS,
  UPLOAD_SUCCESS,
  WARNING_MESSAGE,
} from '../../helpers/messages';
import { doWeHaveObjects, updateObject } from '../../helpers/utils';
import { LOGIN_URL } from '../../helpers/routes';

export function* getBike(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(bikeApi.getBike, completePayload);
      yield put(getBikeOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(getBikeError('Get Bike failed'));
  }
}

export function* watchForGetBike() {
  yield takeLatest(`${GET_BIKE}_REQUESTED`, getBike);
}

export function* saveBike(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(bikeApi.saveBike, completePayload);
      yield put(saveBikeOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(saveBikeError('Save Bike failed'));
  }
}

export function* watchForSaveBike() {
  yield takeLatest(`${BIKE_SAVE}_REQUESTED`, saveBike);
}

export function* deleteBikes(bikeIdsToDelete, token) {
  try {
    for (let i = 0; i < bikeIdsToDelete.length; i++) {
      yield call(bikeApi.deleteBike, { bikeId: bikeIdsToDelete[i], token });
      yield put(bikeDeleted(bikeIdsToDelete[i]));
    }
  } catch (error) {
    logError(error);
    yield put(deleteBikesError('Delete Bikes failed'));
  }
}

export function* deleteBikesAndGetList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const bikeIdsToDelete = action.payload.bikeDeleteList;
      const searchCriteria = action.payload.searchCriteria;

      if (bikeIdsToDelete && bikeIdsToDelete.length > 0) {
        yield* deleteBikes(bikeIdsToDelete, token);
      }

      if (searchCriteria && searchCriteria.brand) {
        const searchPayload = updateObject(searchCriteria, { token });
        const searchResponse = yield call(bikeApi.getFrames, searchPayload);
        yield put(getFrameListOK(searchResponse.data));
      } else {
        yield put(deleteBikesSuccess());
      }
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(deleteBikesError('Delete Bikes failed'));
  }
}

export function* watchForDeleteBikes() {
  yield takeLatest(`${BIKE_DELETE}_REQUESTED`, deleteBikesAndGetList);
}

export function* deleteFrames(frameIdsToDelete, token) {
  try {
    for (let i = 0; i < frameIdsToDelete.length; i++) {
      yield call(bikeApi.deleteFrame, { frameId: frameIdsToDelete[i], token });
    }
  } catch (error) {
    logError(error);
    yield put(deleteFramesError('Delete Frames failed'));
  }
}

export function* deleteFramesAndGetList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const frameIdsToDelete = action.payload.frameDeleteList;
      const searchCriteria = action.payload.searchCriteria;

      if (frameIdsToDelete && frameIdsToDelete.length > 0) {
        yield* deleteFrames(frameIdsToDelete, token);
      }

      if (searchCriteria && searchCriteria.brand) {
        const searchPayload = updateObject(searchCriteria, { token });
        const searchResponse = yield call(bikeApi.getFrames, searchPayload);
        yield put(getFrameListOK(searchResponse.data));
      } else {
        yield put(deleteFramesSuccess());
      }
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(deleteFramesError('Delete Frames failed'));
  }
}

export function* watchForDeleteFrames() {
  yield takeLatest(`${FRAME_DELETE}_REQUESTED`, deleteFramesAndGetList);
}

export function* archiveFrames(frameIdsToArchive, token) {
  try {
    for (let i = 0; i < frameIdsToArchive.length; i++) {
      const frame = { id: frameIdsToArchive[i], archived: true };
      yield call(bikeApi.saveFrame, { frame, token });
    }
  } catch (error) {
    yield put(archiveFramesError('Archive Frames failed'));
  }
}

export function* archiveFramesAndGetList(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const frameIdsToArchive = action.payload.frameArchiveList;
      const searchCriteria = action.payload.searchCriteria;

      if (frameIdsToArchive && frameIdsToArchive.length > 0) {
        yield* archiveFrames(frameIdsToArchive, token);
      }

      if (searchCriteria && searchCriteria.brand) {
        const searchPayload = updateObject(searchCriteria, { token });
        const searchResponse = yield call(bikeApi.getFrames, searchPayload);
        yield put(getFrameListOK(searchResponse.data));
      } else {
        yield put(archiveFramesSuccess());
      }
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(archiveFramesError('Archive Frames failed'));
  }
}

export function* watchForArchiveFrames() {
  yield takeLatest(`${FRAME_ARCHIVE}_REQUESTED`, archiveFramesAndGetList);
}

export function* saveFrame(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(bikeApi.saveFrame, completePayload);
      if (completePayload.searchCriteria) {
        const searchPayload = updateObject(completePayload.searchCriteria, { token });
        const searchResponse = yield call(bikeApi.getFrames, searchPayload);
        yield put(getFrameListOK(searchResponse.data));
      } else {
        yield put(saveFrameSuccess(response.data));
      }
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(saveFrameError('Save Frame failed'));
  }
}

export function* watchForSaveFrame() {
  yield takeLatest(`${FRAME_SAVE}_REQUESTED`, saveFrame);
}

export function* uploadFrame(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      // structure is frame { [bikes { [parts]}}
      const frameData = action.payload.frame;
      const completePayload = { token, frame: frameData };
      const response = yield call(bikeApi.uploadFrame, completePayload);

      if (response.status === 201) {
        yield put(addMessage(UPLOAD_SUCCESS, INFO_MESSAGE));
      } else {
        yield put(addMessage(UPLOAD_PARTIAL_SUCCESS, WARNING_MESSAGE));
      }
      const searchCriteria = {
        brand: action.payload.frame.brand,
        frameName: action.payload.frame.frame_name,
        archived: false,
      };
      yield put(uploadFrameSuccess());
      yield put(getFrameList(searchCriteria));
      yield call(history.push, '/bike-review');
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(uploadFrameError('Upload Frame failed'));
  }
}

export function* watchForUploadFrame() {
  yield takeLatest(`${FRAME_UPLOAD}_REQUESTED`, uploadFrame);
}

export function* getFrames(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(bikeApi.getFrames, completePayload);
      if (response.data && !doWeHaveObjects(response.data.frames))
        yield put(addMessage('No matches found', 'I'));
      yield put(getFrameListOK(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    yield put(getFrameListError('Get Frames failed'));
  }
}

export function* watchForGetFrames() {
  yield takeLatest(`${FRAME_LIST}_REQUESTED`, getFrames);
}
