import React, { Fragment, PureComponent } from 'react';
import {
  findObjectWithId,
  findObjectWithKey,
  generateRandomCode,
  updateObject,
  updateObjectInArray,
} from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import QuoteSummaryParts from '../quoteSummary/QuoteSummaryParts';
import QuotePartGrid from '../quotePart/QuotePartGrid';
import { QUOTE_INITIAL } from './helpers/quote';

import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteActionCell from './QuoteActionCell';
import { getQuoteParts } from '../quotePart/helpers/getQuoteParts';
import { checkForChanges, getModelKey } from '../app/model/helpers/model';
import { QUOTE_PART_FOR_BIKE } from '../quotePart/helpers/quotePartFields';
import { quoteIssueChecks } from './helpers/quoteIssueChecks';
import EditModelSimple from '../app/model/EditModelSimple';
import { quoteFields } from './helpers/quoteFields';
import { customerNoteFields } from '../note/helpers/noteFields';
import { quoteChargeFields } from '../quoteCharge/helpers/quoteChargeFields';
import ModelTable from '../app/model/ModelTable';

class QuoteDetail extends PureComponent {
  state = { updatedQuoteCharges: [], updatedQuoteParts: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedQuote, updatedQuoteParts, updatedQuoteCharges } = state;
    const { quote, sections, quoteCharges, quoteParts, bikeParts, parts, brands } = props;

    const quotePartsDetail = getQuoteParts(quote, sections, quoteParts, bikeParts, parts, brands);
    const checkedUpdatedParts = [];
    updatedQuoteParts.forEach(updatedPart => {
      const persistedDetail = findObjectWithKey(quotePartsDetail, getModelKey(updatedPart));
      if (persistedDetail && checkForChanges(QUOTE_PART_FOR_BIKE, persistedDetail, updatedPart))
        checkedUpdatedParts.push(updatedPart);
    });
    const checkedUpdatedCharges = [];
    updatedQuoteCharges.forEach(updatedCharge => {
      const persistedDetail = findObjectWithKey(quoteCharges, getModelKey(updatedCharge));
      if (persistedDetail && checkForChanges(quoteChargeFields, persistedDetail, updatedCharge))
        checkedUpdatedCharges.push(updatedCharge);
    });

    let checkedUpdatedQuote;
    if (updatedQuote && checkForChanges(quoteFields(quote), quote, updatedQuote))
      checkedUpdatedQuote = updatedQuote;

