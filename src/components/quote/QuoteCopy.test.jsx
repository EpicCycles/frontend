import QuoteCopy from './QuoteCopy';
import { sampleBikes, sampleBrands, sampleFrames } from '../../helpers/sampleData';
import { findDataTest } from '../../helpers/jest_helpers/assert';
import * as PropTypes from 'prop-types';
// TODO mock out copy function and change that it is called and that save is called correctly
describe('QuoteCopy', () => {
  const customers = [{ id: 1, first_name: 'Fred', last_name: 'Smith' }];
  const defaultProps = {
    changeRoute: jest.fn(),
    getCustomerList: jest.fn(),
    getFrameList: jest.fn(),
    saveQuote: jest.fn(),
    searchParams: {},
    isLoading: false,
    customers: customers,
    bikes: sampleBikes,
    brands: sampleBrands,
    charges: [],
    frames: sampleFrames,
    suppliers: [],
    parts: [],
    sections: [],
    users: [],
  };
  it('should render with find customer and find bike components', () => {
    const component = shallow(
      <QuoteCopy {...defaultProps} quoteId={2} quotes={[{ id: 2, customer: 23, bike: 53 }]} />,
    );
    expect(findDataTest(component, 'page-header')).toHaveLength(1);
    expect(findDataTest(component, 'select-customer')).toHaveLength(1);
    expect(findDataTest(component, 'select-bike')).toHaveLength(1);
    expect(findDataTest(component, 'copy-button')).toHaveLength(1);
  });
  it('should render with find customer only when source quote has no bike', () => {
    const component = shallow(
      <QuoteCopy
        {...defaultProps}
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
        {...defaultProps}
        saveQuote={saveQuote}
        bikes={sampleBikes}
        quoteId={2}
        quotes={[{ id: 2, customer: 23 }]}
        customers={[
          { id: 23, first_name: 'Sue' },
          { id: 1, first_name: 'Bill' },
        ]}
      />,
    );

    component.find('CustomerListAndSelect').prop('selectCustomer')('selectedCustomer', 1);
    findDataTest(component, 'copy-button').simulate('click');
    expect(saveQuote).toHaveBeenCalledTimes(1);
  });
  it('should create a new quote with customer and bike when create quote is clicked', () => {
    const saveQuote = jest.fn();
    const component = shallow(
      <QuoteCopy
        {...defaultProps}
        saveQuote={saveQuote}
        bikes={sampleBikes}
        quoteId={2}
        quotes={[{ id: 2, customer: 23, bike: 59 }]}
        customers={[{ id: 23, first_name: 'Sue' }]}
      />,
    );
    component.find('BikeListAndSelect').prop('onChange')('selectedBike', 58);
    findDataTest(component, 'copy-button').simulate('click');
    expect(saveQuote).toHaveBeenCalledTimes(1);
  });
});
