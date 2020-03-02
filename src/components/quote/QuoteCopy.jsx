import React from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import {
  findObjectWithId,
  removeKey,
  updateObject,
  updateObjectInArray,
} from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import CustomerListAndSelect from '../customer/CustomerListAndSelect';
import BikeListAndSelect from '../bike/BikeListAndSelect';
import { quoteDescription } from './helpers/quote';
import QuoteSummary from '../quoteSummary/QuoteSummary';
import { CUSTOMER_URL } from '../menus/helpers/menu';
import {copyToNewQuote} from "./helpers/copyToNewQuote";
const findCustomerForQuote = props => {
  const { quoteId, quotes, customers } = props;
  const quote = findObjectWithId(quotes, quoteId);
  if (quote) return findObjectWithId(customers, quote.customer);
};
const findBikeForQuote = props => {
  const { quoteId, quotes, bikes } = props;
  const quote = findObjectWithId(quotes, quoteId);
  if (quote && quote.bike) return findObjectWithId(bikes, quote.bike);
};

const QuoteCopy = props => {
  let [existingCustomer, setExistingCustomers] = setState(findCustomerForQuote(props));
  let [existingBike, setExistingBike] = setState(findBikeForQuote(props));
  let [selectedCustomer, setSelectedCustomer] = setState(undefined);
  let [selectedBike, setSelectedBike] = setState(undefined);
  let [bikeSearchCriteria, setBikeSearchCriteria] = setState({});

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
    quotes,
    quoteId,
    quoteParts,
    bikeParts,
    sections,
    parts,
    users,
    changeRoute,
    charges,
  } = this.props;
  let quote;
  if (quoteId) quote = findObjectWithId(quotes, quoteId);

  if (!quote) return <Redirect to="/quote-list" push />;
  const goToAddCustomer = () => {
    changeRoute(CUSTOMER_URL, true);
  };

  const handleInputChange = (fieldName, input) => {
    if (fieldName === 'selectedCustomer') setSelectedCustomer(input);
    if (fieldName === 'selectedBike') setSelectedBike(input);
  };
  const handleInputClear = fieldName => {
    handleInputChange(fieldName, undefined);
  };

  const getFrameList = newBikeSearchCriteria => {
    setBikeSearchCriteria(newBikeSearchCriteria);
    props.getFrameList(bikeSearchCriteria);
  };
  const copyQuote = () => {
    const { selectedCustomer = quote.customer, selectedBike = quote.bike, existingCustomer, existingBike } = this.state;
    const fullCustomers = updateObjectInArray(customers, existingCustomer);
    const fullBikes = existingBike
      ? updateObjectInArray(bikes, existingBike)
      : bikes;

    const copiedQuote = copyToNewQuote(quote, selectedCustomer,
      selectedBike,
      fullCustomers,
      frames,
      fullBikes,
      brands,charges);
    const quote_desc = quoteDescription(
      selectedCustomer,
      selectedBike,
      fullCustomers,
      frames,
      fullBikes,
      brands,
    );

    const basicUpdatedQuote = updateObject(quote, {quote_desc})
    this.props.copyQuote(this.props.quoteId, {
      customer: selectedCustomer,
      bike: selectedBike,
      quote_desc,
    });
  };

  const copyAllowed = selectedCustomer && (!quote.bike || (quote.bike && selectedBike));
  const fullCustomers = updateObjectInArray(customers, existingCustomer);
  const fullBikes = existingBike ? updateObjectInArray(bikes, existingBike) : bikes;
  return (
    <div className="row">
      <div key="copy-quote" className="grid-container">
        <h1 data-test="page-header">Copy Quote</h1>
        <CustomerListAndSelect
          addNewCustomer={this.goToAddCustomer}
          getCustomerList={getCustomerList}
          selectCustomer={this.handleInputChange}
          searchParams={searchParams}
          isLoading={isLoading}
          customers={fullCustomers}
          count={count}
          next={next}
          selectedCustomer={selectedCustomer}
          data-test="select-customer"
        />
        {quote.bike && (
          <BikeListAndSelect
            getFrameList={this.getFrameList}
            brands={brands}
            bikes={fullBikes}
            frames={frames}
            bikeSearchCriteria={bikeSearchCriteria}
            canSelectArchived={true}
            selectedBike={selectedBike}
            data-test="select-bike"
            onChange={this.handleInputChange}
          />
        )}
        <Button disabled={!copyAllowed} onClick={this.copyQuote} data-test="copy-button">
          Copy Quote
        </Button>
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </div>
      <QuoteSummary
        showPrices={true}
        quote={quote}
        quoteParts={quoteParts}
        brands={brands}
        sections={sections}
        parts={parts}
        bikeParts={bikeParts}
        bikes={existingBike ? [existingBike] : []}
        customers={[existingCustomer]}
        frames={frames}
        users={users}
      />
    </div>
  );
};

QuoteCopy.defaultProps = {
  bikes: [],
  suppliers: [],
  frames: [],
  customers: [],
  brands: [],
  quotes: [],
  charges: [],
  isLoading: false,
};
QuoteCopy.propTypes = {
  changeRoute: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  copyQuote: PropTypes.func.isRequired,
  getFrameList: PropTypes.func.isRequired,
  searchParams: PropTypes.object,
  isLoading: PropTypes.bool,
  customers: PropTypes.array,
  bikes: PropTypes.array,
  brands: PropTypes.array,
  charges: PropTypes.array,
  frames: PropTypes.array,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  next: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bikeParts: PropTypes.array,
  suppliers: PropTypes.array,
  quotes: PropTypes.array,
  quoteParts: PropTypes.array,
  parts: PropTypes.array,
  sections: PropTypes.array,
  users: PropTypes.array,
  quoteId: PropTypes.number,
};
export default QuoteCopy;
