import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { getModelKey } from '../app/model/helpers/model';
import { customerAddressFields } from '../app/model/helpers/fields';
import EditModel from '../app/model/EditModel';

const CustomerAddressGrid = props => {
  const { addresses, saveCustomerAddress, deleteCustomerAddress, newAddress } = props;
  return (
    <Fragment>
      <h3>Customer Addresses</h3>
      <div key="customerAddressGrid" className="grid-2">
        {addresses.map(address => {
          return (
            <EditModel
              pageMode
              model={address}
              modelFields={customerAddressFields}
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
        {newAddress && (
          <EditModel
            pageMode
            model={newAddress}
            modelFields={customerAddressFields}
            actionsRequired
            modelDelete={deleteCustomerAddress}
            key={`editAddress${getModelKey(newAddress)}`}
            modelSave={saveCustomerAddress}
            showReadOnlyFields
            data-test="new-address"
            className="fit-content"
          />
        )}
      </div>
    </Fragment>
  );
};

CustomerAddressGrid.defaultProps = {
  addresses: [],
};
CustomerAddressGrid.propTypes = {
  addresses: PropTypes.array,
  newAddress: PropTypes.object,
  deleteCustomerAddress: PropTypes.func.isRequired,
  saveCustomerAddress: PropTypes.func.isRequired,
};
export default CustomerAddressGrid;
