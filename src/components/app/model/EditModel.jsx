import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import EditModelRow from './EditModelRow';
import { updateObject } from '../../../helpers/utils';
import { checkForChangesAllFields, getModelKey, updateModel } from './helpers/model';
import EditModelPage from './EditModelPage';
import IconArray from '../../../common/IconArray';
import { modelActions } from './helpers/modelActions';
class EditModel extends Component {
  state = {
    model: updateObject(this.props.model),
    persistedModel: this.props.model,
  };
  static getDerivedStateFromProps(props, state) {
    // Any time the current model changes,
    // Reset any parts of state that are tied to that model.
    if (checkForChangesAllFields(props.modelFields, props.model, state.persistedModel)) {
      return {
        model: updateObject(props.model),
        persistedModel: props.model,
      };
    }
    return null;
  }
  handleModelValueChange = (fieldName, input) => {
    let { model } = this.state;
    let { modelFields } = this.props;

    model = updateModel(model, modelFields, fieldName, input);
    this.setState({ model });
  };

  onClickReset = () => {
    const { persistedModel } = this.state;
    const model = updateObject(persistedModel);
    this.setState({ model });
  };

  render() {
    const { model, persistedModel } = this.state;
    const componentKey = getModelKey(model);
    const {
      pageMode,
      modelFields,
      className,
      sections,
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
    const allActions = modelActions(
      model,
      { modelSave, modelDelete, modelReset: this.onClickReset },
      additionalActions,
    );
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
            suppliers={suppliers}
            className={className}
            showReadOnlyFields={showReadOnlyFields}
          />
          {actionsRequired && (
            <div className="full align_right">
              {allActions && allActions.length > 0 && (
                <IconArray componentKey={componentKey} actionArray={allActions} />
              )}
            </div>
          )}
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
        suppliers={suppliers}
        className={className}
        showReadOnlyFields={showReadOnlyFields}
        lockFirstColumn={lockFirstColumn}
        modelSave={modelSave}
        modelDelete={modelDelete}
        modelReset={this.onClickReset}
        additionalActions={additionalActions}
        dummyRow={dummyRow}
      />
    );
  }
}
EditModel.propTypes = {
  model: PropTypes.object.isRequired,
  modelFields: PropTypes.array.isRequired,
  pageMode: PropTypes.bool,
  className: PropTypes.string,
  sections: PropTypes.array,
  brands: PropTypes.array,
  bikes: PropTypes.array,
  frames: PropTypes.array,
  suppliers: PropTypes.array,
  customers: PropTypes.array,
  users: PropTypes.array,
  lockFirstColumn: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelReset: PropTypes.func,
  modelDelete: PropTypes.func,
  additionalActions: PropTypes.array,
  dummyRow: PropTypes.bool,
  showReadOnlyFields: PropTypes.bool,
};

export default EditModel;
