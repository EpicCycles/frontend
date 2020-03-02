import { createCustomer, saveCustomer, deleteCustomer } from '../../state/actions/customer';
import { connect } from 'react-redux';
import CustomerEdit from '../../components/customer/CustomerEdit';
import { createNote, deleteNote, saveNote } from '../../state/actions/note';
import { archiveQuote, getQuote, getQuoteToCopy, unarchiveQuote } from '../../state/actions/quote';

export default connect(
  ({ customer, note, quote, bike, core, user }) => ({
    customers: customer.customers,
    customerId: customer.customerId,
    note: note.note,
    notes: note.notes,
    quotes: quote.quotes,
    bikes: bike.bikes,
    frames: bike.frames,
    brands: core.brands,
    users: user.users,
    isLoading: customer.isLoading || note.isLoading,
  }),
  {
    createCustomer,
    saveCustomer,
    deleteCustomer,
    createNote,
    saveNote,
    deleteNote,
    getQuote,
    archiveQuote,
    unarchiveQuote,
    getQuoteToCopy,
  },
)(CustomerEdit);
