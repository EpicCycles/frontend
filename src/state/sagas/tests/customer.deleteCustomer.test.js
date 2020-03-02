import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { deleteCustomer } from '../customer';

jest.mock('../apis/customerApi');
const { deleteCustomerApi } = require('../apis/customerApi');
const historySpy = jest.spyOn(history, 'push');

describe('customer.deleteCustomer saga', () => {
  const action = {
    type: 'customer/CUSTOMER_DELETE_REQUESTED',
    payload: { customerId: 12 },
  };
  afterEach(() => {
    deleteCustomerApi.mockClear();
    historySpy.mockClear();
  });
  it('should create action to remove customer from state when api succeeds', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    deleteCustomerApi.mockImplementation(() => {
      return;
    });
    const result = await runSaga(myIO, deleteCustomer, action);
    expect(deleteCustomerApi).toHaveBeenCalledWith({ customerId: 12, token: 'existingToken' });
    expect(historySpy).toHaveBeenCalledWith('/');
    expect(dispatched).toEqual([
      {
        type: 'customer/CUSTOMER_DELETE',
        payload: { customerId: 12 },
      },
    ]);
  });
  it('should send error when delete customer fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    deleteCustomerApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, deleteCustomer, action);
    expect(deleteCustomerApi).toHaveBeenCalledWith({ customerId: 12, token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Customer delete failed',
        type: 'customer/CUSTOMER_DELETE_ERROR',
      },
    ]);
  });
  it('should clear state and redirect to login page when no token', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: {} }),
    };
    const result = await runSaga(myIO, deleteCustomer, action);
    expect(deleteCustomerApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
