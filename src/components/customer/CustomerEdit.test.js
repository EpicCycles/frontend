import React from 'react';
import CustomerEdit from './CustomerEdit';
import { findDataTest } from '../../helpers/jest_helpers/assert';

const props = {
  saveCustomer: jest.fn(),
  createCustomer: jest.fn(),
  deleteCustomer: jest.fn(),
  createNote: jest.fn(),
  saveNote: jest.fn(),
  deleteNote: jest.fn(),
};
describe('CustomerEdit', () => {
  it('displays a full customer with extras properly', () => {
    const fullCustomer = {
      id: 23,
      first_name: 'anna',
      last_name: 'Blogs',
      email: 'anna@blogs.co.uk',
      addresses: ['1', '2'],
      phones: ['10', '20'],
      fittings: ['1011', '2022'],
    };
    const component = shallow(
      <CustomerEdit customers={[fullCustomer]} customerId={23} notes={[]} {...props} />,
    );
    expect(findDataTest(component, 'edit-customer')).toHaveLength(1);
    expect(findDataTest(component, 'edit-fitting')).toHaveLength(1);
    expect(findDataTest(component, 'fitting-table')).toHaveLength(1);
    expect(findDataTest(component, 'edit-customer-addresses')).toHaveLength(1);
    expect(findDataTest(component, 'edit-customer-phones')).toHaveLength(1);
    expect(findDataTest(component, 'add-customer-note')).toHaveLength(1);
  });
  it('displays a new customer (no id) properly', () => {
    const note = {};
    const component = shallow(<CustomerEdit note={note} {...props} />);
    expect(findDataTest(component, 'edit-customer')).toHaveLength(1);
    expect(findDataTest(component, 'edit-fitting')).toHaveLength(1);
    expect(findDataTest(component, 'fitting-table')).toHaveLength(0);
    expect(findDataTest(component, 'edit-customer-addresses')).toHaveLength(1);
    expect(findDataTest(component, 'edit-customer-phones')).toHaveLength(1);
    expect(findDataTest(component, 'add-customer-note')).toHaveLength(0);
  });
});
