import React from 'react';
import * as PropTypes from 'prop-types';

import { QUOTE_ARCHIVED } from './helpers/quote';
import ModelTableHeaderRow from '../app/model/ModelTableHeaderRow';
import ViewModel from '../app/model/ViewModel';
import { quoteFieldsBikeComplete } from './helpers/quoteFields';
import { quoteActions } from './helpers/quoteActions';

const QuoteGrid = props => {
  const {
    quotes,
    getQuote,
    changeQuote,
    archiveQuote,
    unarchiveQuote,
    cloneQuote,
    issueQuote,
    customers,
    bikes,
    frames,
    brands,
    displayFields,
    users,
    displayedQuote,
  } = props;
  const unArchivedQuotes = quotes.filter(quote => quote.quote_status !== QUOTE_ARCHIVED);
  const archivedQuotes = quotes.filter(quote => quote.quote_status === QUOTE_ARCHIVED);
  const availableActions = {
    archiveQuote,
    changeQuote,
    getQuote,
    cloneQuote,
    issueQuote,
    unarchiveQuote,
  };
  return (
    <div
      key="quotesGrid"
      className="grid"
      style={{
        maxHeight: window.innerHeight - 120 + 'px',
        maxWidth: window.innerWidth - 120 + 'px',
        overflow: 'auto',
      }}
    >
      <ModelTableHeaderRow
        modelFields={displayFields}
        key="bikeReviewHeaders"
        lockFirstColumn
        includeActions
      />
      {unArchivedQuotes.map(quote => (
        <ViewModel
          model={quote}
          modelFields={displayFields}
          customers={customers}
          brands={brands}
          bikes={bikes}
          frames={frames}
          users={users}
          className={displayedQuote === quote.id ? 'selected' : ''}
          actionsRequired
          showReadOnlyFields
          modelActions={quoteActions(quote, availableActions)}
          key={`qgr_${quote.id}`}
          data-test="quote-row"
        />
      ))}
      {archivedQuotes.map(quote => (
        <ViewModel
          model={quote}
          modelFields={displayFields}
          customers={customers}
          brands={brands}
          bikes={bikes}
          frames={frames}
          users={users}
          actionsRequired
          modelActions={quoteActions(quote, availableActions)}
          className={displayedQuote === quote.id ? 'selected' : ''}
          key={`qgr_${quote.id}`}
          data-test="archived-quote-row"
        />
      ))}
    </div>
  );
};

QuoteGrid.defaultProps = {
  displayFields: quoteFieldsBikeComplete,
  quotes: [],
};

QuoteGrid.propTypes = {
  displayFields: PropTypes.array.isRequired,
  quotes: PropTypes.array,
  brands: PropTypes.array,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  customers: PropTypes.array,
  users: PropTypes.array,
  getQuote: PropTypes.func,
  changeQuote: PropTypes.func,
  archiveQuote: PropTypes.func,
  unarchiveQuote: PropTypes.func,
  issueQuote: PropTypes.func,
  cloneQuote: PropTypes.func,
  displayedQuote: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default QuoteGrid;
