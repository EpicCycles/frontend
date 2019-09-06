/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import TabbedView from '../../common/TabbedView';
import { doWeHaveObjects, findObjectWithId } from '../../helpers/utils';
import CustomerEdit from '../customer/CustomerEdit';
import QuoteGrid from './QuoteGrid';
import QuoteDetail from './QuoteDetail';
import NoteGrid from '../note/NoteGrid';
import QuoteBikes from './QuoteBikes';
import {
  answerTab,
  compareTab,
  customerTab,
  detailTab,
  historyTab,
  quoteListTab,
  quoteManagerTabs,
  summaryTab,
} from './helpers/quoteManagerTabs';
import QuoteSummary from '../quoteSummary/QuoteSummary';
import QuoteAnswers from "../quoteAnswer/QuoteAnswers";

class QuoteManager extends React.Component {
  state = {};
  changeCurrentTab = newTab => {
    if (newTab !== this.state.tab) {
      if (newTab === 2 && !this.props.quoteId) return;
      this.setState({ tab: newTab });
    }
  };

  editQuote = quoteId => {
    this.props.changeQuote(quoteId);
    this.changeCurrentTab(undefined);
  };
  issueQuote = quoteId => {
    this.props.changeQuote(quoteId);
    this.props.changeRoute('/quote-issue');
  };

  render() {
    const { tab } = this.state;
    const {
      isLoading,
      customers,
      customerId,
      addresses,
      phones,
      deleteCustomer,
      deleteNote,
      saveNote,
      createNote,
      deleteCustomerPhone,
      saveCustomerPhone,
      saveCustomerAddress,
      deleteCustomerAddress,
      addCustomerPhone,
      addCustomerAddress,
      saveCustomer,
      quotes,
      quoteId,
      quoteAnswers,
      quoteCharges,
      quoteParts,
      brands,
      suppliers,
      bikes,
      notes,
      bikeParts,
      charges,
      frames,
      parts,
      questions,
      supplierProducts,
      sections,
      users,
      archiveQuote,
      unarchiveQuote,
      changeRoute,
      getQuoteToCopy,
      saveQuote,
      saveQuotePart,
      saveQuotePartOK,
      deleteQuotePart,
      saveQuoteCharge,
      saveQuoteChargeOK,
      deleteQuoteCharge,
      saveQuoteAnswer,
      deleteQuoteAnswer,
      addMessage,
    } = this.props;
    if (!doWeHaveObjects(quotes)) return <Redirect to="/quote-list" push />;

    let quote;
    if (quoteId) quote = findObjectWithId(quotes, quoteId);
    const tabData = quoteManagerTabs(quotes, quoteId);
    const currentTab = tab ? tab : tabData.defaultTab;
    return (
      <div className="page-content">
        <TabbedView tabs={tabData.tabs} changeTab={this.changeCurrentTab} currentTab={currentTab} />
        {currentTab === customerTab.tabValue && (
          <CustomerEdit
            addresses={addresses}
            phones={phones}
            customers={customers}
            deleteCustomer={deleteCustomer}
            isLoading={isLoading}
            customerId={customerId}
            deleteNote={deleteNote}
            saveNote={saveNote}
            createNote={createNote}
            deleteCustomerPhone={deleteCustomerPhone}
            saveCustomerPhone={saveCustomerPhone}
            saveCustomerAddress={saveCustomerAddress}
            deleteCustomerAddress={deleteCustomerAddress}
            addCustomerPhone={addCustomerPhone}
            addCustomerAddress={addCustomerAddress}
            saveCustomer={saveCustomer}
            data-test="customer-tab"
          />
        )}
        {currentTab === quoteListTab.tabValue && (
          <Fragment>
            <h1>Quote List</h1>
            <div className="row">
              <QuoteGrid
                getQuote={this.editQuote}
                issueQuote={this.issueQuote}
                archiveQuote={archiveQuote}
                unarchiveQuote={unarchiveQuote}
                cloneQuote={getQuoteToCopy}
                changeRoute={changeRoute}
                quotes={quotes}
                customers={customers}
                brands={brands}
                bikes={bikes}
                frames={frames}
                sections={sections}
                users={users}
                data-test="quote-list-tab"
              />
            </div>
          </Fragment>
        )}
        {currentTab === summaryTab.tabValue && (
          <QuoteSummary
            quote={quote}
            quoteParts={quoteParts}
            quoteCharges={quoteCharges}
            brands={brands}
            sections={sections}
            parts={parts}
            bikeParts={bikeParts}
            bikes={bikes}
            customers={customers}
            frames={frames}
            users={users}
            customerView
          />
        )}
        {currentTab === answerTab.tabValue && (
          <QuoteAnswers
            quote={quote}
            questions={questions}
            quoteCharges={quoteCharges}
            quoteAnswers={quoteAnswers}
            saveQuoteAnswer={saveQuoteAnswer}
            deleteQuoteAnswer={deleteQuoteAnswer}
          />
        )}

        {currentTab === detailTab.tabValue && (
          <QuoteDetail
            quote={quote}
            quoteParts={quoteParts}
            quoteCharges={quoteCharges}
            bikeParts={bikeParts}
            parts={parts}
            supplierProducts={supplierProducts}
            frames={frames}
            bikes={bikes}
            customers={customers}
            brands={brands}
            charges={charges}
            suppliers={suppliers}
            sections={sections}
            issueQuote={this.issueQuote}
            saveQuote={saveQuote}
            saveQuotePart={saveQuotePart}
            saveQuotePartOK={saveQuotePartOK}
            deleteQuotePart={deleteQuotePart}
            saveQuoteCharge={saveQuoteCharge}
            saveQuoteChargeOK={saveQuoteChargeOK}
            deleteQuoteCharge={deleteQuoteCharge}
            archiveQuote={archiveQuote}
            unarchiveQuote={unarchiveQuote}
            cloneQuote={getQuoteToCopy}
            changeRoute={changeRoute}
            users={users}
            addMessage={addMessage}
            createNote={createNote}
            data-test="quote-detail-tab"
          />
        )}
        {currentTab === historyTab.tabValue && (
          <Fragment>
            <h1 data-test="quote-history-tab">{quote && 'Quote '}History</h1>
            <NoteGrid
              notes={notes.filter(note => note.quote === quoteId)}
              users={users}
              saveNote={saveNote}
              deleteNote={deleteNote}
            />
          </Fragment>
        )}
        {currentTab === compareTab.tabValue && (
          <QuoteBikes
            quotes={quotes}
            quoteParts={quoteParts}
            bikes={bikes}
            frames={frames}
            bikeParts={bikeParts}
            parts={parts}
            customers={customers}
            brands={brands}
            suppliers={suppliers}
            sections={sections}
            users={users}
            getQuote={this.editQuote}
            issueQuote={this.issueQuote}
            archiveQuote={archiveQuote}
            unarchiveQuote={unarchiveQuote}
            cloneQuote={getQuoteToCopy}
            changeRoute={changeRoute}
            data-test="bike-quotes-tab"
          />
        )}
      </div>
    );
  }
}

