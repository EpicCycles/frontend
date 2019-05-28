import React from 'react';
import * as PropTypes from 'prop-types';
import Search from './Search';
import SearchButton from './SearchButton';

const SearchBlock = props => {
  const {
    searchFields,
    searchCriteria,
    onChange,
    displayRow,
    searchFnc,
    searchCriteriaValid,
    searchTitle,
  } = props;
  const blockClassName = displayRow ? 'row' : 'flex-vertical';
  return searchFields.map(field => (
    <div className={blockClassName}>
      <Search searchFields={searchFields} searchCriteria={searchCriteria} onChange={onChange} />
      <SearchButton onClick={searchFnc} disabled={!searchCriteriaValid} title={searchTitle} />
    </div>
  ));
};
SearchBlock.defaultProps = {
  searchCriteria: {},
  searchTitle: 'Search',
};
SearchBlock.propTypes = {
  searchFields: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  searchFnc: PropTypes.func.isRequired,
  searchTitle: PropTypes.string.isRequired,
  searchCriteria: PropTypes.object,
  displayRow: PropTypes.bool,
  searchCriteriaValid: PropTypes.bool,
};
export default SearchBlock;
