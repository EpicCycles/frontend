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
import { QUOTE_INITIAL } from './helpers/quote';

import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteActionCell from './QuoteActionCell';
import { getQuoteParts } from './helpers/getQuoteParts';
import { checkForChanges, getModelKey } from '../app/model/helpers/model';
import { QUOTE_PART_FOR_BIKE } from './helpers/quotePartFields';
import { quoteIssueChecks } from './helpers/quoteIssueChecks';
import EditModelSimple from '../app/model/EditModelSimple';
import {quoteFields} from "./helpers/quoteFields";

class QuoteDetail extends PureComponent {
  state = { updatedQuoteParts: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedQuote, updatedQuoteParts } = state;
    const { quote, sections, quoteParts, bikeParts, parts, brands } = props;

    const quotePartsDetail = getQuoteParts(quote, sections, quoteParts, bikeParts, parts, brands);
    const checkedUpdatedParts = [];
    updatedQuoteParts.forEach(updatedPart => {
      const persistedDetail = findObjectWithKey(quotePartsDetail, getModelKey(updatedPart));
      if (persistedDetail && checkForChanges(QUOTE_PART_FOR_BIKE, persistedDetail, updatedPart))
        checkedUpdatedParts.push(updatedPart);
    });

    let checkedUpdatedQuote;
    if (updatedQuote && checkForChanges(quoteFields(quote), quote, updatedQuote))
      checkedUpdatedQuote = updatedQuote;

    return {
      updatedQuote: checkedUpdatedQuote,
      updatedQuoteParts: checkedUpdatedParts,
      quotePartsDetail: quotePartsDetail,
    };
  }

  issueQuote = quoteKey => {
    const { quoteParts, quote, addMessage } = this.props;
    const { updatedQuote, updatedQuoteParts } = this.state;
    const quoteCurrently = updatedQuote ? updatedQuote : quote;
    const problems = quoteIssueChecks(updatedQuoteParts, quoteParts, quoteCurrently);
    if (problems) {
      addMessage(problems.join(' '), 'W');
    } else {
      this.props.changeRoute('/quote-issue');
    }
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
    const { quote, saveQuotePartOK } = this.props;
    const newQuotePart = { dummyKey: generateRandomCode(), quote: quote.id, _isBike: !!quote.bike };
    saveQuotePartOK(newQuotePart);
  };
  render() {
    const { updatedQuote, updatedQuoteParts, quotePartsDetail } = this.state;
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
      unarchiveQuote,
    } = this.props;

    const bike = findObjectWithId(bikes, quote.bike);
    const thisBikeParts = findPartsForBike(bike, bikeParts, parts);
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
          <QuoteActionCell
            quote={quote}
            archiveQuote={archiveQuote}
            unarchiveQuote={unarchiveQuote}
            cloneQuote={cloneQuote}
            issueQuote={this.issueQuote}
          />
          {quote.quote_status === QUOTE_INITIAL ? (
            <EditModelSimple
              pageMode
              actionsRequired
              model={updatedQuote ? updatedQuote : quote}
              persistedModel={quote}
              modelFields={quoteFields(quote)}
              brands={brands}
              bikes={bikes}
              frames={frames}
              users={users}
              customers={customers}
              modelSave={saveQuote}
              modelDelete={archiveQuote}
              additionalActions={additionalActions}
              key={`editQuote${quote.id}`}
              showReadOnlyFields
              raiseState={this.raiseStateForQuote}
            />
          ) : (
            <ViewModelBlock
              modelFields={quoteFields(quote)}
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
              quoteParts={quotePartList}
              brands={brands}
              sections={sections}
              parts={parts}
              bikeParts={thisBikeParts}
            />
          </div>
        </div>
        {quote.quote_status === QUOTE_INITIAL && (
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
          />
        )}
      </div>
    );
  }
}

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
  saveQuotePartOK: PropTypes.func.isRequired,
  cloneQuote: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default QuoteDetail;
