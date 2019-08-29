import React, { Fragment } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { doWeHaveObjects, findObjectWithId, updateObject } from '../../helpers/utils';
import CustomerAddressGrid from './CustomerAddressGrid';
import {
  createEmptyModelWithDefaultFields,
  getModelKey,
  modelIsAlreadyInArray,
} from '../app/model/helpers/model';
import CustomerPhoneGrid from './CustomerPhoneGrid';
import { customerFields } from '../app/model/helpers/fields';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteGrid from '../quote/QuoteGrid';
import { quoteFields } from '../quote/helpers/quoteFields';
import EditModel from '../app/model/EditModel';
import { customerNoteFields } from '../note/helpers/noteFields';

class CustomerEdit extends React.Component {
  state = { note: createEmptyModelWithDefaultFields(customerNoteFields) };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.notes !== prevProps.notes) {
      if (modelIsAlreadyInArray(this.props.notes, this.state.note, customerNoteFields))
        this.setState({ note: createEmptyModelWithDefaultFields(customerNoteFields) });
    }
  }

  saveOrCreateCustomerNote = note => {
    this.setState({ note });
    if (note.id) {
      this.props.saveNote(note);
    } else {
      const noteToSave = updateObject(note, { customer: this.props.customerId });
      this.props.createNote(noteToSave);
    }
  };
  saveOrCreateCustomer = customer => {
    if (customer.id) {
      this.props.saveCustomer(customer);
    } else {
      this.props.createCustomer(customer);
    }
  };

  render() {
    const { note } = this.state;
    const {
      addresses,
      phones,
      customers,
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
    } = this.props;
    const customer = findObjectWithId(customers, customerId) || {};
    const customer_key = getModelKey(customer);
    return (
      <div id="customer-edit">
        <h2>Customer</h2>
        <section className="row">
          <div>
            <EditModel
              model={customer}
              modelFields={customerFields}
              pageMode
              actionsRequired
              showReadOnlyFields
              modelSave={this.saveOrCreateCustomer}
              modelDelete={deleteCustomer}
              componentKey={customer_key}
              users={users}
              key="customerEdit"
              data-test="edit-customer"
              className="fit-content"
            />
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
                  displayFields={quoteFields({}, false, undefined, true)}
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
                  showReadOnlyFields
                  pageMode
                  actionsRequired
                  modelSave={this.saveOrCreateCustomerNote}
                  key={`editNote`}
                  modelDelete={deleteNote}
                  data-test="add-customer-note"
                />
                {notes &&
                  notes
                    .filter(note => !note.quote)
                    .map(oldNote => (
                      <ViewModelBlock
                        modelFields={customerNoteFields}
                        model={oldNote}
                        key={`note_${getModelKey(oldNote)}`}
                        users={users}
                      />
                    ))}
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
  }
}

export default CustomerEdit;
