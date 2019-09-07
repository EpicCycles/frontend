import React, { PureComponent } from 'react';
import { findObjectWithId } from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { QUOTE_INITIAL } from './helpers/quote';
import QuoteDetail from './QuoteDetail';
import { Dimmer, Loader } from 'semantic-ui-react';

class QuoteIssue extends PureComponent {
  render() {
    const {
      quotes,
      quoteId,
      quoteParts,
      quoteCharges,
      bikes,
      bikeParts,
      brands,
      charges,
      suppliers,
      users,
      customers,
      sections,
      parts,
      supplierProducts,
      frames,
      saveQuote,
      saveQuoteCharge,
      saveQuoteChargeOK,
      deleteQuoteCharge,
      deleteQuotePart,
      saveQuotePart,
      saveQuotePartOK,
      changeRoute,
      addMessage,
      createNote,
      issueQuote,
      isLoading,
    } = this.props;
    if (!quoteId) return <Redirect to="/quote" push />;

    let quote;
    if (quoteId) quote = findObjectWithId(quotes, quoteId);
    if (!quote) return <Redirect to="/quote" push />;
    if (quote.quote_status !== QUOTE_INITIAL) return <Redirect to="/quote" push />;

    return (
      <div>
        <h2>Issue Quote </h2>
        <QuoteDetail
          quote={quote}
          quoteParts={quoteParts}
          quoteCharges={quoteCharges}
          bikeParts={bikeParts}
          parts={parts}
          supplierProducts={supplierProducts}
          frames={frames}
          bikes={bikes}
          customers={customers}
          brands={brands}
          charges={charges}
          suppliers={suppliers}
          sections={sections}
          saveQuote={saveQuote}
          saveQuotePart={saveQuotePart}
          saveQuotePartOK={saveQuotePartOK}
          deleteQuotePart={deleteQuotePart}
          saveQuoteCharge={saveQuoteCharge}
          saveQuoteChargeOK={saveQuoteChargeOK}
          deleteQuoteCharge={deleteQuoteCharge}
          changeRoute={changeRoute}
          users={users}
          createNote={createNote}
          addMessage={addMessage}
          data-test="quote-detail"
          readyToIssue
          issueQuote={issueQuote}
        />
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </div>
    );
  }
}

QuoteIssue.defaultProps = {
  parts: [],
  brands: [],
  suppliers: [],
  users: [],
  sections: [],
  isLoading: false,
};

QuoteIssue.propTypes = {
  quoteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quotes: PropTypes.array.isRequired,
  quoteParts: PropTypes.array.isRequired,
  quoteCharges: PropTypes.array.isRequired,
  bikes: PropTypes.array.isRequired,
  bikeParts: PropTypes.array.isRequired,
  brands: PropTypes.array,
  charges: PropTypes.array,
  suppliers: PropTypes.array,
  users: PropTypes.array,
  customers: PropTypes.array,
  sections: PropTypes.array,
  parts: PropTypes.array.isRequired,
  supplierProducts: PropTypes.array.isRequired,
  frames: PropTypes.array.isRequired,
  saveQuote: PropTypes.func.isRequired,
  saveQuoteCharge: PropTypes.func.isRequired,
  saveQuoteChargeOK: PropTypes.func.isRequired,
  deleteQuoteCharge: PropTypes.func.isRequired,
  deleteQuotePart: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  saveQuotePartOK: PropTypes.func.isRequired,
  cloneQuote: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  issueQuote: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default QuoteIssue;
