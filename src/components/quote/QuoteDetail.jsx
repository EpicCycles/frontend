import React from 'react';
import { findObjectWithId } from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import { findPartsForBike } from '../bike/helpers/bike';
import QuoteSummaryParts from './QuoteSummaryParts';
import QuotePartGrid from './QuotePartGrid';
import { QUOTE_INITIAL } from './helpers/quote';
import { quoteFields, quoteFieldsNoBike } from './helpers/display';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteActionCell from './QuoteActionCell';
import EditModel from '../app/model/EditModel';

const QuoteDetail = props => {
  const {
    quoteParts,
    parts,
    supplierProducts,
    users,
    brands,
    suppliers,
    sections,
    saveQuote,
    archiveQuote,
    quote,
    bikes,
    bikeParts,
    frames,
    customers,
    deleteQuotePart,
    saveQuotePart,
    cloneQuote,
    issueQuote,
    unarchiveQuote,
  } = props;

  const thisQuoteParts = quoteParts.filter(quotePart => quotePart.quote === quote.id);
  const bike = findObjectWithId(bikes, quote.bike);
  const thisBikeParts = findPartsForBike(bike, bikeParts, parts);

  return (
    <div className="row">
      <div>
        <QuoteActionCell
          quote={quote}
          archiveQuote={archiveQuote}
          unarchiveQuote={unarchiveQuote}
          cloneQuote={cloneQuote}
          issueQuote={issueQuote}
        />
        {quote.quote_status === QUOTE_INITIAL ? (
          <EditModel
            pageMode
            actionsRequired
            model={quote}
            modelFields={quote.bike ? quoteFields : quoteFieldsNoBike}
            brands={brands}
            bikes={bikes}
            frames={frames}
            users={users}
            customers={customers}
            modelSave={saveQuote}
            modelDelete={archiveQuote}
            key={`editQuote${quote.id}`}
          />
        ) : (
          <ViewModelBlock
            modelFields={quote.bike ? quoteFields : quoteFieldsNoBike}
            model={quote}
            bikes={bikes}
            customers={customers}
            frames={frames}
            users={users}
          />
        )}
        <div className="grid-container">
          <QuoteSummaryParts
            lockFirstColumn={true}
            showPrices={false}
            quoteParts={thisQuoteParts}
            brands={brands}
            sections={sections}
            parts={parts}
            bikeParts={thisBikeParts}
          />
        </div>
      </div>
      {quote.quote_status === QUOTE_INITIAL && (
        <div>
          <QuotePartGrid
            quoteParts={thisQuoteParts}
            brands={brands}
            suppliers={suppliers}
            sections={sections}
            parts={parts}
            supplierProducts={supplierProducts}
            bikeParts={thisBikeParts}
            deleteQuotePart={deleteQuotePart}
            saveQuotePart={saveQuotePart}
            quote={quote}
          />
        </div>
      )}
    </div>
  );
};

QuoteDetail.defaultProps = {
  parts: [],
  brands: [],
  suppliers: [],
  users: [],
  sections: [],
  isLoading: false,
};

QuoteDetail.propTypes = {
  quote: PropTypes.object.isRequired,
  quoteParts: PropTypes.array.isRequired,
  bikes: PropTypes.array.isRequired,
  bikeParts: PropTypes.array.isRequired,
  brands: PropTypes.array,
  suppliers: PropTypes.array,
  users: PropTypes.array,
  customers: PropTypes.array,
  sections: PropTypes.array,
  parts: PropTypes.array.isRequired,
  supplierProducts: PropTypes.array.isRequired,
  frames: PropTypes.array.isRequired,
  saveQuote: PropTypes.func.isRequired,
  archiveQuote: PropTypes.func.isRequired,
  deleteQuotePart: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  cloneQuote: PropTypes.func.isRequired,
  issueQuote: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default QuoteDetail;
