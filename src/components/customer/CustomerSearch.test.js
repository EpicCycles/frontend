import React from 'react';
import CustomerSearch from './CustomerSearch';
import { assertComponentHasExpectedProps, findDataTest } from '../../helpers/jest_helpers/assert';

describe('CustomerSearch', () => {
  const getCustomerList = jest.fn();
  const searchParams = {
    firstName: 'Bob',
    lastName: 'Field',
    email: 'Bob.field',
  };
  describe('display only', () => {
    test('should display with empty search fields when initially loaded', () => {
      const component = shallow(<CustomerSearch getCustomerList={getCustomerList} />);
      expect(component.find('Search')).toHaveLength(1);
    });
    test('should display with used search fields when loaded', () => {
      const component = shallow(
        <CustomerSearch getCustomerList={getCustomerList} searchParams={searchParams} />,
      );
      expect(component.find('Search')).toHaveLength(1);
    });
  });
  test('should call passed function with search criteria when find is clicked', () => {
    const component = shallow(
      <CustomerSearch getCustomerList={getCustomerList} searchParams={searchParams} />,
    );
    component.instance().customerSearch({ firstName: 'Able', lastName: 'Seaman', email: 'Pig' });

    expect(getCustomerList).toBeCalledTimes(1);
    expect(getCustomerList).toBeCalledWith('Able', 'Seaman', 'Pig');
  });
});
