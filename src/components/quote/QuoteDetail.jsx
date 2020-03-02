import React, { Fragment, useState } from 'react';
import {
  addItemsToArray,
  findObjectWithId,
  generateRandomCode,
  removeItemFromArray,
  updateObject,
  updateObjectInArray,
} from '../../helpers/utils';
import * as PropTypes from 'prop-types';
import QuoteSummaryParts from '../quoteSummary/QuoteSummaryParts';
import QuotePartGrid from '../quotePart/QuotePartGrid';
import { QUOTE_INITIAL, QUOTE_ISSUED } from './helpers/quote';

import QuoteActionCell from './QuoteActionCell';
import { getModelKey } from '../app/model/helpers/model';
import { quotePartFields } from '../quotePart/helpers/quotePartFields';
import { quoteIssueChecks } from './helpers/quoteIssueChecks';
import EditModelSimple from '../app/model/EditModelSimple';
import { quoteFields } from './helpers/quoteFields';
import { customerNoteFields } from '../note/helpers/noteFields';
import { quoteChargeFields } from '../quoteCharge/helpers/quoteChargeFields';
import ModelTable from '../app/model/ModelTable';
import { updateModelArrayOnModel } from '../app/model/helpers/updateModelArrayOnModel';
import EditModelButtons from '../app/model/EditModelButtons';
import { quotePrice } from './helpers/quotePrice';
import { getEditedFields } from '../app/model/helpers/getEditedFields';

