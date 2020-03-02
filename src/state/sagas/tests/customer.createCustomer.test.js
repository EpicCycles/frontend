import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { createCustomer } from '../customer';

jest.mock('../apis/customerApi');
const { createCustomerApi } = require('../apis/customerApi');

describe('customer.createCustomer saga', () => {
  const action = {
    type: 'customer/CUSTOMER_CREATE_REQUESTED',
    payload: { customer: { id: 12 } },
  };
  afterEach(() => {
    createCustomerApi.mockClear();
  });
  it('should create action to put customer in state when api succeeds', async () => {
    const dispatched = [];
    const customer = { id: 12, createdDate: '12897' };
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    createCustomerApi.mockImplementation(() => {
      return { data: customer };
    });
    const result = await runSaga(myIO, createCustomer, action);
    expect(createCustomerApi).toHaveBeenCalledWith({
      customer: { id: 12 },
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'customer/CUSTOMER_CREATE',
        payload: { customer },
      },
    ]);
  });
  it('should send error when save customer fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    createCustomerApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, createCustomer, action);
    expect(createCustomerApi).toHaveBeenCalledWith({
      customer: { id: 12 },
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Create Customer failed',
        type: 'customer/CUSTOMER_CREATE_ERROR',
      },
    ]);
  });
  it('should clear state and redirect to login page when no token', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: {} }),
    };
    const historySpy = jest.spyOn(history, 'push');
    const result = await runSaga(myIO, createCustomer, action);
    expect(createCustomerApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
