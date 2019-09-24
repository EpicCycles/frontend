import * as PropTypes from 'prop-types';
import React from 'react';
import { bikeSearchFields } from './helpers/bikeSearch';
import Search from '../search/Search';

const BikeSearch = props => {
  const {
    raiseStateForCriteria,
    brands,
    bikeSearchCriteria,
    getFrameList,
    pageMode,
    canSelectArchived,
  } = props;
  const searchFields = bikeSearchFields(canSelectArchived);
  return (
    <Search
      searchFields={searchFields}
      doSearch={getFrameList}
      searchTitle="Find Bikes"
      pageMode={pageMode}
      brands={brands}
      searchCriteria={bikeSearchCriteria}
      raiseStateForCriteria={raiseStateForCriteria}
    />
  );
};
BikeSearch.defaultProps = {
  brands: [],
  className: '',
};
BikeSearch.propTypes = {
  brands: PropTypes.any,
  bikeSearchCriteria: PropTypes.object,
  className: PropTypes.string,
  canSelectArchived: PropTypes.bool,
  pageMode: PropTypes.bool,
  getFrameList: PropTypes.func.isRequired,
  raiseStateForCriteria: PropTypes.func,
};

export default BikeSearch;
