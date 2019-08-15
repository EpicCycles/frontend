import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const IconArray = props => {
  const { actionArray, actionsDisabled, componentKey, className } = props;
  return (
    <div className={`row ${className}`}>
      {actionArray.map(action => (
        <Icon
          name={action.iconName}
          title={action.iconTitle}
          className={action.className || ''}
          onClick={!(actionsDisabled || action.iconDisabled) && action.iconAction}
          key={`${action.iconName}-${componentKey}`}
          data-test="model-action"
          disabled={actionsDisabled || action.iconDisabled}
        />
      ))}
    </div>
  );
};
IconArray.defaultProps = {
  actionArray: [],
  className: '',
};
IconArray.propTypes = {
  actionArray: PropTypes.array,
  actionsDisabled: PropTypes.bool,
  className: PropTypes.string,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default IconArray;
