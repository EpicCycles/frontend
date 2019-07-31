import React, { PureComponent } from 'react';
import {
  findObjectWithId,
  findObjectWithKey,
  generateRandomCode,
  updateObjectInArray,
} from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import { findPartsForBike } from '../bike/helpers/bike';
import QuoteSummaryParts from './QuoteSummaryParts';
import QuotePartGrid from './QuotePartGrid';
import { quoteFieldsBikeComplete, quoteFieldsComplete } from './helpers/display';
import QuoteActionCell from './QuoteActionCell';
import { getQuoteParts } from './helpers/getQuoteParts';
import { checkForChanges, getModelKey } from '../app/model/helpers/model';
import { QUOTE_PART_FOR_BIKE } from './helpers/quotePartFields';
import { quoteIssueChecks } from './helpers/quoteIssueChecks';
import EditModelSimple from '../app/model/EditModelSimple';
import { Redirect } from 'react-router';
import { QUOTE_INITIAL } from './helpers/quote';

class QuoteIssue extends PureComponent {
  state = { updatedQuoteParts: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedQuote, updatedQuoteParts } = state;
    const { quoteId, quotes, sections, quoteParts, bikeParts, parts, brands } = props;
    if (quoteId) {
      const quote = findObjectWithId(quotes, quoteId);

      const quotePartsDetail = getQuoteParts(quote, sections, quoteParts, bikeParts, parts, brands);
      const checkedUpdatedParts = [];
      updatedQuoteParts.forEach(updatedPart => {
        const persistedDetail = findObjectWithKey(quotePartsDetail, getModelKey(updatedPart));
        if (persistedDetail && checkForChanges(QUOTE_PART_FOR_BIKE, persistedDetail, updatedPart))
          checkedUpdatedParts.push(updatedPart);
      });

      let checkedUpdatedQuote;
      if (updatedQuote && checkForChanges(quoteFieldsBikeComplete, quote, updatedQuote))
        checkedUpdatedQuote = updatedQuote;

      return {
        updatedQuote: checkedUpdatedQuote,
        updatedQuoteParts: checkedUpdatedParts,
        quotePartsDetail: quotePartsDetail,
      };
    }
  }

  issueQuote = quoteKey => {
    const { quotes, quoteParts, quoteId, addMessage, issueQuote } = this.props;
    const quote = findObjectWithId(quotes, quoteId);
    const { updatedQuote, updatedQuoteParts } = this.state;
    const quoteCurrently = updatedQuote ? updatedQuote : quote;
    const problems = quoteIssueChecks(updatedQuoteParts, quoteParts, quoteCurrently, true);
    if (problems) {
      addMessage(problems.join(' '), 'E');
    } else {
      issueQuote(quoteKey);
    }
  };
  cancelIssue = () => {
    this.props.changeRoute('/quote');
  };

  raiseStateForQuote = updatedQuote => {
    this.setState({ updatedQuote: updatedQuote });
  };
  raiseStateForQuotePart = updatedQuotePart => {
    const { updatedQuoteParts } = this.state;

    const newUpdatedQuoteParts = updateObjectInArray(updatedQuoteParts, updatedQuotePart);
    this.setState({ updatedQuoteParts: newUpdatedQuoteParts });
  };
  addNewQuotePart = () => {
    const { quoteId, quotes, saveQuotePartOK } = this.props;
    const quote = findObjectWithId(quotes, quoteId);
    const newQuotePart = { dummyKey: generateRandomCode(), quote: quoteId, _isBike: !!quote.bike };
    saveQuotePartOK(newQuotePart);
  };
  render() {
    const { updatedQuote, updatedQuoteParts, quotePartsDetail } = this.state;
    const {
      quoteId,
      quotes,
      quoteParts,
      parts,
      supplierProducts,
      users,
      brands,
      suppliers,
      sections,
      saveQuote,
      bikes,
      bikeParts,
      frames,
      customers,
      deleteQuotePart,
      saveQuotePart,
    } = this.props;
    if (!quoteId) return <Redirect to="/quote" push />;

    let quote;
    if (quoteId) quote = findObjectWithId(quotes, quoteId);
    if (quote.quote_status !== QUOTE_INITIAL) return <Redirect to="/quote" push />;

    const bike = findObjectWithId(bikes, quote.bike);
    const thisBikeParts = bike ? findPartsForBike(bike, bikeParts, parts) : [];
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'Add Quote Part',
        iconAction: () => this.addNewQuotePart(),
      },
    ];
    const quotePartList = quoteParts.filter(qp => qp.quote === quote.id);

    return (
      <div className="row">
        <div>
          <QuoteActionCell quote={quote} getQuote={this.cancelIssue} issueQuote={this.issueQuote} />
          <EditModelSimple
            pageMode
            actionsRequired
            model={updatedQuote ? updatedQuote : quote}
            persistedModel={quote}
            modelFields={quote.bike ? quoteFieldsBikeComplete : quoteFieldsComplete}
            brands={brands}
            bikes={bikes}
            frames={frames}
            users={users}
            customers={customers}
            modelSave={saveQuote}
            additionalActions={additionalActions}
            key={`editQuote${quote.id}`}
            showReadOnlyFields
            raiseState={this.raiseStateForQuote}
          />
          <div className="grid-container">
            <QuoteSummaryParts
              lockFirstColumn={true}
              showPrices={false}
              quoteParts={quotePartList}
              brands={brands}
              sections={sections}
              parts={parts}
              bikeParts={thisBikeParts}
            />
          </div>
        </div>
        <QuotePartGrid
          isBike={!!quote.bike}
          quoteParts={quotePartsDetail}
          updatedQuoteParts={updatedQuoteParts}
          brands={brands}
          suppliers={suppliers}
          sections={sections}
          parts={parts}
          supplierProducts={supplierProducts}
          deleteQuotePart={deleteQuotePart}
          saveQuotePart={saveQuotePart}
          addQuotePart={this.addNewQuotePart}
          raiseStateForQuotePart={this.raiseStateForQuotePart}
          pricesRequired
        />
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
  deleteQuotePart: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  saveQuotePartOK: PropTypes.func.isRequired,
  issueQuote: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default QuoteIssue;
