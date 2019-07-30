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
import { quoteFields, quoteFieldsNoBike } from './helpers/display';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteActionCell from './QuoteActionCell';
import EditModel from '../app/model/EditModel';
import { getQuoteParts } from './helpers/getQuoteParts';
import { checkForChanges, getModelKey } from '../app/model/helpers/model';
import { QUOTE_PART_FOR_BIKE } from './helpers/quotePartFields';
import { quoteIssueChecks } from './helpers/quoteIssueChecks';

class QuoteDetail extends PureComponent {
  state = { updatedQuoteParts: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedQuoteParts } = state;
    const { quote, sections, quoteParts, bikeParts, parts, brands } = props;

    const quotePartsDetail = getQuoteParts(quote, sections, quoteParts, bikeParts, parts, brands);
    const checkedUpdatedParts = [];
    updatedQuoteParts.forEach(updatedPart => {
      const persistedDetail = findObjectWithKey(quotePartsDetail, getModelKey(updatedPart));
      if (persistedDetail && checkForChanges(QUOTE_PART_FOR_BIKE, persistedDetail, updatedPart))
        checkedUpdatedParts.push(updatedPart);
    });

    return {
      updatedQuoteParts: checkedUpdatedParts,
      quotePartsDetail: quotePartsDetail,
    };
  }

  issueQuote = quoteKey => {
    const { quoteParts, quote, addMessage, issueQuote } = this.props;
    const { updatedQuoteParts } = this.state;
    const problems = quoteIssueChecks(updatedQuoteParts, quoteParts, quote);
    if (problems) {
      addMessage(problems.join(' '), 'W');
    } else {
      issueQuote(quoteKey);
    }
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
    const { updatedQuoteParts, quotePartsDetail } = this.state;
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
              additionalActions={additionalActions}
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
  issueQuote: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default QuoteDetail;
