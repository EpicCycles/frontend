import {
  BRAND_DELETE,
  BRAND_SAVE,
  BRANDS,
  CORE_DATA,
  BRANDS_SAVE,
  BRANDS_UPDATE,
  SUPPLIER_DELETE,
  SUPPLIER_SAVE,
  CHARGE_DELETE,
  CHARGE_SAVE,
} from '../actions/core';
import { USER_LOGIN, USER_LOGOUT } from '../actions/user';
import {
  removeItemFromArray,
  updateObjectInArray,
  updateObjectWithApiErrors,
} from '../../helpers/utils';

const initialState = {
  isLoading: false,
};
const core = (state = initialState, action) => {
  switch (action.type) {
    case `${USER_LOGIN}_REQUESTED`:
    case USER_LOGOUT:
      return initialState;
    case `${SUPPLIER_SAVE}_REQUESTED`:
    case `${SUPPLIER_DELETE}_REQUESTED`:
    case `${BRAND_SAVE}_REQUESTED`:
    case `${BRAND_DELETE}_REQUESTED`:
    case `${CHARGE_SAVE}_REQUESTED`:
    case `${CHARGE_DELETE}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
      };
    case `${BRAND_SAVE}_OK`:
      return {
        ...state,
        brands: updateObjectInArray(state.brands, action.payload.brand),
        isLoading: false,
      };
    case `${BRAND_DELETE}_OK`:
      return {
        ...state,
        brands: removeItemFromArray(state.brands, action.payload.brandId),
        isLoading: false,
      };
    case `${CORE_DATA}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
        brands: [],
        charges: [],
        suppliers: [],
      };
    case `${BRANDS}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
        brands: [],
      };
    case `${BRANDS_SAVE}_REQUESTED`:
      return {
        ...state,
        isLoading: true,
      };
    case `${BRAND_SAVE}_ERROR`:
      const brandWithErrors = updateObjectWithApiErrors(action.payload.brand, action.payload);
      return {
        ...state,
        isLoading: false,
        brands: updateObjectInArray(state.brands, brandWithErrors),
      };
    case `${CORE_DATA}_ERROR`:
    case `${BRANDS}_ERROR`:
    case `${BRANDS_SAVE}_ERROR`:
    case `${BRAND_DELETE}_ERROR`:
    case `${CHARGE_SAVE}_ERROR`:
    case `${CHARGE_DELETE}_ERROR`:
    case `${SUPPLIER_SAVE}_ERROR`:
    case `${SUPPLIER_DELETE}_ERROR`:
      return {
        ...state,
        isLoading: false,
      };

    case `${BRANDS_SAVE}_OK`:
    case BRANDS_UPDATE:
      return {
        ...state,
        brands: action.payload,
        isLoading: false,
      };

    case `${CORE_DATA}_OK`:
      return {
        ...state,
        brands: action.payload.brands,
        charges: action.payload.charges,
        suppliers: action.payload.suppliers,
        isLoading: false,
      };
    case `${BRANDS}_OK`:
      return {
        ...state,
        brands: action.payload.brands,
        isLoading: false,
      };
    case `${CHARGE_SAVE}_ADD`:
      return {
        ...state,
        charges: updateObjectInArray(state.charges, action.payload.charge),
        isLoading: false,
      };
    case `${CHARGE_SAVE}_OK`:
    case `${CHARGE_DELETE}_OK`:
      return {
        ...state,
        charges: action.payload,
        isLoading: false,
      };
    case `${SUPPLIER_SAVE}_OK`:
    case `${SUPPLIER_DELETE}_OK`:
      return {
        ...state,
        suppliers: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default core;
