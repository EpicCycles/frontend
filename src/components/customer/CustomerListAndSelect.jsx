import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import CustomerSearch from './CustomerSearch';
import AddLink from '../app/model/AddLink';
import { getModelKey } from '../app/model/helpers/model';
import { buildCustomerString } from './helpers/customer';
import SelectInput from '../../common/SelectInput';

const CustomerListAndSelect = props => {
  const {
    className,
    addNewCustomer,
    getCustomerList,
    selectCustomer,
    isLoading,
    customers,
    next,
    searchParams,
    selectedCustomer,
  } = props;
  const customerOptions = customers
    ? customers.map(customer => {
        return {
          value: String(getModelKey(customer)),
          name: buildCustomerString(customer),
        };
      })
    : [];
  return (
    <Fragment>
      <h2 data-test="list-and-search-heading">Select Customer</h2>
      <div className={className}>
        <CustomerSearch
          getCustomerList={getCustomerList}
          searchParams={searchParams}
          isLoading={isLoading}
          className={className}
          data-test="search-block"
        />
        {customerOptions.length > 0 ? (
          <SelectInput
            title={'Select Customer'}
            label={'Select Customer'}
            onChange={selectCustomer}
            value={selectedCustomer}
            options={customerOptions}
            data-test="customer-block"
            fieldName="selectedCustomer"
            isEmptyAllowed={true}
          />
        ) : (
          <div className="row align_left">
            <div data-test="start-message">No Customer to show, set new criteria and search,</div>
          </div>
        )}
        <div className="row align_left">
          {next && (
            <div data-test="search-message">
              Not all customers matching are shown, refine criteria and search,
            </div>
          )}
          {addNewCustomer && <AddLink addFunction={addNewCustomer} />}
        </div>
      </div>
    </Fragment>
  );
};
CustomerListAndSelect.defaultProps = {
  count: 0,
  className: 'row',
};
CustomerListAndSelect.propTypes = {
  addNewCustomer: PropTypes.func,
  getCustomerList: PropTypes.func.isRequired,
  selectCustomer: PropTypes.func.isRequired,
  searchParams: PropTypes.object,
  isLoading: PropTypes.bool,
  customers: PropTypes.array,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  next: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedCustomer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
export default CustomerListAndSelect;
