import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { eliminateReadOnlyFields, getModelKey } from './helpers/model';
import EditModelInput from './EditModelInput';
import { fieldAlignment, gridItemClass } from './helpers/display';
import IconArray from '../../../common/IconArray';
import ModelViewRowField from './ModelViewRowField';
import { modelActions } from './helpers/modelActions';

const EditModelRow = props => {
  const {
    model,
    modelFields,
    persistedModel,
    className,
    onChange,
    lockFirstColumn,
    brands,
    bikes,
    sections,
    suppliers,
    users,
    customers,
    frames,
    actionsRequired,
    modelSave,
    modelDelete,
    modelReset,
    additionalActions,
    dummyRow,
    showReadOnlyFields,
  } = props;
  const componentKey = getModelKey(model);
  const fieldsToShow = showReadOnlyFields ? modelFields : eliminateReadOnlyFields(modelFields);
  const allActions = modelActions(model, { modelSave, modelDelete, modelReset }, additionalActions);
  return (
    <Fragment>
      {fieldsToShow.map((field, index) => {
        return (
          <div
            className={gridItemClass(
              `${className} ${fieldAlignment(field)}`,
              index,
              lockFirstColumn,
            )}
            key={`modelRow${field.fieldName}${componentKey}`}
          >
            {!dummyRow && field.readOnly && (
              <ModelViewRowField
                field={field}
                model={model}
                frames={frames}
                bikes={bikes}
                brands={brands}
                sections={sections}
                suppliers={suppliers}
                users={users}
                customers={customers}
              />
            )}
            {!dummyRow && !field.readOnly && (
              <EditModelInput
                field={field}
                model={model}
                persistedModel={persistedModel}
                componentKey={componentKey}
                index={index}
                onChange={onChange}
                brands={brands}
                sections={sections}
                suppliers={suppliers}
              />
            )}
          </div>
        );
      })}
      {actionsRequired && (
        <div
          className={gridItemClass(`${className} align_center`, 1, lockFirstColumn)}
          key={`modelRowActions${componentKey}`}
        >
          {!dummyRow && <IconArray componentKey={componentKey} actionArray={allActions} />}
        </div>
      )}
    </Fragment>
  );
};
EditModelRow.defaultProps = {
  className: '',
};
EditModelRow.propTypes = {
  model: PropTypes.object.isRequired,
  modelFields: PropTypes.array.isRequired,
  persistedModel: PropTypes.object,
  className: PropTypes.string,
  sections: PropTypes.array,
  brands: PropTypes.array,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  suppliers: PropTypes.array,
  users: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  lockFirstColumn: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelReset: PropTypes.func,
  modelDelete: PropTypes.func,
  additionalActions: PropTypes.array,
  dummyRow: PropTypes.bool,
  showReadOnlyFields: PropTypes.bool,
};

export default EditModelRow;
