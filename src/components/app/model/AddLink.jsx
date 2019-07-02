import React from 'react';
import { Icon } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';

const AddLink = props => (
  <Icon
    key={`add_${props.addObjectName}`}
    data-test="add-icon"
    name="add"
    title={`Add New ${props.addObjectName}`}
    onClick={props.addFunction}
  />
);
AddLink.defaultProps = {
  addObjectName: '',
};
AddLink.propTypes = {
  addFunction: PropTypes.func.isRequired,
  addObjectName: PropTypes.string,
};
export default AddLink;