const QuoteDetail = props => {
  let [updatedQuote, setUpdatedQuote] = useState(props.quote);
  let [updatedQuoteCharges, setUpdatedQuoteCharges] = useState([]);
  let [updatedQuoteParts, setUpdatedQuoteParts] = useState([]);
  let [updatedNote, setUpdatedNote] = useState(undefined);

  const {
    quote,
    parts,
    addMessage,
    readyToIssue,
    issueQuote,
    supplierProducts,
    users,
    brands,
    charges,
    suppliers,
    sections,
    saveQuote,
    archiveQuote,
    bikes,
    frames,
    customers = [],
    cloneQuote,
    unarchiveQuote,
    orderQuote,
  } = props;

  const bike = findObjectWithId(bikes, quote.bike);
  const quoteModelFields = quoteFields({
    quote,
    bike,
    pricesRequired: readyToIssue || quote.quote_status !== QUOTE_INITIAL,
  });

  const cancelIssue = () => {
    props.changeRoute('/quote');
  };
  const editIssuedQuote = quoteKey => {
    const copiedQuote = updateObject(quote, {id: undefined, version: quote.version + 1});
    props.saveQuote(copiedQuote);
  };
  const attemptToIssueQuote = quoteKey => {
    if (updatedQuoteParts.length > 0 || updatedQuoteCharges.length > 0) {
      addMessage('Comfirm all charge or part changes before saving quote', 'W');
      return;
    }

    const problems = quoteIssueChecks(updatedQuote, readyToIssue);
    if (problems) {
      addMessage(problems.join(' '), 'W');
    } else if (!readyToIssue) {
      props.changeRoute('/quote-issue');
    } else {
      issueQuote(quoteKey);
    }
  };
  const resetAllChanges = () => {
    setUpdatedQuote(quote);
    setUpdatedQuoteParts([]);
    setUpdatedQuoteCharges([]);
  };
  const updatePricingAndState = quoteBeforePrices => {
    setUpdatedQuote(quotePrice(quoteBeforePrices, bike, charges));
  };
  const raiseStateForQuote = changedQuoteDetail => {
    const updatedQuoteFields = getEditedFields(changedQuoteDetail, quoteModelFields);

    updatePricingAndState(updateObject(updatedQuote, updatedQuoteFields, { changed: true }));
  };

  const raiseStateForQuotePart = updatedQuotePart => {
    const newUpdatedQuoteParts = updateObjectInArray(updatedQuoteParts, updatedQuotePart);
    updatePricingAndState(newUpdatedQuoteParts);
  };
  const raiseStateForQuoteCharge = updatedQuoteCharge => {
    const newUpdatedQuoteCharges = updateObjectInArray(updatedQuoteCharges, updatedQuoteCharge);
    updatePricingAndState(newUpdatedQuoteCharges);
  };
  const raiseStateForNote = changedNote => {
    if (changedNote.dummyKey) {
      setUpdatedNote(changedNote);
    } else {
      setUpdatedNote(updateObject(changedNote, { dummyKey: generateRandomCode() }));
    }
  };
  const addNewQuotePart = () => {
    const newQuotePart = { dummyKey: generateRandomCode() };
    setUpdatedQuoteParts(addItemsToArray(updatedQuoteParts, [newQuotePart]));
    setUpdatedQuote(
      updateModelArrayOnModel(updatedQuote, 'quoteParts', quotePartFields(), newQuotePart),
    );
  };
  const addNewQuoteCharge = () => {
    const newQuoteCharge = { dummyKey: generateRandomCode(), quote: quote.id };
    setUpdatedQuoteCharges(addItemsToArray(updatedQuoteCharges, [newQuoteCharge]));
    setUpdatedQuote(
      updateModelArrayOnModel(updatedQuote, 'charges', quotePartFields(), newQuoteCharge),
    );
  };
  const saveNote = note => {
    createNote(note);
    setUpdatedNote(undefined);
  };
  const deleteQuoteCharge = itemId => {
    setUpdatedQuoteCharges(removeItemFromArray(updatedQuoteCharges, itemId));
    setUpdatedQuote(removeModelFromArrayOnModel(updatedQuote, 'charges', itemId));
  };
  const saveQuoteCharge = updatedCharge => {
    setUpdatedQuoteCharges(removeItemFromArray(updatedQuoteCharges, getModelKey(updatedCharge)));
    setUpdatedQuote(
      updateModelArrayOnModel(updatedQuote, 'charges', quoteChargeFields, updatedCharge),
    );
  };
  const deleteQuotePart = itemId => {
    setUpdatedQuoteParts(removeItemFromArray(updatedQuoteParts, itemId));
    setUpdatedQuote(removeModelFromArrayOnModel(updatedQuote, 'quoteParts', itemId));
  };
  const saveQuotePart = quotePart => {
    setUpdatedQuoteParts(removeItemFromArray(updatedQuoteParts, getModelKey(quotePart)));
    setUpdatedQuote(
      updateModelArrayOnModel(updatedQuote, 'quoteParts', quoteChargeFields, quotePart),
    );
  };

  const customer = customers.find(c => c.id === quote.customer);

  const fittings = customer ? customer.fittings : [];
  const newNote = { quote: quote.id, customer: quote.customer };
  const additionalActions = [
    {
      iconName: 'add',
      iconTitle: 'Add Quote Part',
      iconAction: addNewQuotePart,
    },
    {
      iconName: 'pound sign',
      iconTitle: 'Add Quote Charge',
      iconAction: addNewQuoteCharge,
    },
  ];

  return (
    <Fragment>
      <div className="row">
        <div>
          <EditModelButtons
            saveModel={saveQuote}
            resetChanges={resetAllChanges}
            model={updatedQuote}
          />
          {!readyToIssue ? (
            <QuoteActionCell
              quote={quote}
              archiveQuote={archiveQuote}
              unarchiveQuote={unarchiveQuote}
              cloneQuote={cloneQuote}
              issueQuote={attemptToIssueQuote}
              placeOrder={orderQuote}
              getQuote={quote.quote_status === QUOTE_ISSUED ? editIssuedQuote : undefined}
            />
          ) : (
            <QuoteActionCell quote={quote} getQuote={cancelIssue} issueQuote={issueQuote} />
          )}
          <EditModelSimple
            pageMode
            actionsRequired
            model={updatedQuote ? updatedQuote : quote}
            persistedModel={quote}
            modelFields={quoteModelFields}
            sourceDataArrays={{ brands, bikes, frames, users, customers, fittings }}
            modelSave={saveQuote}
            modelDelete={archiveQuote}
            additionalActions={additionalActions}
            key={`editQuote${quote.id}`}
            showReadOnlyFields
            raiseState={raiseStateForQuote}
          />
        </div>
        <QuoteSummaryParts
          lockFirstColumn={true}
          quote={quote}
          brands={brands}
          sections={sections}
          parts={parts}
          bikeParts={bike && bike.bikeParts}
          showPrices
        />
        <div>
          <EditModelSimple
            model={updatedNote ? updatedNote : newNote}
            persistedModel={newNote}
            modelFields={customerNoteFields}
            pageMode
            actionsRequired
            modelSave={saveNote}
            raiseState={raiseStateForNote}
            key={`editNote`}
            data-test="add-customer-note"
          />
          <ModelTable
            modelArray={quote.charges}
            updatedModelArray={updatedQuoteCharges}
            modelFields={quoteChargeFields}
            raiseState={raiseStateForQuoteCharge}
            modelDelete={deleteQuoteCharge}
            modelSave={saveQuoteCharge}
            blockIdentity={'quoteCharge'}
            sourceDataArrays={{ charges }}
            actionsRequired
          />
        </div>
      </div>
      {quote.quote_status === QUOTE_INITIAL && (
        <div className="grid-container">
          <QuotePartGrid
            isBike={!!quote.bike}
            quoteParts={quote.quoteParts}
            updatedQuoteParts={updatedQuoteParts}
            brands={brands}
            suppliers={suppliers}
            sections={sections}
            parts={parts}
            supplierProducts={supplierProducts}
            deleteQuotePart={deleteQuotePart}
            saveQuotePart={saveQuotePart}
            addQuotePart={addNewQuotePart}
            raiseStateForQuotePart={raiseStateForQuotePart}
            pricesRequired={readyToIssue}
          />
        </div>
      )}
    </Fragment>
  );
};

QuoteDetail.defaultProps = {
  parts: [],
  brands: [],
  suppliers: [],
  users: [],
  sections: [],
};

QuoteDetail.propTypes = {
  quote: PropTypes.object.isRequired,
  bikes: PropTypes.array.isRequired,
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
  orderQuote: PropTypes.func,
  cloneQuote: PropTypes.func,
  editQuote: PropTypes.func,
  changeRoute: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func,
  createNote: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  readyToIssue: PropTypes.bool,
  issueQuote: PropTypes.func,
};
export default QuoteDetail;
