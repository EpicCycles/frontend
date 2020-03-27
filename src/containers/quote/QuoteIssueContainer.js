import { connect } from 'react-redux';
import { saveBrands } from '../../state/actions/core';
import { getFrameList } from '../../state/actions/bike';
import { issueQuote, saveQuote } from '../../state/actions/quote';
import { addMessage, changeRoute } from '../../state/actions/application';
import QuoteIssue from '../../components/quote/QuoteIssue';
import { createNote, deleteNote, saveNote } from '../../state/actions/note';

const mapStateToProps = ({ bike, core, customer, framework, note, part, quote, user }) => {
  const { customers } = customer;
  const { bikes, frames } = bike;
  const { brands, suppliers, charges } = core;
  const { notes } = note;
  const { quoteId, quotes } = quote;
  const { parts, supplierProducts } = part;
  const { sections } = framework;
  const { users } = user;
  return {
    customers,
    bikes,
    frames,
    brands,
    suppliers,
    charges,
    quoteId,
    quotes,
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
  saveQuote,
  issueQuote,
  createNote,
  saveNote,
  deleteNote,
  addMessage,
  changeRoute,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuoteIssue);
