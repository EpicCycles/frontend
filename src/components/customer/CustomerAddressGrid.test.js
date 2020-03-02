import React from 'react';

import CustomerAddressGrid from './CustomerAddressGrid';
import { findDataTest } from '../../helpers/jest_helpers/assert';

describe('CustomerAddressGrid', () => {
  it('should render only a new address when no addresses passed', () => {
    const component = shallow(
      <CustomerAddressGrid deleteCustomerAddress={jest.fn()} saveCustomerAddress={jest.fn()} />,
    );
    expect(findDataTest(component, 'existing-address')).toHaveLength(0);
    expect(findDataTest(component, 'new-address')).toHaveLength(0);
  });
  it('should render existing and new addresses when addresses passed', () => {
    const addresses = [
      { id: 1, address1: 'FirstLine 1' },
      { id: 2, address1: 'FirstLine 2' },
      { id: 3, address1: 'FirstLine 3' },
    ];
    const newAddress = { dummyKey: 'hdgsjydfsajd' };
    const component = shallow(
      <CustomerAddressGrid
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
        addresses={addresses}
        newAddress={newAddress}
      />,
    );
    expect(findDataTest(component, 'existing-address')).toHaveLength(3);
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
  });
});
