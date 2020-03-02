import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { saveCustomer } from '../customer';

jest.mock('../apis/customerApi');
const { saveCustomerApi } = require('../apis/customerApi');

describe('customer.saveCustomer saga', () => {
  const action = {
    type: 'customer/CUSTOMER_SAVE_REQUESTED',
    payload: { customer: { id: 12 } },
  };
  afterEach(() => {
    saveCustomerApi.mockClear();
  });
  it('should save action to put customer in state when api succeeds', async () => {
    const dispatched = [];
    const customer = { id: 12, savedDate: '12897' };
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    saveCustomerApi.mockImplementation(() => {
      return { data: customer };
    });
    const result = await runSaga(myIO, saveCustomer, action);
    expect(saveCustomerApi).toHaveBeenCalledWith({
      customer: { id: 12 },
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'customer/CUSTOMER_SAVE',
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
    saveCustomerApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, saveCustomer, action);
    expect(saveCustomerApi).toHaveBeenCalledWith({
      customer: { id: 12 },
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Customer save failed',
        type: 'customer/CUSTOMER_SAVE_ERROR',
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
    const result = await runSaga(myIO, saveCustomer, action);
    expect(saveCustomerApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
