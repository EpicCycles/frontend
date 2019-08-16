import { connect } from 'react-redux';
import { getFrameList } from '../../state/actions/bike';
import { getCustomerList } from '../../state/actions/customer';
import { copyQuote } from '../../state/actions/quote';
import QuoteCopy from '../../components/quote/QuoteCopy';
import {changeRoute} from "../../state/actions/application";

const mapStateToProps = ({ bike, core, customer, framework, part, quote, user }) => {
  return {
    bikes: bike.bikes,
    bikeParts: bike.bikeParts,
    brands: core.brands,
    suppliers: core.suppliers,
    sections: framework.sections,
    parts: part.parts,
    supplierProducts: part.supplierProducts,
    frames: bike.frames,
    count: customer.count,
    customers: customer.customers,
    next: customer.next,
    previous: customer.previous,
    searchParams: customer.searchParams,
    customerId: customer.customerId,
    quotes: quote.quotes,
    quoteId: quote.quoteId,
    quoteParts: quote.quoteParts,
    users: user.users,
    isLoading:
      customer.isLoading ||
      core.isLoading ||
      bike.isLoading ||
      framework.isLoading ||
      quote.isLoading,
  };
};

const mapDispatchToProps = {
  getFrameList,
  getCustomerList,
  changeRoute,
  copyQuote,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteCopy);
