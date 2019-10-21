import React from 'react';
import { Icon } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';

const ShowOrHide = props => {
  const { componentKey, isShown, detailKey, hideDetail, showDetail } = props;
  return (
    <Icon
      key={componentKey}
      id={componentKey}
      name={`toggle ${isShown ? 'right' : 'down'}`}
      onClick={() => (!!isShown ? hideDetail(detailKey) : showDetail(detailKey))}
    />
  );
};
ShowOrHide.propTypes = {
  componentKey: PropTypes.any.isRequired,
  isShown: PropTypes.bool,
  hideDetail: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
};
export default ShowOrHide;
