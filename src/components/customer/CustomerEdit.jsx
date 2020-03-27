import React, { Fragment, useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { doWeHaveObjects, findObjectWithId, updateObject } from '../../helpers/utils';
import CustomerAddressGrid from './CustomerAddressGrid';
import {
  createEmptyModelWithDefaultFields,
  getModelKey,
  modelIsAlreadyInArray,
} from '../app/model/helpers/model';
import CustomerPhoneGrid from './CustomerPhoneGrid';
import {
  CREATED_DATE,
  customerAddressFields,
  customerFields,
  customerPhoneFields,
} from '../app/model/helpers/fields';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteGrid from '../quote/QuoteGrid';
import { quoteFields } from '../quote/helpers/quoteFields';
import EditModel from '../app/model/EditModel';
import { customerNoteFields, NOTE_TEXT } from '../note/helpers/noteFields';
import FormCheckbox from '../../common/FormCheckbox';
import { formattedDateTime } from '../app/model/helpers/display';
import { fittingFields } from '../fitting/helpers/fittingFields';
import ModelTable from '../app/model/ModelTable';
import { updateModelArrayOnModel } from '../app/model/helpers/updateModelArrayOnModel';
import { removeModelFromArrayOnModel } from '../app/model/helpers/removeModelFromArrayOnModel';
import EditModelButtons from '../app/model/EditModelButtons';
import {getEditedFields} from "../app/model/helpers/getEditedFields";

const emptyFitting = createEmptyModelWithDefaultFields(fittingFields);
const emptyAddress = createEmptyModelWithDefaultFields(customerAddressFields);
const emptyPhone = createEmptyModelWithDefaultFields(customerPhoneFields);
const CustomerEdit = props => {
  const [note, setNote] = useState(createEmptyModelWithDefaultFields(customerNoteFields));
  const [seeAllNotes, setSeeAllNotes] = useState(false);
  const [seeNoteDetail, setSeeNoteDetail] = useState(false);
  let [customer, setCustomer] = useState(
    findObjectWithId(props.customers, props.customerId) ||
      createEmptyModelWithDefaultFields(customerFields),
  );
  let [fitting, setFitting] = useState(emptyFitting);
  let [newAddress, setNewAddress] = useState(emptyAddress);
  let [newPhone, setNewPhone] = useState(emptyPhone);

  useEffect(() => {
    // Any time the notes in props cjhanges check the current note isnt in list
    if (modelIsAlreadyInArray(props.notes, note, customerNoteFields))
      setNote(createEmptyModelWithDefaultFields(customerNoteFields));
  }, [props.notes]);

  const resetCustomer = () => {
    setCustomer(
      findObjectWithId(props.customers, props.customerId) ||
        createEmptyModelWithDefaultFields(customerFields),
    );
    setFitting(createEmptyModelWithDefaultFields(fittingFields));
    setNewAddress(createEmptyModelWithDefaultFields(customerAddressFields));
    setNewPhone(createEmptyModelWithDefaultFields(customerPhoneFields));
    setNote(createEmptyModelWithDefaultFields(customerNoteFields));
  };
  const saveOrCreateCustomerNote = noteToSave => {
    setNote(noteToSave);
    if (noteToSave.id) {
      props.saveNote(noteToSave);
    } else {
      const noteCompleteToSave = updateObject(noteToSave, { customer: props.customerId });
      props.createNote(noteCompleteToSave);
    }
  };
  const saveArrayObject = (arrayName, arrayFields, arrayObject) => {
    setCustomer(updateModelArrayOnModel(customer, arrayName, arrayFields, arrayObject));
  };
  const removeItemFromArrayObject = (arrayName, itemId) => {
    setCustomer(removeModelFromArrayOnModel(customer, arrayName, itemId));
  };
  const saveOrCreateFitting = fittingToSave => {
    saveArrayObject('fittings', fittingFields, fittingToSave);
  };
  const saveOrCreateAddress = addressToSave => {
    if (!addressToSave.id) {
      setNewAddress(createEmptyModelWithDefaultFields(customerAddressFields));
    }
    saveArrayObject('addresses', customerAddressFields, addressToSave);
  };
  const saveOrCreatePhone = phoneToSave => {
    if (!phoneToSave.id) {
      setNewPhone(createEmptyModelWithDefaultFields(customerPhoneFields));
    }
    saveArrayObject('phoneNumbers', customerPhoneFields, phoneToSave);
  };
  const moveFittingToEdit = fittingToEdit => {
    if (fittingToEdit) setFitting(fittingToEdit);
  };
  const deleteFitting = idToDelete => removeItemFromArrayObject('fittings', idToDelete);
  const deleteAddress = idToDelete => removeItemFromArrayObject('addresses', idToDelete);
  const deletePhone = idToDelete => removeItemFromArrayObject('phoneNumbers', idToDelete);

  const deleteFittingBeingEdited = () => {
    if (fitting.id) {
      deleteFitting(fitting.id);
    }
    setFitting(emptyFitting);
  };
  const saveOrCreateCustomer = () => {
    if (customer.id) {
      props.saveCustomer(customer);
    } else {
      props.createCustomer(customer);
    }
  };
  const saveCustomerChanges = customerWithChanges => {
    const customerChangedFields = getEditedFields(customerWithChanges, customerFields);
    setCustomer(updateObject(customer, customerChangedFields));
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
    getQuote,
    archiveQuote,
    unarchiveQuote,
    getQuoteToCopy,
  } = props;
  const { fittings, addresses, phoneNumbers } = customer;
  const customerKey = getModelKey(customer);
  const notesToView = notes ? notes.filter(note => seeAllNotes || !note.quote) : [];
  return (
    <div id="customer-edit">
      <div className="row">
        <h2>Customer</h2>
        <EditModelButtons
          deleteModel={deleteCustomer}
          model={customer}
          resetChanges={resetCustomer}
          saveModel={saveOrCreateCustomer}
        />
      </div>
      <section className="row">
        <div>
          <div className="row">
            <EditModel
              model={customer}
              modelFields={customerFields}
              pageMode
              actionsRequired
              showReadOnlyFields
              componentKey={customerKey}
              sourceDataArrays={{ users }}
              key="customerEdit"
              data-test="edit-customer"
              className="fit-content"
              modelSave={saveCustomerChanges}
            />
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
            {fittings && fittings.length > 0 && (
              <ModelTable
                viewMode
                modelArray={fittings}
                modelFields={fittingFields}
                blockIdentity={'fittings'}
                actionsRequired
                modelDelete={deleteFitting}
                additionalActionsRequired={additionalFittingActions}
                data-test="fitting-table"
              />
            )}
          </div>

          <div className="grid-container">
            <CustomerAddressGrid
              deleteCustomerAddress={deleteAddress}
              saveCustomerAddress={saveOrCreateAddress}
              addresses={addresses}
              newAddress={newAddress}
              data-test="edit-customer-addresses"
            />
            <CustomerPhoneGrid
              deleteCustomerPhone={deletePhone}
              saveCustomerPhone={saveOrCreatePhone}
              phoneNumbers={phoneNumbers}
              newPhone={newPhone}
              data-test="edit-customer-phoneNumbers"
            />
          </div>
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
