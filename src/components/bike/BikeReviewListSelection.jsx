import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import BikeSearch from './BikeSearch';

const BikeReviewListSelection = props => {
  return (
    <Fragment>
      <h2 data-test="bike-review-heading">Get Frames to Review</h2>
      <BikeSearch
        brands={props.brands}
        getFrameList={props.getFrameList}
        canSelectArchived
        pageMode
        data-test="bike-search"
      />
    </Fragment>
  );
};

BikeReviewListSelection.propTypes = {
  brands: PropTypes.any,
  onChange: PropTypes.func,
  brand: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  frameName: PropTypes.string,
  archived: PropTypes.bool,
  getFrameList: PropTypes.func,
};

export default BikeReviewListSelection;
