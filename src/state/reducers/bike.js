import { USER_LOGOUT } from '../actions/user';
import { updateObjectInArray } from '../../helpers/utils';
import {
  bikeListToFrontEndFormat,
  bikeToFrontEndFormat,
  findNextBikeToReview,
  removeIdFromReviewList,
} from '../helpers/bike';
import { CLEAR_ALL_STATE } from '../actions/application';
import {
  BIKE_DELETE,
  BIKE_REVIEW_BIKE,
  BIKE_REVIEW_START,
  BIKE_SAVE,
  CLEAR_FRAME,
  FRAME_ARCHIVE,
  FRAME_DELETE,
  FRAME_LIST,
  FRAME_SAVE,
  FRAME_UPLOAD,
} from '../actions/bike';
import { COPY_QUOTE, CREATE_QUOTE, FIND_QUOTES, GET_QUOTE, UPDATE_QUOTE } from '../actions/quote';
import { CUSTOMER } from '../actions/customer';

const initialState = {
  isLoading: false,
};

const bike = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ALL_STATE:
    case CLEAR_FRAME:
    case USER_LOGOUT:
      return initialState;
    case `${BIKE_DELETE}_OK`:
      return {
        ...state,
        bikes: state.bikes.filter(bike => bike.id !== state.bikeId),
        bikeId: findNextBikeToReview(state.bikeReviewList, state.bikeId),
        bikeReviewList: removeIdFromReviewList(state.bikeReviewList, state.bikeId),
      };
    case `${BIKE_SAVE}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
      };
    case `${BIKE_SAVE}_OK`:
      return {
        ...state,
        bikes: updateObjectInArray(
          state.bikes,
          bikeToFrontEndFormat(action.payload.bike),
          action.payload.bikeId,
        ),
        isLoading: false,
      };
    case BIKE_REVIEW_START:
      // state should just be the list of bikes
      return {
        ...state,
        bikeReviewList: action.payload.bikeReviewList,
        bikeId: action.payload.bikeReviewList.length && action.payload.bikeReviewList[0],
      };
    case BIKE_REVIEW_BIKE:
      return {
        ...state,
        bikeId: action.payload.bikeId,
      };
    case `${FRAME_SAVE}_REQUESTED`:
    case `${FRAME_UPLOAD}_REQUESTED`:
      return {
        ...state,
        frame: action.payload.frame,
        isLoading: true,
      };
    case `${FRAME_SAVE}_OK`:
      return {
        ...state,
        frame: action.payload,
        frames: updateObjectInArray(state.frames, action.payload),
        isLoading: false,
      };
    case `${FRAME_UPLOAD}_OK`:
      return {
        ...state,
        isLoading: false,
      };
    case `${FRAME_LIST}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
      };
    case `${FRAME_LIST}_OK`:
    case `${CREATE_QUOTE}_OK`:
    case `${GET_QUOTE}_OK`:
    case `${COPY_QUOTE}_OK`:
    case `${UPDATE_QUOTE}_OK`:
    case `${FIND_QUOTES}_OK`:
      return {
        ...state,
        frames: action.payload.frames,
        bikes: bikeListToFrontEndFormat(action.payload.bikes),
        isLoading: false,
      };
    case CUSTOMER:
      return {
        ...state,
        frames: action.payload.frames,
        bikes: bikeListToFrontEndFormat(action.payload.bikes),
      };
    case `${BIKE_DELETE}_ERROR`:
    case `${BIKE_SAVE}_ERROR`:
    case `${FRAME_SAVE}_ERROR`:
    case `${FRAME_UPLOAD}_ERROR`:
    case `${FRAME_LIST}_ERROR`:
    case `${FRAME_ARCHIVE}_ERROR`:
    case `${FRAME_DELETE}_ERROR`:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default bike;
