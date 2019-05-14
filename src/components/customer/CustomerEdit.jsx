import React, {Fragment} from 'react'
import {Dimmer, Loader} from 'semantic-ui-react'
import CustomerDetailEdit from "./CustomerDetailEdit";
import NoteEdit from "../note/NoteEdit";
import {doWeHaveObjects, findObjectWithId, updateObject} from "../../helpers/utils";
import CustomerAddressGrid from "./CustomerAddressGrid";
import {createEmptyModelWithDefaultFields, getModelKey, matchesModel} from "../app/model/helpers/model";
import CustomerPhoneGrid from "./CustomerPhoneGrid";
import {customerNoteFields} from "../app/model/helpers/fields";
import ViewModelBlock from "../app/model/ViewModelBlock";
import QuoteGrid from "../quote/QuoteGrid";
import {quoteFieldsNoCustomer} from "../quote/helpers/display";

class CustomerEdit extends React.Component {
    state = { note: createEmptyModelWithDefaultFields(customerNoteFields) };

    componentDidUpdate(prevProps) {
        if (this.props.notes !== prevProps.notes) {
            const newNoteIsOnList = this.props.notes.some(note => matchesModel(note, customerNoteFields, this.state.note));
            if (newNoteIsOnList) this.setState({ note: createEmptyModelWithDefaultFields(customerNoteFields) })
        }
    }

    saveOrCreateCustomerNote = (note) => {
        if (note.id) {
            this.props.saveNote(note);
        } else {
            const noteToSave = updateObject(note, { customer: this.props.customerId });
            this.props.createNote(noteToSave);
        }
    };

    render() {
        const { note } = this.state;
        const {
            addresses, phones, customers,
            notes, frames, bikes, quotes, brands, users,
            deleteCustomer,
            isLoading, customerId,
            deleteNote,
            deleteCustomerPhone, saveCustomerPhone,
            saveCustomerAddress, deleteCustomerAddress,
            saveCustomer, createCustomer,
            getQuote, archiveQuote, unarchiveQuote, getQuoteToCopy
        } = this.props;
        const customer = findObjectWithId(customers, customerId);
        const note_key = getModelKey(note);
        const customer_key = getModelKey(customer);
        return <div id="customer-edit">
            <h2>Customer</h2>
            <section className="row">
                <div>
                    <CustomerDetailEdit
                        customer={customer}
                        saveCustomer={saveCustomer}
                        createCustomer={createCustomer}
                        deleteCustomer={deleteCustomer}
                        componentKey={customer_key}
                        key={`detail${customer_key}`}
                        data-test="edit-customer"
                    />
                    {(customerId) &&
                    <div className="grid-container">
                        <CustomerAddressGrid
                            deleteCustomerAddress={deleteCustomerAddress}
                            saveCustomerAddress={saveCustomerAddress}
                            addresses={addresses}
                            customerId={customerId}
                            data-test="edit-customer-addresses"
                        />
                        <CustomerPhoneGrid
                            deleteCustomerPhone={deleteCustomerPhone}
                            saveCustomerPhone={saveCustomerPhone}
                            customerId={customerId}
                            phones={phones}
                            data-test="edit-customer-phones"
                        />
                    </div>}
                    {quotes && doWeHaveObjects(quotes) && <div className="grid-container">
                        <QuoteGrid
                            displayFields={quoteFieldsNoCustomer}
                            getQuote={getQuote}
                            archiveQuote={archiveQuote}
                            unarchiveQuote={unarchiveQuote}
                            cloneQuote={getQuoteToCopy}
                            bikes={bikes}
                            frames={frames}
                            brands={brands}
                            quotes={quotes}
                            users={users}
                        />
                    </div>
                    }

                </div>
                <div>
                    {(customerId) && <Fragment>
                        <NoteEdit
                            saveNote={this.saveOrCreateCustomerNote}
                            key={`detail${note_key}`}
                            note={note}
                            deleteNote={deleteNote}
                            data-test="add-customer-note"
                        />
                        {notes && notes.filter(note => (! note.quote)).map(oldNote => <ViewModelBlock
                            modelFields={customerNoteFields}
                            model={oldNote}
                            key={`note_${getModelKey(oldNote)}`}
                        />)}
                    </Fragment>
                    }
                </div>
            </section>

            {isLoading &&
            <Dimmer active inverted>
                <Loader content='Loading'/>
            </Dimmer>
            }
        </div>
    }
}

export default CustomerEdit;