QuoteManager.defaultProps = {
  bikes: [],
  bikeParts: [],
  frames: [],
  addresses: [],
  phones: [],
  notes: [],
  parts: [],
  supplierProducts: [],
  brands: [],
  suppliers: [],
  sections: [],
  quotes: [],
  quoteParts: [],
  users: [],
  isLoading: false,
};

QuoteManager.propTypes = {
  bikes: PropTypes.array,
  bikeParts: PropTypes.array,
  brands: PropTypes.array,
  suppliers: PropTypes.array,
  sections: PropTypes.array,
  charges: PropTypes.array,
  parts: PropTypes.array,
  supplierProducts: PropTypes.array,
  frames: PropTypes.array,
  customers: PropTypes.array.isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  quoteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addresses: PropTypes.array,
  phones: PropTypes.array,
  notes: PropTypes.array,
  quotes: PropTypes.array,
  quoteParts: PropTypes.array,
  quoteCharges: PropTypes.array,
  users: PropTypes.array,
  saveBrands: PropTypes.func.isRequired,
  getFrameList: PropTypes.func.isRequired,
  saveCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  saveCustomerPhone: PropTypes.func.isRequired,
  deleteCustomerPhone: PropTypes.func.isRequired,
  saveCustomerAddress: PropTypes.func.isRequired,
  deleteCustomerAddress: PropTypes.func.isRequired,
  addCustomerPhone: PropTypes.func.isRequired,
  addCustomerAddress: PropTypes.func.isRequired,
  archiveQuote: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  changeQuote: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  saveQuote: PropTypes.func.isRequired,
  saveQuotePartOK: PropTypes.func.isRequired,
  saveQuoteCharge: PropTypes.func.isRequired,
  saveQuoteChargeOK: PropTypes.func.isRequired,
  deleteQuoteCharge: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  deleteQuotePart: PropTypes.func.isRequired,
  getQuoteToCopy: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default QuoteManager;
