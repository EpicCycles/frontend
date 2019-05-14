import React from 'react';
import toJson from 'enzyme-to-json';
import CustomerAddressEdit from '../../../components/customer/CustomerAddressEdit';
import { ADDRESS_MISSING } from '../../../components/app/model/helpers/error';
import * as utils from '../../../helpers/utils';

utils.generateRandomCode = jest.fn(() => 'dkfjghdkjgdskghkd');
describe('CustomerAddressEdit', () => {
  it('renders correctly with a passed customer address', () => {
    const customerAddress = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const component = shallow(
      <CustomerAddressEdit
        customerAddress={customerAddress}
        customerId={12}
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it('renders correctly with a new customer address', () => {
    const customerAddress = {};
    const component = shallow(
      <CustomerAddressEdit
        customerAddress={customerAddress}
        customerId={12}
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it('processes input changes and sets errors as appropriate for an existing customer', () => {
    const customerAddress = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'SY8 1EE',
      country: 'GB',
      customer: 6,
    };
    const component = shallow(
      <CustomerAddressEdit
        customerAddress={customerAddress}
        customerId={12}
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
      />,
    );
    component.instance().handleInputChange('address1_123', 'new line 1');
    const customerAddressUpdated = {
      id: 123,
      address1: 'new line 1',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'SY8 1EE',
      country: 'GB',
      customer: 6,
      error_detail: {},
      changed: true,
    };
    expect(component.state('customerAddress')).toEqual(customerAddressUpdated);

    const customerAddressWithError = {
      id: 123,
      address1: null,
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'SY8 1EE',
      country: 'GB',
      customer: 6,
      error_detail: { address1: ADDRESS_MISSING },
      changed: true,
    };
    component.instance().handleInputChange('address1_123', '');
    expect(component.state('customerAddress')).toEqual(customerAddressWithError);
  });
  it('processes input changes and sets errors as appropriate for a new customer', () => {
    const customerAddress = {};
    const component = shallow(
      <CustomerAddressEdit
        customerAddress={customerAddress}
        customerId={12}
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
      />,
    );
    component.instance().handleInputChange('address1_123', 'new line 21');
    component.instance().handleInputChange('address2_123', 'new line 22');
    component.instance().handleInputChange('address3_123', 'new line 23');
    component.instance().handleInputChange('address4_123', 'new line 24');
    component.instance().handleInputChange('postcode_123', 'SY8 1EE');
    const customerAddressUpdated = {
      address1: 'new line 21',
      address2: 'new line 22',
      address3: 'new line 23',
      address4: 'new line 24',
      postcode: 'SY8 1EE',
      country: 'GB',
      customer: 12,
      error_detail: {},
      dummyKey: 'dkfjghdkjgdskghkd',
      changed: true,
    };
    expect(component.state('customerAddress')).toEqual(customerAddressUpdated);
  });
  it('resets back to existing customer when requested', () => {
    const customerAddress = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const component = shallow(
      <CustomerAddressEdit
        customerAddress={customerAddress}
        customerId={12}
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
      />,
    );
    component.instance().handleInputChange('address1_123', 'new line 21');
    component.instance().handleInputChange('address2_123', 'new line 22');
    component.instance().handleInputChange('address3_123', 'new line 23');
    component.instance().handleInputChange('address4_123', 'new line 24');
    component.instance().handleInputChange('postcode_123', 'new postcode');
    expect(component.state('customerAddress')).not.toEqual(customerAddress);

    component.instance().onClickReset();

    expect(component.state('customerAddress')).toEqual(customerAddress);
  });
  it('resets back for new customer when requested', () => {
    const customerAddress = {};
    const expectedStateAddress = {
      customer: 12,
      country: 'GB',
      dummyKey: 'dkfjghdkjgdskghkd',
    };
    const component = shallow(
      <CustomerAddressEdit
        customerAddress={customerAddress}
        customerId={12}
        deleteCustomerAddress={jest.fn()}
        saveCustomerAddress={jest.fn()}
      />,
    );
    component.instance().handleInputChange('address1_123', 'new line 21');
    component.instance().handleInputChange('address2_123', 'new line 22');
    component.instance().handleInputChange('address3_123', 'new line 23');
    component.instance().handleInputChange('address4_123', 'new line 24');
    component.instance().handleInputChange('postcode_123', 'new postcode');
    expect(component.state('customerAddress')).not.toEqual({});

    component.instance().onClickReset();
    expect(component.state('customerAddress')).toEqual(expectedStateAddress);
  });
});
