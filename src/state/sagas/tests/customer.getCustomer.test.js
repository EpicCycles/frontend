import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { getCustomer } from '../customer';
import { CUSTOMER } from '../../actions/customer';

jest.mock('../apis/customerApi');
const { getCustomerApi } = require('../apis/customerApi');

describe('customer.getCustomer saga', () => {
  const action = {
    type: `${CUSTOMER}_REQUESTED`,
    payload: { customerId: 12 },
  };
  afterEach(() => {
    getCustomerApi.mockClear();
  });
  it('should create action to put customers in state when api succeeds', async () => {
    const dispatched = [];
    const customers = [{ id: 1 }, { id: 2 }];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getCustomerApi.mockImplementation(() => {
      return { data: customers };
    });
    const result = await runSaga(myIO, getCustomer, action);
    expect(getCustomerApi).toHaveBeenCalledWith({ customerId: 12, token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'customer/CUSTOMER',
        payload: customers,
      },
      {
        type: 'note/NOTE_LIST_REQUESTED',
        payload: { customerId: 12 },
      },
    ]);
  });
  it('should send error when get customer fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getCustomerApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, getCustomer, action);
    expect(getCustomerApi).toHaveBeenCalledWith({ customerId: 12, token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Get Customer failed',
        type: 'customer/CUSTOMER_ERROR',
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
    const result = await runSaga(myIO, getCustomer, action);
    expect(getCustomerApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
