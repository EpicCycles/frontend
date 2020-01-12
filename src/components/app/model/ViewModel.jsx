import React from 'react';
import * as PropTypes from 'prop-types';
import { getModelKey } from './helpers/model';
import ViewModelBlock from './ViewModelBlock';
import ModelViewRow from './ModelViewRow';
import IconArray from '../../../common/IconArray';
import { gridItemClass } from './helpers/display';
const ViewModel = props => {
  const {
    model,
    pageMode,
    modelFields,
    className,
    sourceDataArrays,
    lockFirstColumn,
    actionsRequired,
    modelActions,
  } = props;
  const componentKey = getModelKey(model);

  if (pageMode)
    return (
      <div>
        <ViewModelBlock
          model={model}
          modelFields={modelFields}
          sourceDataArrays={sourceDataArrays}
          className={className}
        />
        {actionsRequired && (
          <div className="full float_right">
            <IconArray componentKey={componentKey} actionArray={modelActions} />
          </div>
        )}
      </div>
    );
  return (
    <div className="grid-row" key={`modelRow${componentKey}`}>
      <ModelViewRow
        model={model}
        modelFields={modelFields}
        sourceDataArrays={sourceDataArrays}
        className={className}
        lockFirstColumn={lockFirstColumn}
      />
      {actionsRequired && (
        <div
          className={gridItemClass(`${className} align_center`, 1, lockFirstColumn)}
          key={`modelRowActions${componentKey}`}
        >
          <IconArray componentKey={componentKey} actionArray={modelActions} />
        </div>
      )}
    </div>
  );
};
ViewModel.propTypes = {
  model: PropTypes.object.isRequired,
  modelFields: PropTypes.array.isRequired,
  pageMode: PropTypes.bool,
  className: PropTypes.string,
  sourceDataArrays: PropTypes.shape({
    sections: PropTypes.array,
    brands: PropTypes.array,
    bikes: PropTypes.array,
    frames: PropTypes.array,
    suppliers: PropTypes.array,
    customers: PropTypes.array,
    users: PropTypes.array,
    fittings: PropTypes.array,
    charges: PropTypes.array,
  }),
  lockFirstColumn: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelDelete: PropTypes.func,
  modelActions: PropTypes.array,
  showReadOnlyFields: PropTypes.bool,
};

export default ViewModel;
