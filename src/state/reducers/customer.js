import {
  CUSTOMER,
  CUSTOMER_ADDRESS_ADD,
  CUSTOMER_ADDRESS_DELETE,
  CUSTOMER_ADDRESS_SAVE,
  CUSTOMER_CLEAR_STATE,
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_LIST,
  CUSTOMER_PAGE,
  CUSTOMER_PHONE_ADD,
  CUSTOMER_PHONE_DELETE,
  CUSTOMER_PHONE_SAVE,
  FITTING_ADD,
  FITTING_DELETE,
  FITTING_SAVE,
  CUSTOMER_SAVE,
} from '../actions/customer';
import { CHANGE_ROUTE, CLEAR_ALL_STATE } from '../actions/application';
import { USER_LOGOUT, USER_NOT_VALIDATED } from '../actions/user';
import {
  addItemsToArray,
  removeItemFromArray,
  updateObjectInArray,
  updateObjectWithApiErrors,
} from '../../helpers/utils';
import { FIND_QUOTES } from '../actions/quote';
import { CUSTOMER_URL } from '../../components/menus/helpers/menu';

const initialState = {
  isLoading: false,
  customers: [],
  count: 0,
  previous: '',
  next: '',
  searchParams: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

// this seemd to be the bit that is in reducers in loyalty code
const customer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ALL_STATE:
    case CUSTOMER_CLEAR_STATE:
    case USER_LOGOUT:
      return initialState;

    case CHANGE_ROUTE:
      if (action.payload && action.payload.clearState && action.payload.newRoute === CUSTOMER_URL) {
        return initialState;
      }
      return state;

    case CUSTOMER_PAGE:
    case `${CUSTOMER_DELETE}_REQUESTED`:
    case `${CUSTOMER_ADDRESS_DELETE}_REQUEST`:
    case `${CUSTOMER_PHONE_DELETE}_REQUEST`:
    case `${CUSTOMER_PHONE_SAVE}_REQUEST`:
    case `${CUSTOMER_ADDRESS_SAVE}_REQUEST`:
    case `${FITTING_DELETE}_REQUEST`:
    case `${FITTING_SAVE}_REQUEST`:
      return {
        ...state,
        isLoading: true,
      };
    case `${CUSTOMER_LIST}_REQUESTED`:
      return {
        ...state,
        searchParams: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
        isLoading: true,
        customers: [],
        count: 0,
        previous: '',
        next: '',
      };
    case `${CUSTOMER_CREATE}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
      };
    case `${CUSTOMER_SAVE}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
      };
    case `${CUSTOMER}_REQUESTED`:
      return {
        ...state,
        customerId: action.payload.customerId,
        isLoading: true,
      };

    case `${CUSTOMER_LIST}_ERROR`:
      return {
        ...state,
        isLoading: false,
        customers: [],
        count: 0,
        previous: '',
        next: '',
      };

    case `${CUSTOMER}_ERROR`:
      return {
        ...state,
        isLoading: false,
        customer: {},
        totalPages: 0,
      };
    case `${CUSTOMER_SAVE}_ERROR`:
    case `${CUSTOMER_CREATE}_ERROR`:
    case `${CUSTOMER_DELETE}_ERROR`:
    case `${CUSTOMER_PHONE_DELETE}_ERROR`:
    case `${CUSTOMER_ADDRESS_DELETE}_ERROR`:
    case `${FITTING_DELETE}_ERROR`:
    case USER_NOT_VALIDATED:
      return {
        ...state,
        isLoading: false,
      };
    case CUSTOMER_PHONE_ADD:
      return {
        ...state,
        isLoading: false,
        phones: updateObjectInArray(state.phones, action.payload.customerPhone),
      };
    case CUSTOMER_ADDRESS_ADD:
      return {
        ...state,
        isLoading: false,
        addresses: updateObjectInArray(state.addresses, action.payload.customerAddress),
      };
    case `${CUSTOMER_ADDRESS_SAVE}_ERROR`:
      const addressWithError = updateObjectWithApiErrors(
        action.payload.customerAddress,
        action.payload,
      );
      return {
        ...state,
        isLoading: false,
        addresses: updateObjectInArray(state.addresses, addressWithError),
      };
    case `${CUSTOMER_PHONE_SAVE}_ERROR`:
      const phoneWithError = updateObjectWithApiErrors(
        action.payload.customerPhone,
        action.payload,
      );
      return {
        ...state,
        isLoading: false,
        phones: updateObjectInArray(state.phones, phoneWithError),
      };
    case CUSTOMER_LIST:
      return {
        ...state,
        customers: action.payload.customers,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        isLoading: !state.isLoading,
      };
    case CUSTOMER:
      return {
        ...state,
        isLoading: false,
        customerId: action.payload.customer.id,
        customers: addItemsToArray(state.customers, [action.payload.customer]),
        addresses: action.payload.addresses,
        phones: action.payload.phones,
        fittings: action.payload.fittings,
      };
    case CUSTOMER_CREATE:
    case CUSTOMER_SAVE:
      return {
        ...state,
        isLoading: false,
        customerId: action.payload.customer.id,
        customers: addItemsToArray(state.customers, [action.payload.customer]),
      };
    case CUSTOMER_DELETE:
      return {
        ...state,
        isLoading: false,
        customers: removeItemFromArray(state.customers, action.payload.customerId),
        customerId: undefined,
      };
    case CUSTOMER_PHONE_DELETE:
    case CUSTOMER_PHONE_SAVE:
      return {
        ...state,
        isLoading: false,
        phones: action.payload,
      };

    case CUSTOMER_ADDRESS_DELETE:
    case CUSTOMER_ADDRESS_SAVE:
      return {
        ...state,
        isLoading: false,
        addresses: action.payload,
      };
    case `${FIND_QUOTES}_OK`:
      return {
        ...state,
        customers: action.payload.customers,
        count: 0,
        previous: '',
        next: '',
        searchParams: {
          firstName: '',
          lastName: '',
          email: '',
        },
      };
    case FITTING_ADD:
      return {
        ...state,
        isLoading: false,
        fittings: updateObjectInArray(state.fittings, action.payload.fitting),
      };
    case FITTING_DELETE:
    case FITTING_SAVE:
      return {
        ...state,
        isLoading: false,
        fittings: action.payload,
      };
    default:
      return state;
  }
};

export default customer;
