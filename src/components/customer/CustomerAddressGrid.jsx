import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { createEmptyModelWithDefaultFields, getModelKey } from '../app/model/helpers/model';
import { customerAddressFields } from '../app/model/helpers/fields';
import AddLink from '../app/model/AddLink';
import EditModel from '../app/model/EditModel';

class CustomerAddressGrid extends React.Component {
  addNewAddress = () => {
    const newAddress = createEmptyModelWithDefaultFields(customerAddressFields);
    newAddress.customer = this.props.customerId;
    this.props.addCustomerAddress(newAddress);
  };
  render() {
    const { addresses, users, saveCustomerAddress, deleteCustomerAddress } = this.props;
    return (
      <Fragment>
        <h3>
          Customer Addresses
          <AddLink addFunction={this.addNewAddress} addObjectName="Address" />
        </h3>
        <div key="customerAddressGrid" className="grid-2">
          {addresses.map(address => {
            return (
              <EditModel
                pageMode
                model={address}
                modelFields={customerAddressFields}
                                  sourceDataArrays={{ users }}
                actionsRequired
                modelDelete={deleteCustomerAddress}
                key={`editAddress${getModelKey(address)}`}
                modelSave={saveCustomerAddress}
                showReadOnlyFields
                data-test="existing-address"
                className="fit-content"
              />
            );
          })}
        </div>
      </Fragment>
    );
  }
}

CustomerAddressGrid.defaultProps = {
  addresses: [],
};
CustomerAddressGrid.propTypes = {
  addresses: PropTypes.array,
  users: PropTypes.array,
  deleteCustomerAddress: PropTypes.func.isRequired,
  saveCustomerAddress: PropTypes.func.isRequired,
  addCustomerAddress: PropTypes.func.isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default CustomerAddressGrid;
