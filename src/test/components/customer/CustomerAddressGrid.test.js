import React from 'react';

import CustomerAddressGrid from '../../../components/customer/CustomerAddressGrid';
import { findDataTest } from '../../../test/jest_helpers/assert';

describe('CustomerAddressGrid', () => {
  it('should render only a new address when no addresses passed', () => {
    const component = shallow(
      <CustomerAddressGrid deleteCustomerAddress={jest.fn()} saveCustomerAddress={jest.fn()} />,
    );
    expect(findDataTest(component, 'existing-address')).toHaveLength(0);
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
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
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
    expect(component.state('newAddress').address1).toEqual(undefined);
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
    component.instance().saveNewCustomerAddress(newAddressToSave);
    component.update();
    expect(component.state('newAddress')).toEqual(newAddressToSave);

    expect(findDataTest(component, 'existing-address')).toHaveLength(3);
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
    component.setProps({ addresses: addressesWithNewAddress });
    // component.update();

    expect(findDataTest(component, 'existing-address')).toHaveLength(4);
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
    expect(component.state('newAddress')).not.toEqual(newAddressToSave);
  });
  it('should not replace the new address when the props have a diff new address', () => {
    const addresses = [
      { id: 1, address1: 'FirstLine 1' },
      { id: 2, address1: 'FirstLine 2' },
      { id: 3, address1: 'FirstLine 3' },
    ];
    const addressesWithNewAddress = [
      { id: 1, address1: 'FirstLine 1' },
      { id: 3, address1: 'FirstLine 3' },
      { id: 4, address1: 'New Line 1' },
    ];
    const component = shallow(
      <CustomerAddressGrid
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
        addresses={addresses}
      />,
    );
    const newAddressToSave = { address1: 'New Line 1 not this', dummyKey: 'dummyKey' };
    component.instance().saveNewCustomerAddress(newAddressToSave);
    component.update();
    expect(component.state('newAddress')).toEqual(newAddressToSave);

    expect(findDataTest(component, 'existing-address')).toHaveLength(3);
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
    component.setProps({ addresses: addressesWithNewAddress });
    component.update();

    expect(findDataTest(component, 'existing-address')).toHaveLength(3);
    expect(findDataTest(component, 'new-address')).toHaveLength(1);
    expect(component.state('newAddress')).toEqual(newAddressToSave);
  });
  it('saves a customer address with the customer Id when a new address is saved', () => {
    const saveCustomerAddress = jest.fn();
    const component = shallow(
      <CustomerAddressGrid
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={saveCustomerAddress}
        customerId={23}
      />,
    );
    const newAddressToSave = { address1: 'New Line 1 not this', dummyKey: 'dummyKey' };
    component.instance().saveNewCustomerAddress(newAddressToSave);
    expect(saveCustomerAddress).toHaveBeenCalledWith({
      customer: 23,
      address1: 'New Line 1 not this',
      dummyKey: 'dummyKey',
    });
  });
});
