export const CUSTOMER_LIST = 'customer/CUSTOMER_LIST';
export const CUSTOMER_PAGE = 'customer/CUSTOMER_PAGE';
export const CUSTOMER = 'customer/CUSTOMER';
export const CUSTOMER_CREATE = 'customer/CUSTOMER_CREATE';
export const CUSTOMER_SAVE = 'customer/CUSTOMER_SAVE';
export const CUSTOMER_DELETE = 'customer/CUSTOMER_DELETE';
export const CUSTOMER_CLEAR_STATE = 'customer/CUSTOMER_CLEAR_STATE';

export const clearCustomerState = () => ({
  type: CUSTOMER_CLEAR_STATE,
});
export const getCustomerListPage = page => ({
  type: CUSTOMER_PAGE,
  payload: { page },
});

export const getCustomerList = (firstName, lastName, email) => ({
  type: `${CUSTOMER_LIST}_REQUESTED`,
  payload: { firstName, lastName, email },
});

export const getCustomerListSuccess = customers => ({
  type: CUSTOMER_LIST,
  payload: customers,
});

export const getCustomerListFailure = error => ({
  type: `${CUSTOMER_LIST}_ERROR`,
  payload: error,
});

export const getCustomer = customerId => ({
  type: `${CUSTOMER}_REQUESTED`,
  payload: { customerId },
});

export const getCustomerSuccess = responseData => ({
  type: CUSTOMER,
  payload: responseData,
});

export const getCustomerFailure = error => ({
  type: `${CUSTOMER}_ERROR`,
  payload: error,
});
export const createCustomer = customer => ({
  type: `${CUSTOMER_CREATE}_REQUESTED`,
  payload: { customer },
});

export const createCustomerSuccess = customer => ({
  type: CUSTOMER_CREATE,
  payload: { customer },
});

export const createCustomerFailure = error => ({
  type: `${CUSTOMER_CREATE}_ERROR`,
  payload: error,
});

export const saveCustomer = customer => ({
  type: `${CUSTOMER_SAVE}_REQUESTED`,
  payload: { customer },
});

export const saveCustomerSuccess = customer => ({
  type: CUSTOMER_SAVE,
  payload: { customer },
});

export const saveCustomerFailure = error => ({
  type: `${CUSTOMER_SAVE}_ERROR`,
  payload: error,
});

export const deleteCustomer = customerId => ({
  type: `${CUSTOMER_DELETE}_REQUESTED`,
  payload: { customerId: customerId },
});

export const deleteCustomerSuccess = customerId => ({
  type: CUSTOMER_DELETE,
  payload: { customerId: customerId },
});

export const deleteCustomerFailure = error => ({
  type: `${CUSTOMER_DELETE}_ERROR`,
  payload: error,
});
