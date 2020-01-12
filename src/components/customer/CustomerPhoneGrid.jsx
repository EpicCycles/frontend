import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { createEmptyModelWithDefaultFields, getModelKey } from '../app/model/helpers/model';
import { customerPhoneFields } from '../app/model/helpers/fields';
import EditModel from '../app/model/EditModel';
import AddLink from '../app/model/AddLink';

class CustomerPhoneGrid extends React.Component {
  addNewPhone = () => {
    const newPhone = createEmptyModelWithDefaultFields(customerPhoneFields);
    newPhone.customer = this.props.customerId;
    this.props.addCustomerPhone(newPhone);
  };

  render() {
    const { phones, users, saveCustomerPhone, deleteCustomerPhone } = this.props;
    return (
      <Fragment>
        <h3>
          Customer Phone
          <AddLink addFunction={this.addNewPhone} addObjectName="Phone" />
        </h3>
        <div key="customerPhoneGrid" className="grid-3">
          {phones.map(phone => {
            return (
              <EditModel
                pageMode
                model={phone}
                modelFields={customerPhoneFields}
                                                  sourceDataArrays={{ users }}
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
        </div>
      </Fragment>
    );
  }
}

CustomerPhoneGrid.defaultProps = {
  phones: [],
};
CustomerPhoneGrid.propTypes = {
  phones: PropTypes.array,
  users: PropTypes.array,
  deleteCustomerPhone: PropTypes.func.isRequired,
  saveCustomerPhone: PropTypes.func.isRequired,
  addCustomerPhone: PropTypes.func.isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default CustomerPhoneGrid;
