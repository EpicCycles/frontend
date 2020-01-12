import React, { Fragment, useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import {
  doWeHaveObjects,
  findObjectWithId,
  findObjectWithKey,
  updateObject,
} from '../../helpers/utils';
import CustomerAddressGrid from './CustomerAddressGrid';
import {
  createEmptyModelWithDefaultFields,
  getModelKey,
  modelIsAlreadyInArray,
} from '../app/model/helpers/model';
import CustomerPhoneGrid from './CustomerPhoneGrid';
import { CREATED_DATE, customerFields } from '../app/model/helpers/fields';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteGrid from '../quote/QuoteGrid';
import { quoteFields } from '../quote/helpers/quoteFields';
import EditModel from '../app/model/EditModel';
import { customerNoteFields, NOTE_TEXT } from '../note/helpers/noteFields';
import FormCheckbox from '../../common/FormCheckbox';
import { formattedDateTime } from '../app/model/helpers/display';
import { fittingFields } from '../fitting/helpers/fittingFields';
import ModelTable from '../app/model/ModelTable';

const CustomerEdit = props => {
  const [note, setNote] = useState(createEmptyModelWithDefaultFields(customerNoteFields));
  const [fitting, setFitting] = useState(createEmptyModelWithDefaultFields(customerNoteFields));
  const [seeAllNotes, setSeeAllNotes] = useState(false);
  const [seeNoteDetail, setSeeNoteDetail] = useState(false);
  useEffect(() => {
    // Any time the notes in props cjhanges check the current note isnt in list
    if (modelIsAlreadyInArray(props.notes, note, customerNoteFields))
      setNote(createEmptyModelWithDefaultFields(customerNoteFields));
  }, [props.notes]);

  useEffect(() => {
    console.log('in use Effect for fittings');
    setFitting(createEmptyModelWithDefaultFields(fittingFields));
  }, [props.fittings]);

  const saveOrCreateCustomerNote = noteToSave => {
    setNote(noteToSave);
    if (noteToSave.id) {
      props.saveNote(noteToSave);
    } else {
      const noteCompleteToSave = updateObject(noteToSave, { customer: props.customerId });
      props.createNote(noteCompleteToSave);
    }
  };
  const saveOrCreateFitting = fittingToSave => {
    setFitting(fitting);
    if (fittingToSave.id) {
      props.saveFitting(fittingToSave);
    } else {
      const fitttingCompleteToSave = updateObject(fittingToSave, { customer: props.customerId });
      props.saveFitting(fitttingCompleteToSave);
    }
  };
  const moveFittingToEdit = fittingToEdit => {
    if (fittingToEdit) setFitting(fittingToEdit);
  };
  const deleteFittingBeingEdited = () => {
    if (fitting.id) {
      deleteFitting(fitting.id);
    } else {
      setFitting(createEmptyModelWithDefaultFields(fittingFields));
    }
  };
  const saveOrCreateCustomer = customer => {
    if (customer.id) {
      props.saveCustomer(customer);
    } else {
      props.createCustomer(customer);
    }
  };
  const additionalFittingActions = [
    {
      iconName: 'edit',
      iconTitle: 'edit Fitting',
      requiresIdOnly: false,
      actionFunction: moveFittingToEdit,
    },
  ];
  const {
    addresses,
    phones,
    customers,
    fittings,
    notes,
    frames,
    bikes,
    quotes,
    brands,
    users,
    deleteCustomer,
    isLoading,
    customerId,
    deleteNote,
    addCustomerPhone,
    deleteCustomerPhone,
    saveCustomerPhone,
    addCustomerAddress,
    saveCustomerAddress,
    deleteCustomerAddress,
    getQuote,
    archiveQuote,
    unarchiveQuote,
    getQuoteToCopy,
    deleteFitting,
  } = props;
  const customer = findObjectWithId(customers, customerId) || {};
  const customer_key = getModelKey(customer);
  const notesToView = notes ? notes.filter(note => seeAllNotes || !note.quote) : [];
  return (
    <div id="customer-edit">
      <h2>Customer</h2>
      <section className="row">
        <div>
          <div className="row">
            <EditModel
              model={customer}
              modelFields={customerFields}
              pageMode
              actionsRequired
              showReadOnlyFields
              modelSave={saveOrCreateCustomer}
              modelDelete={deleteCustomer}
              componentKey={customer_key}
              sourceDataArrays={{ users }}
              key="customerEdit"
              data-test="edit-customer"
              className="fit-content"
            />
            {customerId && (
              <EditModel
                model={fitting}
                modelFields={fittingFields}
                pageMode
                actionsRequired
                showReadOnlyFields
                modelSave={saveOrCreateFitting}
                modelDelete={deleteFittingBeingEdited}
                componentKey={getModelKey(fitting)}
                data-test="edit-fitting"
                className="fit-content"
                key={`edit_fitting_${getModelKey(fitting)}`}
              />
            )}
            {fittings && fittings.length > 0 && (
              <ModelTable
                viewMode
                modelArray={fittings}
                modelFields={fittingFields}
                blockIdentity={'fittings'}
                actionsRequired
                sourceDataArrays={{ users }}
                modelDelete={deleteFitting}
                additionalActionsRequired={additionalFittingActions}
              />
            )}
          </div>
          {customerId && (
            <div className="grid-container">
              <CustomerAddressGrid
                deleteCustomerAddress={deleteCustomerAddress}
                saveCustomerAddress={saveCustomerAddress}
                addCustomerAddress={addCustomerAddress}
                addresses={addresses}
                users={users}
                customerId={customerId}
                data-test="edit-customer-addresses"
              />
              <CustomerPhoneGrid
                deleteCustomerPhone={deleteCustomerPhone}
                saveCustomerPhone={saveCustomerPhone}
                addCustomerPhone={addCustomerPhone}
                customerId={customerId}
                phones={phones}
                users={users}
                data-test="edit-customer-phones"
              />
            </div>
          )}
          {customerId && quotes && doWeHaveObjects(quotes) && (
            <div className="grid-container">
              <QuoteGrid
                displayFields={quoteFields({
                  fieldExclusions: { customer: true, history: true },
                })}
                getQuote={getQuote}
                archiveQuote={archiveQuote}
                unarchiveQuote={unarchiveQuote}
                cloneQuote={getQuoteToCopy}
                bikes={bikes}
                frames={frames}
                brands={brands}
                quotes={quotes.filter(quote => quote.customer === customerId)}
                users={users}
              />
            </div>
          )}
        </div>
        <div>
          {customerId && (
            <Fragment>
              <EditModel
                model={note}
                modelFields={customerNoteFields}
                sourceDataArrays={{ users }}
                showReadOnlyFields
                pageMode
                actionsRequired
                modelSave={saveOrCreateCustomerNote}
                key={`editNote`}
                modelDelete={deleteNote}
                data-test="add-customer-note"
              />
              {notesToView.length > 0 && (
                <Fragment>
                  <h2>Notes</h2>
                  <div className="row">
                    <FormCheckbox
                      onChange={() => setSeeNoteDetail(!seeNoteDetail)}
                      fieldName={'seeNoteDetail'}
                      fieldLabel={'See details'}
                      fieldValue={seeNoteDetail}
                    />
                    <FormCheckbox
                      onChange={() => setSeeAllNotes(!seeAllNotes)}
                      fieldName={'seeAllNotes'}
                      fieldLabel={'See all notes'}
                      fieldValue={seeAllNotes}
                    />
                  </div>
                  {notesToView.map(oldNote =>
                    seeNoteDetail ? (
                      <ViewModelBlock
                        modelFields={customerNoteFields}
                        model={oldNote}
                        key={`note_${getModelKey(oldNote)}`}
                        sourceDataArrays={{ users }}
                      />
                    ) : (
                      <div>
                        {oldNote[NOTE_TEXT]} ({formattedDateTime(new Date(oldNote[CREATED_DATE]))})
                      </div>
                    ),
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </section>

      {isLoading && (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )}
    </div>
  );
};

export default CustomerEdit;
