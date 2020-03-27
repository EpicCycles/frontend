import { connect } from 'react-redux';
import { getFrameList } from '../../state/actions/bike';
import { getCustomerList } from '../../state/actions/customer';
import {
  archiveQuote,
  changeQuote,
  clearQuoteState,
  getQuote,
  getQuoteList,
  getQuoteToCopy,
  unarchiveQuote,
} from '../../state/actions/quote';
import QuoteList from '../../components/quote/QuoteList';
import { changeRoute } from '../../state/actions/application';

const mapStateToProps = ({ bike, core, customer, framework, part, quote, user }) => {
  return {
    bikes: bike.bikes,
    bikeParts: bike.bikeParts,
    brands: core.brands,
    suppliers: core.suppliers,
    charges: core.charges,
    frames: bike.frames,
    count: customer.count,
    customers: customer.customers,
    next: customer.next,
    previous: customer.previous,
    searchParams: customer.searchParams,
    customerId: customer.customerId,
    parts: part.parts,
    quotes: quote.quotes,
    quoteParts: quote.quoteParts,
    quoteId: quote.quoteId,
    sections: framework.sections,
    users: user.users,
    isLoading: customer.isLoading || core.isLoading || bike.isLoading || quote.isLoading,
  };
};

const mapDispatchToProps = {
  getFrameList,
  getCustomerList,
  changeRoute,
  clearQuoteState,
  getQuoteList,
  changeQuote,
  getQuote,
  archiveQuote,
  unarchiveQuote,
  getQuoteToCopy,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuoteList);
