import { ADD_MESSAGE, CLEAR_ALL_STATE, REMOVE_MESSAGE } from '../actions/application';
import {
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_LIST,
  CUSTOMER_SAVE,
} from '../actions/customer';
import { NOTE_CREATE, NOTE_DELETE, NOTE_LIST, NOTE_REMOVE, NOTE_SAVE } from '../actions/note';
import {
  CHANGE_PASSWORD,
  CHANGE_USER_DATA,
  GET_USERS,
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions/user';
import { FRAMEWORK, FRAMEWORK_SAVE } from '../actions/framework';
import { BRANDS_SAVE, CHARGE_SAVE, SUPPLIER_SAVE } from '../actions/core';
import {
  BIKE_DELETE,
  BIKE_SAVE,
  FRAME_ARCHIVE,
  FRAME_SAVE,
  FRAME_UPLOAD,
  GET_BIKE,
} from '../actions/bike';
import { PART_UPLOAD } from '../actions/part';
import { CUSTOMER } from '../../components/app/model/helpers/fields';
import { CREATE_QUOTE, FIND_QUOTES, GET_QUOTE, UPDATE_QUOTE } from '../actions/quote';

const initialState = {
  message: '',
  messageType: '',
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case FRAMEWORK_SAVE:
    case `${BRANDS_SAVE}_OK`:
    case `${FRAME_SAVE}_OK`:
    case `${BIKE_SAVE}_OK`:
    case `${CREATE_QUOTE}_OK`:
    case `${SUPPLIER_SAVE}_OK`:
    case `${CHARGE_SAVE}_OK`:
      return {
        ...state,
        message: 'Changes saved',
        messageType: 'I',
      };
    case `${FRAME_ARCHIVE}_OK`:
      return {
        ...state,
        message: 'Frames archived',
        messageType: 'I',
      };
    case `${FRAME_ARCHIVE}_ERROR`:
      return {
        ...state,
        message: 'Frame archive - error occurred',
        messageType: 'I',
      };
    case CUSTOMER_DELETE:
      return {
        ...state,
        message: 'Customer deleted',
        messageType: 'I',
      };
    case `${CHANGE_PASSWORD}_SUCCESS`:
      return {
        ...state,
        message: 'Password Changed',
        messageType: 'I',
      };
    case `${CHANGE_USER_DATA}_SUCCESS`:
      return {
        ...state,
        message: 'Details Changed',
        messageType: 'I',
      };
    case ADD_MESSAGE:
      return {
        ...state,
        message: action.payload.messageText,
        messageType: action.payload.messageType,
      };
    case `${CUSTOMER_CREATE}_REQUESTED`:
    case `${CUSTOMER_DELETE}_REQUESTED`:
    case `${CUSTOMER_LIST}_REQUESTED`:
    case `${CUSTOMER}_REQUESTED`:
    case `${CUSTOMER_SAVE}_REQUESTED`:
    case `${NOTE_CREATE}_REQUESTED`:
    case `${NOTE_SAVE}_REQUESTED`:
    case `${NOTE_DELETE}_REQUESTED`:
    case `${NOTE_LIST}_REQUESTED`:
    case NOTE_REMOVE:
    case REMOVE_MESSAGE:
    case `${USER_LOGIN}_REQUESTED`:
    case USER_LOGIN:
    case USER_LOGOUT:
    case CLEAR_ALL_STATE:
    case `${FRAME_SAVE}_REQUESTED`:
    case `${CREATE_QUOTE}_REQUESTED`:
    case `${FIND_QUOTES}_REQUESTED`:
    case `${GET_QUOTE}_REQUESTED`:
    case `${UPDATE_QUOTE}_REQUESTED`:
      return initialState;
    case `${CUSTOMER_LIST}_ERROR`:
    case `${CUSTOMER_CREATE}_ERROR`:
    case `${CUSTOMER_DELETE}_ERROR`:
    case `${CUSTOMER_SAVE}_ERROR`:
    case `${NOTE_LIST}_ERROR`:
    case `${NOTE_SAVE}_ERROR`:
    case `${NOTE_CREATE}_ERROR`:
    case `${NOTE_DELETE}_ERROR`:
    case `${USER_LOGIN}_ERROR`:
    case `${USER_LOGOUT}_ERROR`:
    case `${CHANGE_PASSWORD}_FAILURE`:
    case `${CHANGE_USER_DATA}_FAILURE`:
    case `${FRAMEWORK}_ERROR`:
    case `${FRAMEWORK_SAVE}_ERROR`:
    case `${BRANDS_SAVE}_ERROR`:
    case `${GET_BIKE}_ERROR`:
    case `${FRAME_SAVE}_ERROR`:
    case `${FRAME_UPLOAD}_ERROR`:
    case `${BIKE_DELETE}_ERROR`:
    case `${BIKE_SAVE}_ERROR`:
    case `${PART_UPLOAD}_ERROR`:
    case `${CREATE_QUOTE}_ERROR`:
    case `${FIND_QUOTES}_ERROR`:
    case `${GET_QUOTE}_ERROR`:
    case `${UPDATE_QUOTE}_ERROR`:
    case `${GET_USERS}_FAILURE`:
    case `${SUPPLIER_SAVE}_ERROR`:
    case `${CHARGE_SAVE}_ERROR`:
      return {
        ...state,
        message: action.payload,
        messageType: 'E',
      };
    default:
      return state;
  }
};

export default application;
