import React, { useState } from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { findObjectWithId, updateObjectInArray } from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import CustomerListAndSelect from '../customer/CustomerListAndSelect';
import BikeListAndSelect from '../bike/BikeListAndSelect';
import QuoteSummary from '../quoteSummary/QuoteSummary';
import { CUSTOMER_URL } from '../menus/helpers/menu';
import { copyToNewQuote } from './helpers/copyToNewQuote';
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
  let [existingCustomer, setExistingCustomers] = useState(findCustomerForQuote(props));
  let [existingBike, setExistingBike] = useState(findBikeForQuote(props));
  let [selectedCustomer, setSelectedCustomer] = useState(undefined);
  let [selectedBike, setSelectedBike] = useState(undefined);
  let [bikeSearchCriteria, setBikeSearchCriteria] = useState({});

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
    sections,
    parts,
    users,
    changeRoute,
    charges,
  } = props;
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

  const getFrameList = newBikeSearchCriteria => {
    setBikeSearchCriteria(newBikeSearchCriteria);
    props.getFrameList(bikeSearchCriteria);
  };
  const copyQuote = () => {
    const fullCustomers = updateObjectInArray(customers, existingCustomer);
    const fullBikes = existingBike ? updateObjectInArray(bikes, existingBike) : bikes;
    const customerForQuote = fullCustomers.find(c => {
      if (selectedCustomer) return selectedCustomer === c.id;
      return c.id === quote.customer;
    });
    const bikeForQuote = quote.bike
      ? fullBikes.find(b => {
          if (selectedBike) return selectedBike === b.id;
          return b.id === quote.bike;
        })
      : undefined;
    const copiedQuote = copyToNewQuote(
      quote,
      customerForQuote,
      bikeForQuote,
      frames,
      brands,
      charges,
    );

    props.saveQuote(copiedQuote);
  };

  const copyAllowed = selectedCustomer && (!quote.bike || (quote.bike && selectedBike));
  const fullCustomers = updateObjectInArray(customers, existingCustomer);
  const fullBikes = existingBike ? updateObjectInArray(bikes, existingBike) : bikes;
  return (
    <div className="row">
      <div key="copy-quote" className="grid-container">
        <h1 data-test="page-header">Copy Quote</h1>
        <CustomerListAndSelect
          addNewCustomer={goToAddCustomer}
          getCustomerList={getCustomerList}
          selectCustomer={handleInputChange}
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
            getFrameList={getFrameList}
            brands={brands}
            bikes={fullBikes}
            frames={frames}
            bikeSearchCriteria={bikeSearchCriteria}
            canSelectArchived={true}
            selectedBike={selectedBike}
            data-test="select-bike"
            onChange={handleInputChange}
          />
        )}
        <Button disabled={!copyAllowed} onClick={copyQuote} data-test="copy-button">
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
        brands={brands}
        sections={sections}
        parts={parts}
        charges={charges}
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
  suppliers: PropTypes.array,
  quotes: PropTypes.array,
  parts: PropTypes.array,
  sections: PropTypes.array,
  users: PropTypes.array,
  quoteId: PropTypes.number,
};
export default QuoteCopy;
