import React from 'react';

import CustomerAddressGrid from './CustomerAddressGrid';
import { findDataTest } from '../../helpers/jest_helpers/assert';

describe('CustomerAddressGrid', () => {
  it('should render only a new address when no addresses passed', () => {
    const component = shallow(
      <CustomerAddressGrid deleteCustomerAddress={jest.fn()} saveCustomerAddress={jest.fn()} />,
    );
    expect(findDataTest(component, 'existing-address')).toHaveLength(0);
  });
  it('should render existing and new addresses when addresses passed', () => {
    const addresses = [
      { id: 1, address1: 'FirstLine 1' },
      { id: 2, address1: 'FirstLine 2' },
      { id: 3, address1: 'FirstLine 3' },
    ];
    const component = shallow(
      <CustomerAddressGrid
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
        addresses={addresses}
      />,
    );
    expect(findDataTest(component, 'existing-address')).toHaveLength(3);
  });
  it('should replace the new address when the props change to include a new address', () => {
    const addresses = [
      { id: 1, address1: 'FirstLine 1' },
      { id: 2, address1: 'FirstLine 2' },
      { id: 3, address1: 'FirstLine 3' },
    ];
    const newAddressToSave = { address1: 'New Line 1', dummyKey: 'dummyKey' };
    const addressesWithNewAddress = [
      { id: 1, address1: 'FirstLine 1' },
      { id: 2, address1: 'FirstLine 2' },
      { id: 3, address1: 'FirstLine 3' },
      newAddressToSave,
    ];
    const component = shallow(
      <CustomerAddressGrid
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
        addresses={addresses}
      />,
    );

    expect(findDataTest(component, 'existing-address')).toHaveLength(3);
    component.setProps({ addresses: addressesWithNewAddress });

    expect(findDataTest(component, 'existing-address')).toHaveLength(4);
  });
  it('should add a customer address with the customer Id when a new address is requested', () => {
    const addCustomerAddress = jest.fn();
    const component = shallow(
      <CustomerAddressGrid
        deleteCustomerAddress={jest.fn()}
        addCustomerAddress={addCustomerAddress}
        customerId={23}
      />,
    );
    component.instance().addNewAddress();
    expect(addCustomerAddress).toHaveBeenCalled();
  });
});