    return {
      updatedQuote: checkedUpdatedQuote,
      updatedQuoteCharges: checkedUpdatedCharges,
      updatedQuoteParts: checkedUpdatedParts,
      quotePartsDetail: quotePartsDetail,
    };
  }

  issueQuote = quoteKey => {
    const { quoteParts, quoteCharges, quote, addMessage, readyToIssue, issueQuote } = this.props;
    const { updatedQuote, updatedQuoteCharges, updatedQuoteParts } = this.state;
    const quoteCurrently = updatedQuote ? updatedQuote : quote;
    const problems = quoteIssueChecks(
      updatedQuoteParts,
      quoteParts,
      quoteCurrently,
      readyToIssue,
      updatedQuoteCharges,
      quoteCharges,
    );
    if (problems) {
      addMessage(problems.join(' '), 'W');
    } else if (!readyToIssue) {
      this.props.changeRoute('/quote-issue');
    } else {
      issueQuote(quoteKey);
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
  raiseStateForQuoteCharge = updatedQuoteCharge => {
    const { updatedQuoteCharges } = this.state;

    const newUpdatedQuoteCharges = updateObjectInArray(updatedQuoteCharges, updatedQuoteCharge);
    this.setState({ updatedQuoteCharges: newUpdatedQuoteCharges });
  };
  raiseStateForNote = updatedNote => {
    if (updatedNote.dummyKey) {
      this.setState({ updatedNote: updatedNote });
    } else {
      this.setState({ updatedNote: updateObject(updatedNote, { dummyKey: generateRandomCode() }) });
    }
  };
  addNewQuotePart = () => {
    const { quote, saveQuotePartOK } = this.props;
    const newQuotePart = { dummyKey: generateRandomCode(), quote: quote.id, _isBike: !!quote.bike };
    saveQuotePartOK(newQuotePart);
  };
  addNewQuoteCharge = () => {
    const { quote, saveQuoteChargeOK } = this.props;
    const newQuoteCharge = { dummyKey: generateRandomCode(), quote: quote.id };
    saveQuoteChargeOK(newQuoteCharge);
  };
  saveNote = note => {
    this.props.createNote(note);
    this.setState({ updatedNote: undefined });
  };
  render() {
    const {
      updatedQuote,
      updatedQuoteParts,
      updatedQuoteCharges,
      quotePartsDetail,
      updatedNote,
    } = this.state;
    const {
      quoteCharges,
      quoteParts,
      parts,
      supplierProducts,
      users,
      brands,
      charges,
      suppliers,
      sections,
      saveQuote,
      archiveQuote,
      quote,
      bikes,
      bikeParts,
      frames,
      customers,
      deleteQuoteCharge,
      saveQuoteCharge,
      deleteQuotePart,
      saveQuotePart,
      cloneQuote,
      unarchiveQuote,
      readyToIssue,
    } = this.props;
    const newNote = { quote: quote.id, customer: quote.customer };

    const bike = findObjectWithId(bikes, quote.bike);
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'Add Quote Part',
        iconAction: () => this.addNewQuotePart(),
      },
      {
        iconName: 'pound sign',
        iconTitle: 'Add Quote Charge',
        iconAction: () => this.addNewQuoteCharge(),
      },
    ];
    const quotePartList = quoteParts.filter(qp => qp.quote === quote.id);
    const quoteChargeList = quoteCharges.filter(qp => qp.quote === quote.id);

    return (
      <Fragment>
        <div className="row">
          <div>
            {!readyToIssue && (
              <QuoteActionCell
                quote={quote}
                archiveQuote={archiveQuote}
                unarchiveQuote={unarchiveQuote}
                cloneQuote={cloneQuote}
                issueQuote={this.issueQuote}
              />
            )}
            {quote.quote_status === QUOTE_INITIAL ? (
              <EditModelSimple
                pageMode
                actionsRequired
                model={updatedQuote ? updatedQuote : quote}
                persistedModel={quote}
                modelFields={quoteFields({ quote, bike, pricesRequired: readyToIssue })}
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
          </div>
          <QuoteSummaryParts
            lockFirstColumn={true}
            showPrices={false}
            quoteParts={quotePartList}
            quote={quote}
            brands={brands}
            sections={sections}
            parts={parts}
            bikeParts={bikeParts}
          />
          <div>
            <EditModelSimple
              model={updatedNote ? updatedNote : newNote}
              persistedModel={newNote}
              modelFields={customerNoteFields}
              pageMode
              actionsRequired
              modelSave={this.saveNote}
              raiseState={this.raiseStateForNote}
              key={`editNote`}
              data-test="add-customer-note"
            />
            <ModelTable
              modelArray={quoteChargeList}
              updatedModelArray={updatedQuoteCharges}
              modelFields={quoteChargeFields}
              raiseState={this.raiseStateForQuoteCharge}
              modelDelete={deleteQuoteCharge}
              modelSave={saveQuoteCharge}
              blockIdentity={'quoteCharge'}
              charges={charges}
              actionsRequired
            />
          </div>
        </div>
        {quote.quote_status === QUOTE_INITIAL && (
          <div className="grid-container">
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
              pricesRequired={readyToIssue}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

QuoteDetail.defaultProps = {
  parts: [],
  brands: [],
  suppliers: [],
  users: [],
  sections: [],
};

QuoteDetail.propTypes = {
  quote: PropTypes.object.isRequired,
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
  archiveQuote: PropTypes.func,
  saveQuoteCharge: PropTypes.func.isRequired,
  saveQuoteChargeOK: PropTypes.func.isRequired,
  deleteQuoteCharge: PropTypes.func.isRequired,
  deleteQuotePart: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  saveQuotePartOK: PropTypes.func.isRequired,
  cloneQuote: PropTypes.func,
  changeRoute: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func,
  createNote: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  readyToIssue: PropTypes.bool,
  issueQuote: PropTypes.func,
};
export default QuoteDetail;
