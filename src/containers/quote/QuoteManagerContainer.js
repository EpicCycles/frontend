import { connect } from 'react-redux';
import { saveBrands } from '../../state/actions/core';
import { getFrameList } from '../../state/actions/bike';
import {
  createCustomer,
  deleteCustomer,
  deleteCustomerAddress,
  deleteCustomerPhone,
  saveCustomer,
  saveCustomerAddress,
  saveCustomerPhone,
} from '../../state/actions/customer';
import { createNote, deleteNote, saveNote } from '../../state/actions/note';
import QuoteManager from '../../components/quote/QuoteManager';
import {
  archiveQuote,
  changeQuote,
  deleteQuoteCharge,
  deleteQuotePart,
  getQuoteToCopy,
  saveQuote,
  saveQuoteCharge,
  saveQuoteChargeOK,
  saveQuotePart,
  saveQuotePartOK,
  unarchiveQuote,
} from '../../state/actions/quote';
import { addMessage, changeRoute } from '../../state/actions/application';

const mapStateToProps = ({ bike, core, customer, framework, note, part, quote, user }) => {
  const { customers, customerId, addresses, phones } = customer;
  const { bikes, bikeParts, frames } = bike;
  const { brands, suppliers, charges } = core;
  const { notes } = note;
  const { quoteId, quotes, quoteCharges, quoteParts } = quote;
  const { parts, supplierProducts } = part;
  const { sections } = framework;
  const { users } = user;
  return {
    customers,
    customerId,
    addresses,
    phones,
    bikes,
    bikeParts,
    frames,
    brands,
    suppliers,
    charges,
    quoteId,
    quotes,
    quoteCharges,
    quoteParts,
    parts,
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
  deleteCustomer,
  createNote,
  saveNote,
  deleteNote,
  saveCustomerPhone,
  deleteCustomerPhone,
  saveCustomerAddress,
  deleteCustomerAddress,
  archiveQuote,
  unarchiveQuote,
  changeQuote,
  saveQuote,
  saveQuotePart,
  saveQuotePartOK,
  deleteQuotePart,
  saveQuoteCharge,
  saveQuoteChargeOK,
  deleteQuoteCharge,
  getQuoteToCopy,
  addMessage,
  changeRoute,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteManager);
