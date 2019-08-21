import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import EditModelRow from './EditModelRow';
import { updateObject } from '../../../helpers/utils';
import { updateModel } from './helpers/model';
import EditModelPage from './EditModelPage';
import { resetEditableFields } from './helpers/resetEditableFields';
class EditModelSimple extends PureComponent {
  handleModelValueChange = (fieldName, input) => {
    const { model, modelFields, raiseState } = this.props;

    const updatedModel = updateModel(model, modelFields, fieldName, input);
    raiseState(updatedModel);
  };

  onClickReset = () => {
    let { persistedModel, modelFields, raiseState } = this.props;
    const model = persistedModel.id
      ? updateObject(persistedModel)
      : resetEditableFields(persistedModel, modelFields);
    raiseState(model);
  };

  render() {
    const {
      model,
      persistedModel,
      pageMode,
      modelFields,
      className,
      sections,
      charges,
      brands,
      bikes,
      frames,
      suppliers,
      customers,
      users,
      lockFirstColumn,
      actionsRequired,
      additionalActions,
      dummyRow,
      showReadOnlyFields,
      modelSave,
      modelDelete,
    } = this.props;

    if (pageMode)
      return (
        <div>
          <EditModelPage
            model={model}
            persistedModel={persistedModel}
            modelFields={modelFields}
            onChange={this.handleModelValueChange}
            brands={brands}
            bikes={bikes}
            frames={frames}
            customers={customers}
            users={users}
            sections={sections}
            charges={charges}
            suppliers={suppliers}
            className={className}
            showReadOnlyFields={showReadOnlyFields}
            modelSave={modelSave}
            modelDelete={modelDelete}
            modelReset={this.onClickReset}
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
        onChange={this.handleModelValueChange}
        brands={brands}
        bikes={bikes}
        frames={frames}
        customers={customers}
        users={users}
        sections={sections}
        charges={charges}
        suppliers={suppliers}
        className={className}
        showReadOnlyFields={showReadOnlyFields}
        lockFirstColumn={lockFirstColumn}
        modelSave={modelSave}
        modelDelete={modelDelete}
        modelReset={this.onClickReset}
        additionalActions={additionalActions}
        dummyRow={dummyRow}
        actionsRequired={actionsRequired}
      />
    );
  }
}
EditModelSimple.propTypes = {
  model: PropTypes.object.isRequired,
  persistedModel: PropTypes.object.isRequired,
  modelFields: PropTypes.array.isRequired,
  pageMode: PropTypes.bool,
  className: PropTypes.string,
  sections: PropTypes.array,
  charges: PropTypes.array,
  brands: PropTypes.array,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  suppliers: PropTypes.array,
  customers: PropTypes.array,
  users: PropTypes.array,
  lockFirstColumn: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelDelete: PropTypes.func,
  raiseState: PropTypes.func,
  additionalActions: PropTypes.array,
  dummyRow: PropTypes.bool,
  showReadOnlyFields: PropTypes.bool,
};

export default EditModelSimple;
