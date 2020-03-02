import React from 'react';
import QuoteCopy from './QuoteCopy';
import { sampleBikes } from '../../helpers/sampleData';
import { findDataTest } from '../../helpers/jest_helpers/assert';
// TODO mock out copy function and change that it is called and that save is called correctly
describe('QuoteCopy', () => {
  const customers = [{ id: 1, first_name: 'Fred', last_name: 'Smith' }];
  it('should render with find customer and find bike components', () => {
    const component = shallow(
      <QuoteCopy
        getCustomerList={jest.fn()}
        saveQuote={jest.fn()}
        getFrameList={jest.fn()}
        quoteId={2}
        quotes={[{ id: 2, customer: 23, bike: 53 }]}
        bikes={sampleBikes}
        customers={customers}
      />,
    );
    expect(findDataTest(component, 'page-header')).toHaveLength(1);
    expect(findDataTest(component, 'select-customer')).toHaveLength(1);
    expect(findDataTest(component, 'select-bike')).toHaveLength(1);
    expect(findDataTest(component, 'copy-button')).toHaveLength(1);
  });
  it('should render with find customer only when source quote has no bike', () => {
    const component = shallow(
      <QuoteCopy
        getCustomerList={jest.fn()}
        saveQuote={jest.fn()}
        getFrameList={jest.fn()}
        quoteId={2}
        quotes={[{ id: 2, customer: 23 }]}
        bikes={sampleBikes}
      />,
    );
    expect(findDataTest(component, 'page-header')).toHaveLength(1);
    expect(findDataTest(component, 'select-customer')).toHaveLength(1);
    expect(findDataTest(component, 'select-bike')).toHaveLength(0);
    expect(findDataTest(component, 'copy-button')).toHaveLength(1);
  });

  it('should create a new quote with customer when create quote is clicked', () => {
    const saveQuote = jest.fn();
    const component = shallow(
      <QuoteCopy
        getCustomerList={jest.fn()}
        saveQuote={saveQuote}
        getFrameList={jest.fn()}
        bikes={sampleBikes}
        quoteId={2}
        quotes={[{ id: 2, customer: 23 }]}
        customers={[{ id: 23, first_name: 'Sue' }, { id: 1, first_name: 'Bill' }]}
      />,
    );
    const expectedNewQuote = {
      customer: 1,
      bike: undefined,
    };
    component.instance().handleInputChange('selectedCustomer', 1);
    findDataTest(component, 'copy-button').simulate('click');
    expect(saveQuote).toHaveBeenCalledTimes(1);

    expect(saveQuote.mock.calls[0][0]).toEqual(2);
    expect(saveQuote.mock.calls[0][1]).toEqual(expect.objectContaining(expectedNewQuote));
  });
  it('should create a new quote with customer and bike when create quote is clicked', () => {
    const saveQuote = jest.fn();
    const component = shallow(
      <QuoteCopy
        getCustomerList={jest.fn()}
        saveQuote={saveQuote}
        getFrameList={jest.fn()}
        bikes={sampleBikes}
        quoteId={2}
        quotes={[{ id: 2, customer: 23 }]}
        customers={[{ id: 23, first_name: 'Sue' }]}
      />,
    );
    component.instance().handleInputChange('selectedBike', 58);
    const expectedNewQuote = {
      customer: 23,
      bike: 58,
    };
    findDataTest(component, 'copy-button').simulate('click');
    expect(saveQuote.mock.calls[0][0]).toEqual(2);
    expect(saveQuote.mock.calls[0][1]).toEqual(expect.objectContaining(expectedNewQuote));
  });
});
