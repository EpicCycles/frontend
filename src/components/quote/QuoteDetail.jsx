import React, { Fragment, useState, useEffect } from 'react';
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
import { checkForChanges, getModelKey } from '../app/model/helpers/model';
import { QUOTE_PART_FOR_BIKE } from '../quotePart/helpers/quotePartFields';
import { quoteIssueChecks } from './helpers/quoteIssueChecks';
import EditModelSimple from '../app/model/EditModelSimple';
import { quoteFields } from './helpers/quoteFields';
import { customerNoteFields } from '../note/helpers/noteFields';
import {
  quoteChargeFields,
  quoteChargeFieldsBasic,
} from '../quoteCharge/helpers/quoteChargeFields';
import ModelTable from '../app/model/ModelTable';
import { updateModelArrayOnModel } from '../app/model/helpers/updateModelArrayOnModel';
import EditModelButtons from '../app/model/EditModelButtons';
import { quotePrice } from './helpers/quotePrice';
import { getEditedFields } from '../app/model/helpers/getEditedFields';
import { removeModelFromArrayOnModel } from '../app/model/helpers/removeModelFromArrayOnModel';
import { getQuoteParts } from '../quotePart/helpers/getQuoteParts';

const QuoteDetail = props => {
  let [updatedQuote, setUpdatedQuote] = useState(props.quote);
  let [updatedQuoteCharges, setUpdatedQuoteCharges] = useState([]);
  let [updatedQuoteParts, setUpdatedQuoteParts] = useState([]);
  let [updatedNote, setUpdatedNote] = useState(undefined);

  useEffect(() => {
    if (updatedQuote.changed) {
      if (props.quote.upd_date > updatedQuote.upd_date) {
        setUpdatedQuote(props.quote);
      }
    }
  }, [updatedQuote, props.quote]);
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
    unarchiveQuote,
    orderQuote,
    createNote,
    cloneQuote,
  } = props;

  const bike = findObjectWithId(bikes, quote.bike);
  const quoteModelFields = quoteFields({
    quote,
    bike,
    pricesRequired: readyToIssue || quote.quote_status !== QUOTE_INITIAL,
  });
  const chargesFields = quoteChargeFields(charges);
  const saveQuoteChanges = quoteToSave => {
    if (quoteToSave.quote_status === QUOTE_INITIAL) {
      saveQuote(quoteToSave);
    } else {
      saveQuote(updateObject(quoteToSave, { id: undefined, quote_status: QUOTE_INITIAL}));
    }
  };
  const cancelIssue = () => {
    props.changeRoute('/quote');
  };
  const editIssuedQuote = quoteKey => {
    const copiedQuote = updateObject(quote, { id: undefined, quote_status: QUOTE_INITIAL });
    saveQuote(copiedQuote);
  };
  const attemptToIssueQuote = quoteKey => {
    if (updatedQuoteParts.length > 0 || updatedQuoteCharges.length > 0) {
      addMessage('Confirm all charge or part changes before saving quote', 'W');
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
    setUpdatedQuoteParts(newUpdatedQuoteParts);
  };
  const raiseStateForQuoteCharge = updatedQuoteCharge => {
    const newUpdatedQuoteCharges = updateObjectInArray(updatedQuoteCharges, updatedQuoteCharge);
    setUpdatedQuoteCharges(newUpdatedQuoteCharges);
  };
  const raiseStateForNote = changedNote => {
    if (changedNote.dummyKey) {
      setUpdatedNote(changedNote);
    } else {
      setUpdatedNote(updateObject(changedNote, { dummyKey: generateRandomCode() }));
    }
  };
  const addNewQuotePart = () => {
    const quoteWithNewPart = updateModelArrayOnModel(
      updatedQuote,
      'quoteParts',
      QUOTE_PART_FOR_BIKE,
      {},
    );
    const lastAddedQuotePart = quoteWithNewPart.quoteParts[quoteWithNewPart.quoteParts.length - 1];
    setUpdatedQuoteParts(addItemsToArray(updatedQuoteParts, [lastAddedQuotePart]));
    setUpdatedQuote(quoteWithNewPart);
  };
  const addNewQuoteCharge = () => {
    const quoteWithNewCharge = updateModelArrayOnModel(
      updatedQuote,
      'charges',
      quoteChargeFieldsBasic,
      {},
    );
    const lastAddedQuoteCharge = quoteWithNewCharge.charges[quoteWithNewCharge.charges.length - 1];
    setUpdatedQuoteCharges(addItemsToArray(updatedQuoteCharges, [lastAddedQuoteCharge]));
    setUpdatedQuote(quoteWithNewCharge);
  };
  const saveNote = note => {
    createNote(note);
    setUpdatedNote(undefined);
  };
  const deleteQuoteCharge = itemId => {
    setUpdatedQuoteCharges(removeItemFromArray(updatedQuoteCharges, itemId));
    updatePricingAndState(removeModelFromArrayOnModel(updatedQuote, 'charges', itemId));
  };
  const saveQuoteCharge = updatedCharge => {
    setUpdatedQuoteCharges(removeItemFromArray(updatedQuoteCharges, getModelKey(updatedCharge)));

    updatePricingAndState(
      updateModelArrayOnModel(updatedQuote, 'charges', chargesFields, updatedCharge),
    );
  };
  const deleteQuotePart = itemId => {
    setUpdatedQuoteParts(removeItemFromArray(updatedQuoteParts, itemId));
    updatePricingAndState(removeModelFromArrayOnModel(updatedQuote, 'quoteParts', itemId));
  };
  const saveQuotePart = quotePart => {
    setUpdatedQuoteParts(removeItemFromArray(updatedQuoteParts, getModelKey(quotePart)));
    updatePricingAndState(
      updateModelArrayOnModel(updatedQuote, 'quoteParts', QUOTE_PART_FOR_BIKE, quotePart),
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
            saveModel={saveQuoteChanges}
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
          charges={charges}
          parts={parts}
          bikeParts={bike ? bike.bikeParts : []}
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
            modelArray={updatedQuote.charges}
            updatedModelArray={updatedQuoteCharges}
            modelFields={chargesFields}
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
            quoteParts={getQuoteParts(updatedQuote, sections, bike, parts, brands)}
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
  editQuote: PropTypes.func,
  cloneQuote: PropTypes.func,
  changeRoute: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func,
  createNote: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  readyToIssue: PropTypes.bool,
  issueQuote: PropTypes.func,
};
export default QuoteDetail;
