import { connect } from 'react-redux';
import { saveBrands } from '../../state/actions/core';
import { getFrameList } from '../../state/actions/bike';
import { createCustomer, saveCustomer } from '../../state/actions/customer';
import { createNote, deleteNote, saveNote } from '../../state/actions/note';
import QuoteManager from '../../components/quote/QuoteManager';
import {
  archiveQuote,
  changeQuote,
  orderQuote,
  saveQuote,
  unarchiveQuote,
} from '../../state/actions/quote';
import { addMessage, changeRoute } from '../../state/actions/application';

const mapStateToProps = ({ bike, core, customer, framework, note, part, quote, user }) => {
  const { customers, customerId } = customer;
  const { bikes, frames } = bike;
  const { brands, suppliers, charges, questions } = core;
  const { notes } = note;
  const { quoteId, quotes } = quote;
  const { parts, supplierProducts } = part;
  const { sections } = framework;
  const { users } = user;
  return {
    customers,
    customerId,
    bikes,
    frames,
    brands,
    suppliers,
    charges,
    quoteId,
    quotes,
    parts,
    questions,
    supplierProducts,
    notes,
    sections,
    users,
    isLoading:
      customer.isLoading ||
      core.isLoading ||
      bike.isLoading ||
      framework.isLoading ||
      quote.isLoading,
  };
};

const mapDispatchToProps = {
  saveBrands,
  getFrameList,
  createCustomer,
  saveCustomer,
  createNote,
  saveNote,
  deleteNote,
  archiveQuote,
  unarchiveQuote,
  changeQuote,
  saveQuote,
  orderQuote,
  addMessage,
  changeRoute,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuoteManager);
