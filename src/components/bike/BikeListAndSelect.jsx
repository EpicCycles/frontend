import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';

import SelectInput from '../../common/SelectInput';
import { getModelKey } from '../app/model/helpers/model';
import { bikeFullName } from './helpers/bike';
import BikeSearch from './BikeSearch';

class BikeListAndSelect extends React.Component {

  render() {
    const {
      className,
      brands,
      onChange,
      bikeSearchCriteria,
      canSelectArchived,
      bikes,
      frames,
      selectedBike,
      getFrameList,
      raiseStateForCriteria,
    } = this.props;
    const bikeOptions = bikes.map(bike => {
      return {
        value: getModelKey(bike).toString(),
        name: bikeFullName(bike, frames, brands),
      };
    });

    return (
      <Fragment>
        <h2 data-test="list-and-search-heading">Select Bike</h2>
        <div className={className}>
          <BikeSearch
            getFrameList={getFrameList}
            brands={brands}
            bikeSearchCriteria={bikeSearchCriteria}
            canSelectArchived={canSelectArchived}
            data-test="bikes-search"
            pageMode
            raiseStateForCriteria={raiseStateForCriteria}
          />
          {bikeOptions.length > 0 ? (
            <SelectInput
              fieldName="selectedBike"
              onChange={onChange}
              options={bikeOptions}
              title={'Select Bike'}
              label={'Select Bike'}
              value={selectedBike.toString()}
              data-test="bikes-select"
              isEmptyAllowed={true}
            />
          ) : (
            <div data-test="start-message">No bikes to show, set new criteria and search, or</div>
          )}
        </div>
      </Fragment>
    );
  }
}
BikeListAndSelect.defaultProps = {
  brands: [],
  bikes: [],
  frames: [],
  className: 'row',
  selectedBike: '',
  bikeSearchCriteria: {},
};
BikeListAndSelect.propTypes = {
  brands: PropTypes.array,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  canSelectArchived: PropTypes.bool,
  bikeSearchCriteria: PropTypes.object,
  getFrameList: PropTypes.func.isRequired,
  selectedBike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
export default BikeListAndSelect;
