/* eslint-disable react/destructuring-assignment */
import React, { Fragment, useState } from 'react';
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
import QuoteAnswers from '../quoteAnswer/QuoteAnswers';
import { quoteOrderChecks } from './helpers/quoteOrderChecks';
import { QUOTE_COPY, QUOTE_ISSUE } from '../../helpers/routes';

const QuoteManager = props => {
  let [tab, setTab] = useState(undefined);
  const {
    quoteId,
    changeQuote,
    changeRoute,
    isLoading,
    customers,
    customerId,
    deleteNote,
    saveNote,
    createNote,
    saveCustomer,
    quotes,
    brands,
    suppliers,
    bikes,
    notes,
    charges,
    frames,
    parts,
    questions,
    supplierProducts,
    sections,
    users,
    archiveQuote,
    unarchiveQuote,
    saveQuote,
    orderQuote,
    addMessage,
  } = props;
  const getQuoteToCopy = quoteId => {
    changeQuote(quoteId);
    changeRoute(QUOTE_COPY);
  };
  const changeCurrentTab = newTab => {
    if (newTab !== tab) {
      if (newTab === 2 && !quoteId) return;
      setTab(newTab);
    }
  };
  const editQuote = quoteId => {
    changeQuote(quoteId);
    setTab(undefined);
  };
  const issueQuote = quoteId => {
    changeQuote(quoteId);
    changeRoute(QUOTE_ISSUE);
  };

  if (!doWeHaveObjects(quotes)) return <Redirect to="/quote-list" push />;

  let quote;
  if (quoteId) quote = findObjectWithId(quotes, quoteId);
  const tabData = quoteManagerTabs(quotes, quoteId);
  const currentTab = tab ? tab : tabData.defaultTab;
  return (
    <div className="page-content">
      <TabbedView tabs={tabData.tabs} changeTab={changeCurrentTab} currentTab={currentTab} />
      {currentTab === customerTab.tabValue && (
        <CustomerEdit
          customers={customers}
          isLoading={isLoading}
          customerId={customerId}
          deleteNote={deleteNote}
          saveNote={saveNote}
          createNote={createNote}
          saveCustomer={saveCustomer}
          data-test="customer-tab"
        />
      )}
      {currentTab === quoteListTab.tabValue && (
        <Fragment>
          <h1>Quote List</h1>
          <div className="row">
            <QuoteGrid
              getQuote={editQuote}
              issueQuote={issueQuote}
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
          brands={brands}
          charges={charges}
          sections={sections}
          parts={parts}
          bikes={bikes}
          customers={customers}
          frames={frames}
          users={users}
          customerView
        />
      )}
      {currentTab === answerTab.tabValue && (
        <QuoteAnswers
          charges={charges}
          quote={quote}
          questions={questions}
          saveQuote={saveQuote}
          isLoading={isLoading}
        />
      )}

      {currentTab === detailTab.tabValue && (
        <QuoteDetail
          quote={quote}
          parts={parts}
          supplierProducts={supplierProducts}
          frames={frames}
          bikes={bikes}
          customers={customers}
          brands={brands}
          charges={charges}
          suppliers={suppliers}
          sections={sections}
          issueQuote={issueQuote}
          saveQuote={saveQuote}
          orderQuote={quoteOrderChecks(quote, questions) && orderQuote}
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
          bikes={bikes}
          frames={frames}
          parts={parts}
          customers={customers}
          brands={brands}
          suppliers={suppliers}
          sections={sections}
          users={users}
          getQuote={editQuote}
          issueQuote={issueQuote}
          archiveQuote={archiveQuote}
          unarchiveQuote={unarchiveQuote}
          cloneQuote={getQuoteToCopy}
          changeRoute={changeRoute}
          data-test="bike-quotes-tab"
        />
      )}
    </div>
  );
};

QuoteManager.defaultProps = {
  bikes: [],
  frames: [],
  notes: [],
  parts: [],
  supplierProducts: [],
  brands: [],
  suppliers: [],
  sections: [],
  quotes: [],
  users: [],
  isLoading: false,
};

QuoteManager.propTypes = {
  bikes: PropTypes.array,
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
  notes: PropTypes.array,
  quotes: PropTypes.array,
  users: PropTypes.array,
  saveBrands: PropTypes.func.isRequired,
  getFrameList: PropTypes.func.isRequired,
  saveCustomer: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveQuote: PropTypes.func.isRequired,
  unarchiveQuote: PropTypes.func.isRequired,
  changeQuote: PropTypes.func.isRequired,
  saveQuote: PropTypes.func.isRequired,
  orderQuote: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default QuoteManager;
