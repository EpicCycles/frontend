import React from 'react';
import * as PropTypes from 'prop-types';
import EditModelRow from './EditModelRow';
import { updateObject } from '../../../helpers/utils';
import { updateModel } from './helpers/model';
import EditModelPage from './EditModelPage';
import { resetEditableFields } from './helpers/resetEditableFields';
const EditModelSimple = props => {
  const handleModelValueChange = (fieldName, input) => {
    const { model, modelFields, raiseState } = props;

    const updatedModel = updateModel(model, modelFields, fieldName, input);
    raiseState(updatedModel);
  };

  const onClickReset = () => {
    let { persistedModel, modelFields, raiseState } = props;
    const model = persistedModel.id
      ? updateObject(persistedModel)
      : resetEditableFields(persistedModel, modelFields);
    raiseState(model);
  };

  const {
    model,
    persistedModel,
    pageMode,
    modelFields,
    className,
    sourceDataArrays,
    lockFirstColumn,
    actionsRequired,
    additionalActions,
    dummyRow,
    showReadOnlyFields,
    modelSave,
    modelDelete,
  } = props;
  if (pageMode)
    return (
      <div>
        <EditModelPage
          model={model}
          persistedModel={persistedModel}
          modelFields={modelFields}
          onChange={handleModelValueChange}
          sourceDataArrays={sourceDataArrays}
          className={className}
          showReadOnlyFields={showReadOnlyFields}
          modelSave={modelSave}
          modelDelete={modelDelete}
          modelReset={onClickReset}
          additionalActions={additionalActions}
          dummyRow={dummyRow}
          actionsRequired={actionsRequired}
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
EditModelSimple.propTypes = {
  model: PropTypes.object.isRequired,
  persistedModel: PropTypes.object.isRequired,
  modelFields: PropTypes.array.isRequired,
  pageMode: PropTypes.bool,
  className: PropTypes.string,
  sourceDataArrays: PropTypes.shape({
    sections: PropTypes.array,
    brands: PropTypes.array,
    bikes: PropTypes.array,
    charges: PropTypes.array,
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
  raiseState: PropTypes.func.isRequired,
  additionalActions: PropTypes.array,
  dummyRow: PropTypes.bool,
  showReadOnlyFields: PropTypes.bool,
};

export default EditModelSimple;
