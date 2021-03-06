import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import QuoteFind from './QuoteFind';
import { doWeHaveObjects, findObjectWithId } from '../../helpers/utils';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import QuoteGrid from './QuoteGrid';
import QuoteSummary from '../quoteSummary/QuoteSummary';
import { quoteFields } from './helpers/quoteFields';

const quoteListFields = quoteFields({
  fieldExclusions: { customer: false, status: false, history: true, bike: true, epic: true },
});

class QuoteList extends React.Component {
  render() {
    const {
      getQuoteToCopy,
      changeQuote,
      quoteId,
      clearQuoteState,
      searchParams,
      count,
      next,
      isLoading,
      getCustomerList,
      getFrameList,
      getQuote,
      getQuoteList,
      bikes,
      brands,
      customers,
      charges,
      changeRoute,
      frames,
      quotes,
      archiveQuote,
      unarchiveQuote,
      parts,
      sections,
      users,
    } = this.props;
    const haveQuotes = doWeHaveObjects(quotes);
    let quote;
    if (quoteId) quote = findObjectWithId(quotes, quoteId);
    return (
      <Fragment>
        {haveQuotes ? (
          <Fragment>
            <div className="row full">
              <div
                style={{
                  width: window.innerWidth - 200 + 'px',
                }}
              >
                <h1>Quotes</h1>
              </div>
              <Button
                key="newSearch"
                onClick={clearQuoteState}
                style={{
                  width: '200px',
                  overflow: 'auto',
                }}
              >
                New Search
              </Button>
            </div>
            <div className="row">
              <QuoteGrid
                displayFields={quoteListFields}
                getQuote={getQuote}
                changeQuote={changeQuote}
                archiveQuote={archiveQuote}
                unarchiveQuote={unarchiveQuote}
                quotes={quotes}
                customers={customers}
                brands={brands}
                bikes={bikes}
                frames={frames}
                cloneQuote={getQuoteToCopy}
                displayedQuote={quoteId}
              />
              {quote && (
                <QuoteSummary
                  showPrices={true}
                  quote={quote}
                  brands={brands}
                  sections={sections}
                  parts={parts}
                  bikes={bikes}
                  customers={customers}
                  frames={frames}
                  users={users}
                  charges={charges}
                />
              )}
            </div>
          </Fragment>
        ) : (
          <QuoteFind
            bikes={bikes}
            brands={brands}
            frames={frames}
            customers={customers}
            searchParams={searchParams}
            count={count}
            next={next}
            isLoading={isLoading}
            getFrameList={getFrameList}
            getCustomerList={getCustomerList}
            changeRoute={changeRoute}
            getQuoteList={getQuoteList}
          />
        )}
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </Fragment>
    );
  }
}

QuoteList.defaultProps = {
  bikes: [],
  suppliers: [],
  frames: [],
  customers: [],
  brands: [],
  quotes: [],
  users: [],
  isLoading: false,
};
QuoteList.propTypes = {
  bikes: PropTypes.array,
  brands: PropTypes.array,
  suppliers: PropTypes.array,
  frames: PropTypes.array,
  charges: PropTypes.array,
  customers: PropTypes.array,
  quotes: PropTypes.array,
  parts: PropTypes.array,
  users: PropTypes.array,
  sections: PropTypes.array,
  searchParams: PropTypes.object,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  next: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getFrameList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  clearQuoteState: PropTypes.func.isRequired,
  getQuoteList: PropTypes.func.isRequired,
  changeQuote: PropTypes.func.isRequired,
  getQuote: PropTypes.func.isRequired,
  archiveQuote: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  getQuoteToCopy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  quoteId: PropTypes.number,
};
export default QuoteList;
