import {
  CUSTOMER,
  CUSTOMER_CLEAR_STATE,
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_LIST,
  CUSTOMER_PAGE,
  CUSTOMER_SAVE,
} from '../actions/customer';
import { CHANGE_ROUTE, CLEAR_ALL_STATE } from '../actions/application';
import { USER_LOGOUT, USER_NOT_VALIDATED } from '../actions/user';
import { addItemsToArray, removeItemFromArray } from '../../helpers/utils';
import { FIND_QUOTES } from '../actions/quote';
import { CUSTOMER_URL } from '../../components/menus/helpers/menu';
import { customerListToFrontEndFormat, customerToFrontEndFormat } from '../helpers/customer';

const initialState = {
  isLoading: false,
  count: 0,
  previous: '',
  next: '',
  searchParams: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

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
    case USER_NOT_VALIDATED:
      return {
        ...state,
        isLoading: false,
      };
    case CUSTOMER_LIST:
      return {
        ...state,
        customers: customerListToFrontEndFormat(action.payload.customers),
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
        customers: addItemsToArray(state.customers, [
          customerToFrontEndFormat(action.payload.customer),
        ]),
      };
    case CUSTOMER_CREATE:
    case CUSTOMER_SAVE:
      return {
        ...state,
        isLoading: false,
        customerId: action.payload.customer.id,
        customers: addItemsToArray(state.customers, [
          customerToFrontEndFormat(action.payload.customer),
        ]),
      };
    case CUSTOMER_DELETE:
      return {
        ...state,
        isLoading: false,
        customers: removeItemFromArray(state.customers, action.payload.customerId),
        customerId: undefined,
      };
    case `${FIND_QUOTES}_OK`:
      return {
        ...state,
        customers: customerListToFrontEndFormat(action.payload.customers),
        count: 0,
        previous: '',
        next: '',
        searchParams: {
          firstName: '',
          lastName: '',
          email: '',
        },
      };
    default:
      return state;
  }
};

export default customer;
