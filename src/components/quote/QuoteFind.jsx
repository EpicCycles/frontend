/* eslint-disable react/destructuring-assignment */
import React from 'react';
import * as PropTypes from 'prop-types';

import { updateObject } from '../../helpers/utils';
import CustomerListAndSelect from '../customer/CustomerListAndSelect';
import BikeListAndSelect from '../bike/BikeListAndSelect';
import SearchButton from '../../common/SearchButton';
import { CHECKBOX, TEXT } from '../app/model/helpers/fields';
import Search from '../../common/Search';
import { CUSTOMER_URL } from '../menus/helpers/menu';

class QuoteFind extends React.Component {
  state = {
    bikeSearchCriteria: {},
  };

  goToAddCustomer = () => {
    this.props.changeRoute(CUSTOMER_URL, true);
  };

  handleInputChange = (fieldName, input) => {
    const newState = updateObject(this.state);
    newState[fieldName] = input;
    this.setState(newState);
  };
  raiseStateForCriteria = bikeSearchCriteria => {
    this.setState({ bikeSearchCriteria });
  };

  checkCriteriaForQuoteSearch = () => {
    const { quoteDesc, bikeSearchCriteria, selectedCustomer, bike } = this.state;

    if (quoteDesc || bike || selectedCustomer) return true;
    if (bikeSearchCriteria && (bikeSearchCriteria.brand || bikeSearchCriteria.frameName))
      return true;

    return false;
  };

  getQuoteList = () => {
    const {
      quoteDesc = '',
      bikeSearchCriteria = {},
      selectedCustomer = '',
      bike = '',
    } = this.state;
    const { brand = '', frameName = '', archived } = bikeSearchCriteria;
    this.props.getQuoteList({ quoteDesc, brand, frameName, selectedCustomer, bike, archived });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter' && this.checkCriteriaForQuoteSearch()) {
      this.getQuoteList();
    }
  };

  render() {
    const { quoteDesc, brand, frameName, selectedCustomer, bike, archived } = this.state;
    const {
      brands,
      bikes,
      frames,
      getFrameList,
      getCustomerList,
      searchParams,
      isLoading,
      customers,
      count,
      next,
    } = this.props;
    const searchFields = [
      {
        displayName: 'Quote Description includes:',
        fieldName: 'quoteDesc',
        type: TEXT,
        placeholder: 'partial description',
      },
      { displayName: 'Include archived quotes:', fieldName: 'archived', type: CHECKBOX },
    ];
    return (
      <div className="fit-block">
        <h1>Find Quotes</h1>
        <div
          className="row vertical-middle"
          data-test="quoteDescription"
          onKeyPress={this.handleKeyPress}
        >
          <Search
            searchFields={searchFields}
            onChange={this.handleInputChange}
            searchCriteria={{ quoteDesc, archived }}
            handleKeyPress={this.handleKeyPress}
          />
        </div>
        <CustomerListAndSelect
          addNewCustomer={this.goToAddCustomer}
          getCustomerList={getCustomerList}
          selectCustomer={this.handleInputChange}
          selectedCustomer={selectedCustomer}
          searchParams={searchParams}
          isLoading={isLoading}
          customers={customers}
          count={count}
          next={next}
          data-test="customer-select"
        />
        <BikeListAndSelect
          brands={brands}
          bikes={bikes}
          frames={frames}
          frameName={frameName}
          brand={brand}
          onChange={this.handleInputChange}
          getFrameList={getFrameList}
          selectedBike={bike}
          data-test="bike-select"
          raiseStateForCriteria={this.raiseStateForCriteria}
        />
        <hr />
        <SearchButton
          onClick={this.getQuoteList}
          disabled={!this.checkCriteriaForQuoteSearch()}
          title="find matching quotes"
          data-test="search"
          className="big"
        />
      </div>
    );
  }
}
QuoteFind.defaultProps = {
  bikes: [],
  frames: [],
  customers: [],
  brands: [],
  isLoading: false,
};
QuoteFind.propTypes = {
  bikes: PropTypes.array,
  brands: PropTypes.array,
  frames: PropTypes.array,
  customers: PropTypes.array,
  searchParams: PropTypes.object,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  next: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getFrameList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  clearCustomerState: PropTypes.func.isRequired,
  getQuoteList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default QuoteFind;
