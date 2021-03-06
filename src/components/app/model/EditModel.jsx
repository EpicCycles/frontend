import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import EditModelRow from './EditModelRow';
import { updateObject } from '../../../helpers/utils';
import { checkForChangesAllFields, updateModel } from './helpers/model';
import EditModelPage from './EditModelPage';
import { resetEditableFields } from './helpers/resetEditableFields';

const EditModel = props => {
  const [model, setModel] = useState(updateObject(props.model));
  const [persistedModel, setPersistedModel] = useState(props.model);

  useEffect(() => {
    // Any time the current model changes,
    // Reset any parts of state that are tied to that model.
    if (!checkForChangesAllFields(props.modelFields, props.model, persistedModel)) {
      setModel(updateObject(props.model));
      setPersistedModel(props.model);
    }
  }, [props.model, props.modelFields, persistedModel]);

  const handleModelValueChange = (fieldName, input) => {
    let { modelFields } = props;

    const updatedModel = updateModel(model, modelFields, fieldName, input);
    setModel(updatedModel);
  };

  const onClickReset = () => {
    let { modelFields } = props;
    const resetModel = persistedModel.id
      ? updateObject(persistedModel)
      : resetEditableFields(persistedModel, modelFields);
    setModel(resetModel);
  };

  const {
    pageMode,
    modelFields,
    className,
    lockFirstColumn,
    actionsRequired,
    additionalActions,
    dummyRow,
    showReadOnlyFields,
    modelSave,
    modelDelete,
    sourceDataArrays,
  } = props;

  if (pageMode)
    return (
      <div>
        <EditModelPage
          model={model}
          persistedModel={persistedModel}
          modelFields={modelFields}
          onChange={handleModelValueChange}
          className={className}
          showReadOnlyFields={showReadOnlyFields}
          modelSave={modelSave}
          modelDelete={modelDelete}
          modelReset={onClickReset}
          additionalActions={additionalActions}
          dummyRow={dummyRow}
          actionsRequired={actionsRequired}
          sourceDataArrays={sourceDataArrays}
        />
      </div>
    );
  return (
    <EditModelRow
      model={model}
      persistedModel={persistedModel}
      modelFields={modelFields}
      onChange={handleModelValueChange}
      sourceDataArrays={sourceDataArrays}
      className={className}
      showReadOnlyFields={showReadOnlyFields}
      lockFirstColumn={lockFirstColumn}
      modelSave={modelSave}
      modelDelete={modelDelete}
      modelReset={onClickReset}
      additionalActions={additionalActions}
      dummyRow={dummyRow}
      actionsRequired={actionsRequired}
    />
  );
};
EditModel.propTypes = {
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
  }),
  lockFirstColumn: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelDelete: PropTypes.func,
  additionalActions: PropTypes.array,
  dummyRow: PropTypes.bool,
  showReadOnlyFields: PropTypes.bool,
};

export default EditModel;
