import React from 'react';
import * as PropTypes from 'prop-types';

import { updateObject } from '../../helpers/utils';
import { addFieldToState, isModelValid } from '../app/model/helpers/model';
import { bikeFields } from '../app/model/helpers/fields';
import { Icon } from 'semantic-ui-react';
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
    const { changed } = this.state;
    const isValid = isModelValid(this.state);

    return (
      <div>
        <h3>{bikeFullName(bike, frames, brands)}</h3>
        <EditModelPage
          model={this.state}
          modelFields={bikeFields}
          onChange={this.handleInputChange}
          persistedModel={bike}
        />
        <div style={{ textAlign: 'right' }}>
          {changed && (
            <Icon
              id={`reset-bike`}
              name="undo"
              onClick={this.onClickReset}
              title="Reset Bike details"
              data-test="reset-bike"
            />
          )}
          {changed && isValid && (
            <Icon
              id={`accept-bike`}
              name="check"
              onClick={this.saveOrCreateBike}
              title="Confirm Bike Change"
              data-test="save-bike"
            />
          )}
          <Icon
            id={`delete-bike`}
            name="trash"
            onClick={this.deleteOrRemoveBike}
            title="Delete Bike"
            data-test="delete-bike"
          />
          {addPart && (
            <Icon
              id={`add-part`}
              name="add"
              onClick={() => addPart()}
              title="Add part to bike"
              data-test="add-bike-part"
            />
          )}
        </div>
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
