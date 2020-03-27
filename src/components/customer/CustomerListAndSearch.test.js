import React from 'react';
import toJson from 'enzyme-to-json';
import CustomerListAndSearch from './CustomerListAndSearch';

describe('CustomerListAndSearch.index tests', () => {
  // our mock login function to replace the one provided by mapDispatchToProps

  const initialState = {
    customer: {
      count: 0,
      isLoading: false,
      customers: [],
      page: 1,
      perPage: 5,
    },
  };

  const customers = [
    {
      id: 16,
      first_name: 'Anna',
      last_name: 'Weaver',
      email: 'anna.weaver@johnlewis.co.uk',
      add_date: '2018-07-04T13:02:09.988286+01:00',
      upd_date: '2018-07-04T13:02:09.988343+01:00',
    },
    {
      id: 26,
      first_name: 'dfds',
      last_name: 'Weasdfdsfver',
      add_date: '2018-07-04T13:02:09.988286+01:00',
      upd_date: '2018-07-04T13:02:09.988343+01:00',
    },
  ];
  it('renders the CustomerListAndSearch correctly', () => {
    const mockGetCustomerListPagefn = jest.fn();
    const mockGetCustomerListfn = jest.fn();
    const initialList = shallow(
      <CustomerListAndSearch
        getCustomerListPage={mockGetCustomerListPagefn}
        getCustomerList={mockGetCustomerListfn}
        clearCustomerState={jest.fn()}
        addNewCustomer={jest.fn()}
        getCustomer={jest.fn()}
        count={0}
        f
        isLoading={false}
        page={0}
        totalPages={0}
      />,
    );
    expect(toJson(initialList)).toMatchSnapshot();
    expect(mockGetCustomerListfn).toHaveBeenCalledWith('', '', '');
    expect(mockGetCustomerListPagefn).not.toHaveBeenCalled();
  });
  it('renders the CustomerListAndSearch correctly when there are customers', () => {
    const mockGetCustomerListPagefn = jest.fn();
    const mockGetCustomerListfn = jest.fn();
    const initialList = shallow(
      <CustomerListAndSearch
        getCustomerListPage={mockGetCustomerListPagefn}
        getCustomerList={mockGetCustomerListfn}
        addNewCustomer={jest.fn()}
        clearCustomerState={jest.fn()}
        getCustomer={jest.fn()}
        count={6}
        customers={customers}
        isLoading={false}
        page={0}
        totalPages={1}
        searchParams={{ firstName: 'fred' }}
      />,
    );
    expect(toJson(initialList)).toMatchSnapshot();
    expect(mockGetCustomerListfn).not.toHaveBeenCalled();
    expect(mockGetCustomerListPagefn).not.toHaveBeenCalled();
  });
});
