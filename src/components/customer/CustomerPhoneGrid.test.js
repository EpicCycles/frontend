import React from 'react';

import { findDataTest } from '../../helpers/jest_helpers/assert';
import CustomerPhoneGrid from './CustomerPhoneGrid';

describe('CustomerPhoneGrid', () => {
  it('should render only a new phone when no phoneNumbers passed', () => {
    const component = shallow(
      <CustomerPhoneGrid deleteCustomerPhone={jest.fn()} saveCustomerPhone={jest.fn()} />,
    );
    expect(findDataTest(component, 'existing-phone')).toHaveLength(0);
    expect(findDataTest(component, 'new-phone')).toHaveLength(0);
  });
  it('should render existing and new phoneNumbers when phoneNumbers passed', () => {
    const phoneNumbers = [
      { id: 1, telephone: 'FirstLine 1' },
      { id: 2, telephone: 'FirstLine 2' },
      { id: 3, telephone: 'FirstLine 3' },
    ];
    const newPhone = { telephone: '7889987' };
    const component = shallow(
      <CustomerPhoneGrid
        deleteCustomerPhone={jest.fn()}
        saveCustomerPhone={jest.fn()}
        phoneNumbers={phoneNumbers}
        newPhone={{}}
      />,
    );
    expect(findDataTest(component, 'existing-phone')).toHaveLength(3);
    expect(findDataTest(component, 'new-phone')).toHaveLength(1);
  });
});
