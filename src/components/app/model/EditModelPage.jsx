import React from 'react';

import * as PropTypes from 'prop-types';
import { eliminateReadOnlyFields, getModelKey, justReadOnlyFields } from './helpers/model';
import EditModelPageRow from './EditModelPageRow';
import ViewModelFieldRow from './ViewModelFieldRow';
import NonFieldErrors from './NonFieldErrors';
import { isItAnObject } from '../../../helpers/utils';
import { modelActions } from './helpers/modelActions';
import IconArray from '../../../common/IconArray';

const EditModelPage = props => {
  const {
    model,
    modelFields,
    persistedModel,
    users,
    className = '',
    sections,
    brands,
    suppliers,
    bikes,
    frames,
    customers,
    onChange,
    showReadOnlyFields,
    actionsRequired,
    modelSave,
    modelDelete,
    modelReset,
    additionalActions,
  } = props;
  const componentKey = getModelKey(model);
  const allActions = modelActions(model, { modelSave, modelDelete, modelReset }, additionalActions);
  return (
    <div className="grid-container">
      {model.error && <div className="red">{model.error}</div>}

      <div key="modelFields" className={`grid ${className}`}>
        {eliminateReadOnlyFields(modelFields).map(field => (
          <EditModelPageRow
            key={`EditModelPageRow${field.fieldName}`}
            field={field}
            model={model}
            persistedModel={persistedModel}
            componentKey={componentKey}
            onChange={onChange}
            sections={sections}
            brands={brands}
            suppliers={suppliers}
            data-test="field-to-edit"
          />
        ))}
        {showReadOnlyFields &&
          justReadOnlyFields(modelFields).map(field => (
            <ViewModelFieldRow
              key={`EditModelPageRow${field.fieldName}`}
              field={field}
              model={persistedModel}
              componentKey={componentKey}
              sections={sections}
              brands={brands}
              bikes={bikes}
              frames={frames}
              customers={customers}
              suppliers={suppliers}
              users={users}
              data-test="field-to-view"
            />
          ))}
        {isItAnObject(model.error_detail) && (
          <NonFieldErrors
            componentKey={componentKey}
            error_detail={model.error_detail}
            data-test="show-error-detail"
          />
        )}
        {actionsRequired && (
          <div className="full align_right">
            <IconArray componentKey={componentKey} actionArray={allActions} />
          </div>
        )}
      </div>
    </div>
  );
};

EditModelPage.defaultProps = {
  model: {},
  className: 'fit-content',
};

EditModelPage.propTypes = {
  model: PropTypes.object,
  modelFields: PropTypes.array.isRequired,
  persistedModel: PropTypes.object,
  className: PropTypes.string,
  sections: PropTypes.array,
  brands: PropTypes.array,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  suppliers: PropTypes.array,
  customers: PropTypes.array,
  users: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  showReadOnlyFields: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelReset: PropTypes.func,
  modelDelete: PropTypes.func,
  additionalActions: PropTypes.array,
};
export default EditModelPage;
