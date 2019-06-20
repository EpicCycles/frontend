import React from 'react';
import * as PropTypes from 'prop-types';

import { NEW_ELEMENT_ID } from '../../../helpers/constants';
import { modelActions } from './helpers/modelActions';
import IconArray from '../../../common/IconArray';

const ModelEditIcons = props => {
  const { model, componentKey, modelSave, modelDelete, modelReset } = props;
  const modelEditActions = modelActions(model, { modelSave, modelDelete, modelReset });
  return <IconArray componentKey={componentKey} actionArray={modelEditActions} />;
};

ModelEditIcons.defaultProps = {
  model: {},
  componentKey: NEW_ELEMENT_ID,
};
ModelEditIcons.propTypes = {
  modelSave: PropTypes.func,
  modelReset: PropTypes.func,
  modelDelete: PropTypes.func,
  model: PropTypes.object,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ModelEditIcons;
