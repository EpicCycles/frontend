import React from 'react';

import { findDataTest } from '../../../test/jest_helpers/assert';
import CustomerPhoneGrid from '../../../components/customer/CustomerPhoneGrid';

describe('CustomerPhoneGrid', () => {
  it('should render only a new phone when no phones passed', () => {
    const component = shallow(
      <CustomerPhoneGrid deleteCustomerPhone={jest.fn()} saveCustomerPhone={jest.fn()} />,
    );
    expect(findDataTest(component, 'existing-phone')).toHaveLength(0);
  });
  it('should render existing and new phones when phones passed', () => {
    const phones = [
      { id: 1, telephone: 'FirstLine 1' },
      { id: 2, telephone: 'FirstLine 2' },
      { id: 3, telephone: 'FirstLine 3' },
    ];
    const component = shallow(
      <CustomerPhoneGrid
        deleteCustomerPhone={jest.fn()}
        saveCustomerPhone={jest.fn()}
        phones={phones}
      />,
    );
    expect(findDataTest(component, 'existing-phone')).toHaveLength(3);
  });
  it('should call add phone with the customer Id when a new phone is requested', () => {
    const addCustomerPhone = jest.fn();
    const component = shallow(
      <CustomerPhoneGrid
        deleteCustomerPhone={jest.fn()}
        saveCustomerPhone={jest.fn()}
        addCustomerPhone={addCustomerPhone}
        customerId={23}
      />,
    );
    component.instance().addNewPhone();
    expect(addCustomerPhone).toHaveBeenCalled();
  });
});
