import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { CUSTOMER_LIST } from '../../actions/user';
import { getCustomerList } from '../customer';

jest.mock('../apis/customerApi');
const { getCustomerListApi } = require('../apis/customerApi');

describe('customer.getCustomerListApi saga', () => {
  const action = {
    type: `${CUSTOMER_LIST}_REQUESTED`,
  };
  afterEach(() => {
    getCustomerListApi.mockClear();
  });
  it('should create action to put customers in state when api succeeds', async () => {
    const dispatched = [];
    const customers = [{ id: 1 }, { id: 2 }];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getCustomerListApi.mockImplementation(() => {
      return { data: customers };
    });
    await runSaga(myIO, getCustomerList, action);
    expect(getCustomerListApi).toHaveBeenCalledWith({ page: 1, token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'customer/CUSTOMER_LIST',
        payload: customers,
      },
    ]);
  });
  it('should send error when get customers fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getCustomerListApi.mockRejectedValue(new Error('the error'));
    await runSaga(myIO, getCustomerList, action);
    expect(getCustomerListApi).toHaveBeenCalledWith({ page: 1, token: 'existingToken' });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Get Customer List failed',
        type: 'customer/CUSTOMER_LIST_ERROR',
      },
    ]);
  });
  it('should clear state and redirect to login page when no token', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: {} }),
    };
    await runSaga(myIO, getCustomerList, action);
    expect(getCustomerListApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
