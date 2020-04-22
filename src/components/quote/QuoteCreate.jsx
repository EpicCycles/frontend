import React, { useState } from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { findObjectWithId, updateObject } from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import CustomerListAndSelect from '../customer/CustomerListAndSelect';
import BikeListAndSelect from '../bike/BikeListAndSelect';
import { quoteDescription } from './helpers/quote';
import { quotePrice } from './helpers/quotePrice';
import { CUSTOMER_URL } from '../../helpers/routes';

const QuoteCreate = props => {
  let [bikeSearchCriteria, setBikeSearchCriteria] = useState({});
  let [quoteDate, setQuoteData] = useState({ selectedCustomer: props.customerId });
  let [redirect, setRedirect] = useState(undefined);

  const goToAddCustomer = () => {
    props.clearCustomerState();
    setRedirect(CUSTOMER_URL);
  };

  const handleInputChange = (fieldName, input) => {
    let newData = updateObject(quoteDate);
    newData[fieldName] = input;
    setQuoteData(newData);
  };
  const getFrameList = searchCriteria => {
    setBikeSearchCriteria(searchCriteria);
    props.getFrameList(searchCriteria);
  };
  const buildQuote = () => {
    const customer = quoteDate.selectedCustomer;
    const bike = quoteDate.selectedBike;
    let quote = quoteStart(customer, bike);
    props.createQuote(quote);
  };

  const quoteStart = (customer, bike) => {
    const quote_desc = quoteDescription(
      customer,
      bike,
      props.customers,
      props.frames,
      props.bikes,
      props.brands,
    );
    let quote = { customer, bike, quote_desc };

    const customerObject = findObjectWithId(props.customers, customer);
    if (customerObject) quote.club_member = customerObject.club_member;

    if (bike) {
      const bikeObject = findObjectWithId(props.bikes, bike);
      quote = quotePrice(quote, bikeObject, []);
    }
    return quote;
  };

  const { selectedBike, selectedCustomer } = quoteDate;
  const {
    getCustomerList,
    searchParams,
    isLoading,
    customers,
    count,
    next,
    brands,
    bikes,
    frames,
  } = props;
  if (redirect) return <Redirect to={redirect} push />;

  return (
    <div key="create-quote" className="grid-container">
      <h1 data-test="page-header">Create Quote</h1>
      <CustomerListAndSelect
        addNewCustomer={goToAddCustomer}
        getCustomerList={getCustomerList}
        selectCustomer={handleInputChange}
        searchParams={searchParams}
        isLoading={isLoading}
        customers={customers}
        count={count}
        next={next}
        selectedCustomer={selectedCustomer}
        data-test="select-customer"
      />
      <BikeListAndSelect
        getFrameList={getFrameList}
        brands={brands}
        bikes={bikes}
        frames={frames}
        bikeSearchCriteria={bikeSearchCriteria}
        selectedBike={selectedBike}
        data-test="select-bike"
        onChange={handleInputChange}
      />
      <Button disabled={!selectedCustomer} onClick={buildQuote} data-test="create-button">
        Create Quote
      </Button>
      {isLoading && (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )}
    </div>
  );
};

QuoteCreate.propTypes = {
  getCustomerList: PropTypes.func.isRequired,
  createQuote: PropTypes.func.isRequired,
  getFrameList: PropTypes.func.isRequired,
  searchParams: PropTypes.object,
  isLoading: PropTypes.bool,
  customers: PropTypes.array,
  bikes: PropTypes.array,
  brands: PropTypes.array,
  frames: PropTypes.array,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  next: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bikeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default QuoteCreate;
