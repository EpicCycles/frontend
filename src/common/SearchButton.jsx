import React from 'react';
import { Icon } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';

const SearchButton = props => {
  const { disabled, onClick, title, className } = props;
  return (
    <div className="full align_right">
      <Icon
        name="search"
        disabled={disabled}
        onClick={() => !disabled && onClick()}
        title={title}
        data-test="find-button"
        className={className}
      />
    </div>
  );
};

SearchButton.defaultProps = {
  disabled: false,
  title: 'Run search',
  className: '',
};
SearchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default SearchButton;
