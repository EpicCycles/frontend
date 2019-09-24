/* eslint-disable react/destructuring-assignment */
import React from 'react';
import * as PropTypes from 'prop-types';
import { checkForChanges, isModelValid } from '../app/model/helpers/model';
import EditModelSimple from '../app/model/EditModelSimple';
import SearchButton from '../../common/SearchButton';

class Search extends React.Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    let { updatedSearchCriteria } = state;
    const { searchCriteria, searchFields } = props;

    if (
      updatedSearchCriteria &&
      !checkForChanges(searchFields, searchCriteria, updatedSearchCriteria)
    ) {
      updatedSearchCriteria.changed = false;
    }
    return { updatedSearchCriteria };
  }

  raiseStateForSearchCriteria = updatedSearchCriteria => {
    this.setState({ updatedSearchCriteria: updatedSearchCriteria });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  onSubmit = event => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const { updatedSearchCriteria } = this.state;
    if (updatedSearchCriteria && isModelValid(updatedSearchCriteria))
      this.props.doSearch(updatedSearchCriteria);
  };

  render() {
    let { updatedSearchCriteria } = this.state;
    const { searchCriteria, searchFields, pageMode, searchTitle, isLoading } = this.props;
    const searchCriteriaValid =
      !isLoading &&
      updatedSearchCriteria &&
      isModelValid(updatedSearchCriteria) &&
      updatedSearchCriteria.changed;
    return (
      <form
        onSubmit={this.onSubmit}
        data-test="search-form"
        onKeyPress={searchCriteriaValid ? this.handleKeyPress : undefined}
        className="fit-block"
      >
        <EditModelSimple
          model={updatedSearchCriteria ? updatedSearchCriteria : searchCriteria}
          persistedModel={searchCriteria}
          modelFields={searchFields}
          pageMode={pageMode}
          raiseState={this.raiseStateForSearchCriteria}
          key={`changeSearchCriteria`}
          data-test="change-criteria"
        />
        <SearchButton onClick={this.onSubmit} disabled={!searchCriteriaValid} title={searchTitle} />
      </form>
    );
  }
}

Search.defaultProps = {
  searchCriteria: {},
  searchTitle: '',
};
Search.propTypes = {
  isLoading: PropTypes.bool,
  pageMode: PropTypes.bool,
  searchCriteria: PropTypes.object,
  searchFields: PropTypes.array.isRequired,
  doSearch: PropTypes.func.isRequired,
  searchTitle: PropTypes.string,
};
export default Search;
