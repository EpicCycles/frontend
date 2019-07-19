import React from 'react';
import * as PropTypes from 'prop-types';

import { updateObject } from '../../helpers/utils';
import { addFieldToState } from '../app/model/helpers/model';
import { bikeFields } from '../app/model/helpers/fields';
import EditModelPage from '../app/model/EditModelPage';
import { bikeFullName } from './helpers/bike';

class BikeEdit extends React.Component {
  state = {};

  componentWillMount() {
    this.setState(this.deriveStateFromProps());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bike.id !== this.props.bike.id) this.setState(this.deriveStateFromProps());
  }

  deriveStateFromProps = () => {
    let newState = updateObject(this.props.bike);
    newState.changed = false;
    newState.error = '';
    newState.error_detail = {};
    return newState;
  };
  handleInputChange = (fieldName, input) => {
    let newState = addFieldToState(this.state, bikeFields, fieldName, input);
    this.setState(newState);
  };

  onClickReset = () => {
    this.setState(this.deriveStateFromProps());
  };

  saveOrCreateBike = () => {
    this.props.saveBike(this.state);
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  };
  deleteOrRemoveBike = () => {
    if (this.state.id) {
      this.props.deleteBikes([this.state.id]);
    }
    this.setState({});
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  };

  render() {
    const { bike, brands, frames, addPart } = this.props;
    const additionalActions = [];
    if (addPart)
      additionalActions.push({ iconName: 'add', iconTitle: 'add part', iconAction: addPart });
    return (
      <div>
        <h3>{bikeFullName(bike, frames, brands)}</h3>
        <EditModelPage
          model={this.state}
          modelFields={bikeFields}
          onChange={this.handleInputChange}
          persistedModel={bike}
          data-test="edit-bike"
          actionsRequired
          showReadOnlyFields
          modelSave={this.saveOrCreateBike}
          modelDelete={this.deleteOrRemoveBike}
          modelReset={this.onClickReset}
          additionalActions={additionalActions}
        />
      </div>
    );
  }
}

BikeEdit.propTypes = {
  bike: PropTypes.object.isRequired,
  brands: PropTypes.array.isRequired,
  frames: PropTypes.array.isRequired,
  saveBike: PropTypes.func.isRequired,
  addPart: PropTypes.func,
  deleteBikes: PropTypes.func.isRequired,
};
export default BikeEdit;
