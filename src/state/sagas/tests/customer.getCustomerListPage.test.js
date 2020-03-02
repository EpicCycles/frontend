import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { CUSTOMER_LIST } from '../../actions/user';
import { LOGIN_URL } from '../../../components/menus/helpers/menu';
import { CLEAR_ALL_STATE } from '../../actions/application';
import { getCustomerList, getCustomerListPage } from '../customer';

jest.mock('../apis/customerApi');
const { getCustomerListApi } = require('../apis/customerApi');

describe('customer.getCustomerListApi saga', () => {
  const action = {
    type: `${CUSTOMER_LIST}_REQUESTED`,
    payload: { page: 1 },
  };
  afterEach(() => {
    getCustomerListApi.mockClear();
  });
  it('should create action to put customers in state when api succeeds', async () => {
    const dispatched = [];
    const customers = [{ id: 1 }, { id: 2 }];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({
        user: { token: 'existingToken' },
        customer: { searchParams: { first_name: 'Anna' } },
      }),
    };
    const historySpy = jest.spyOn(history, 'push');
    getCustomerListApi.mockImplementation(() => {
      return { data: customers };
    });
    const result = await runSaga(myIO, getCustomerListPage, action);
    expect(getCustomerListApi).toHaveBeenCalledWith({
      page: 1,
      first_name: 'Anna',
      token: 'existingToken',
    });
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
    const result = await runSaga(myIO, getCustomerListPage, action);
    expect(getCustomerListApi).toHaveBeenCalledWith({
      page: 1,
      token: 'existingToken',
    });
    expect(historySpy).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        payload: 'Get Customer List Page failed',
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
    const historySpy = jest.spyOn(history, 'push');
    const result = await runSaga(myIO, getCustomerListPage, action);
    expect(getCustomerListApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
