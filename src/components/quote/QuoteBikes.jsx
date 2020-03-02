import React from 'react';
import * as PropTypes from 'prop-types';
import QuoteBikeParts from './QuoteBikeParts';
import ModelFieldRow from '../app/model/ModelFieldRow';
import QuoteBikeActions from './QuoteBikeActions';
import { quoteFields } from './helpers/quoteFields';

const QuoteBikes = props => {
  const {
    quotes,
    bikes,
    frames,
    parts,
    customers,
    fittings,
    brands,
    suppliers,
    sections,
    users,
    getQuote,
    archiveQuote,
    unarchiveQuote,
    issueQuote,
    cloneQuote,
  } = props;
 const bikeQuotes = quotes.filter(quote => !!quote.bike);
  const quoteFieldShown = quoteFields({ fieldExclusions: { customer: true, history: true } });
  return (
    <div className="grid-container">
      <div className="grid">
        {quoteFieldShown.map((quoteField, index) => {
          return (
            <ModelFieldRow
              field={quoteField}
              modelArray={bikeQuotes}
              sourceDataArrays={{ bikes, customers, brands, suppliers, frames, users, fittings }}
              firstRow={index === 0}
              key={`quoteFieldRow_${quoteField.fieldName}`}
            />
          );
        })}
        <QuoteBikeActions
          quotes={bikeQuotes}
          getQuote={getQuote}
          archiveQuote={archiveQuote}
          unarchiveQuote={unarchiveQuote}
          cloneQuote={cloneQuote}
          issueQuote={issueQuote}
        />
        <QuoteBikeParts
          quotes={bikeQuotes}
          sections={sections}
          quoteParts={quoteParts}
          bikes={bikes}
          parts={parts}
          brands={brands}
        />
      </div>
    </div>
  );
};
QuoteBikes.propTypes = {
  quotes: PropTypes.array.isRequired,
  quoteParts: PropTypes.array.isRequired,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  parts: PropTypes.array,
  customers: PropTypes.array.isRequired,
  fittings: PropTypes.array,
  brands: PropTypes.array,
  suppliers: PropTypes.array,
  sections: PropTypes.array,
  users: PropTypes.array.isRequired,
  getQuote: PropTypes.func.isRequired,
  archiveQuote: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  cloneQuote: PropTypes.func.isRequired,
  issueQuote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default QuoteBikes;
