import React from 'react';
import * as PropTypes from 'prop-types';
import { customerSearchFields } from './helpers/search';
import Search from '../search/Search';

class CustomerSearch extends React.Component {
  customerSearch = searchCriteria => {
    const { firstName = '', lastName = '', email = '' } = searchCriteria;
    this.props.getCustomerList(firstName, lastName, email);
  };
  render() {
    const { isLoading, searchParams } = this.props;
    return (
      <Search
        searchFields={customerSearchFields}
        doSearch={this.customerSearch}
        isLoading={isLoading}
        pageMode
        searchCriteri={searchParams}
        searchTitle={'Find Customer'}
      />
    );
  }
}

CustomerSearch.defaultProps = {
  searchParams: {
    firstName: '',
    lastName: '',
    email: '',
  },
  className: 'row',
};
CustomerSearch.propTypes = {
  isLoading: PropTypes.bool,
  searchParams: PropTypes.object,
  getCustomerList: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default CustomerSearch;
