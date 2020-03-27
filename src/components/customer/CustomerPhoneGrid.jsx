import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { getModelKey } from '../app/model/helpers/model';
import { customerPhoneFields } from '../app/model/helpers/fields';
import EditModel from '../app/model/EditModel';

const CustomerPhoneGrid = props => {
  const { newPhone, phoneNumbers, saveCustomerPhone, deleteCustomerPhone } = props;
  return (
    <Fragment>
      <h3>Customer Phone</h3>
      <div key="customerPhoneGrid" className="grid-3">
        {phoneNumbers.map(phone => {
          return (
            <EditModel
              pageMode
              model={phone}
              modelFields={customerPhoneFields}
              actionsRequired
              modelDelete={deleteCustomerPhone}
              key={`editPhone${getModelKey(phone)}`}
              modelSave={saveCustomerPhone}
              showReadOnlyFields
              data-test="existing-phone"
              className="fit-content"
            />
          );
        })}
        {newPhone && (
          <EditModel
            pageMode
            model={newPhone}
            modelFields={customerPhoneFields}
            actionsRequired
            modelDelete={deleteCustomerPhone}
            key={`newPhone${getModelKey(newPhone)}`}
            modelSave={saveCustomerPhone}
            showReadOnlyFields
            data-test="new-phone"
            className="fit-content"
          />
        )}
      </div>
    </Fragment>
  );
};

CustomerPhoneGrid.defaultProps = {
  phoneNumbers: [],
};
CustomerPhoneGrid.propTypes = {
  newPhone: PropTypes.object,
  phoneNumbers: PropTypes.array,
  deleteCustomerPhone: PropTypes.func.isRequired,
  saveCustomerPhone: PropTypes.func.isRequired,
};
export default CustomerPhoneGrid;
