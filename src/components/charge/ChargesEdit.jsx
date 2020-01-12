import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

import { findObjectWithKey, updateObjectInArray } from '../../helpers/utils';
import {
  checkForChanges,
  createEmptyModelWithDefaultFields,
  getModelKey,
} from '../app/model/helpers/model';
import { chargeFields } from './helpers/chargeFields';
import IconArray from '../../common/IconArray';
import { NEW_ELEMENT_ID } from '../../helpers/constants';
import EditModelSimple from '../app/model/EditModelSimple';
import ModelTableHeaderRow from '../app/model/ModelTableHeaderRow';
import { Dimmer, Loader } from 'semantic-ui-react';

class ChargesEdit extends PureComponent {
  state = { updatedCharges: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedCharges } = state;
    const { charges } = props;

    const checkedUpdatedCharges = [];
    updatedCharges.forEach(updatedCharge => {
      const persistedDetail = findObjectWithKey(charges, getModelKey(updatedCharge));
      if (persistedDetail && checkForChanges(chargeFields, persistedDetail, updatedCharge))
        checkedUpdatedCharges.push(updatedCharge);
    });

    return {
      updatedCharges: checkedUpdatedCharges,
    };
  }
  raiseStateForCharge = updatedCharge => {
    const { updatedCharges } = this.state;

    const newUpdatedCharges = updateObjectInArray(updatedCharges, updatedCharge);
    this.setState({ updatedCharges: newUpdatedCharges });
  };
  addNewCharge = () => {
    const { addCharge } = this.props;
    addCharge(createEmptyModelWithDefaultFields(chargeFields));
  };
  render() {
    const { updatedCharges } = this.state;
    const { charges, users, saveCharge, deleteCharge, isLoading } = this.props;
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'Add New Charge',
        iconAction: () => this.addNewCharge(),
      },
    ];
    return (
      <div className="grid-container">
        <div className="row">
          <h2>Maintain Charges </h2>
          <IconArray componentKey={NEW_ELEMENT_ID} actionArray={additionalActions} />
        </div>
        <div className="grid">
          <ModelTableHeaderRow modelFields={chargeFields} blockIdentity={'charge'} includeActions />
          {charges.map(charge => {
            const chargeKey = getModelKey(charge);
            const updatedCharge = findObjectWithKey(updatedCharges, chargeKey);
            const rowClass = updatedCharge && updatedCharge.error ? 'error' : '';

            return (
              <div className={`grid-row ${rowClass}`} key={`row${chargeKey}`}>
                <EditModelSimple
                  model={updatedCharge ? updatedCharge : charge}
                  persistedModel={charge}
                  modelFields={chargeFields}
                  actionsRequired
                  sourceDataArrays={{ users }}
                  modelSave={saveCharge}
                  modelDelete={charge['can_be_deleted'] ? deleteCharge : undefined}
                  showReadOnlyFields
                  raiseState={this.raiseStateForCharge}
                />
              </div>
            );
          })}
        </div>
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </div>
    );
  }
}
ChargesEdit.propTypes = {
  charges: PropTypes.array,
  users: PropTypes.array,
  isLoading: PropTypes.bool,
  saveCharge: PropTypes.func.isRequired,
  addCharge: PropTypes.func.isRequired,
  deleteCharge: PropTypes.func.isRequired,
};
export default ChargesEdit;
