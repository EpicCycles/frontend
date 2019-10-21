import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import EditModelRow from './EditModelRow';
import EditModelPage from './EditModelPage';
const EditModelData = props => {
  const {
    model,
    persistedModel,
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
  } = props;

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
};
EditModelData.propTypes = {
  model: PropTypes.object.isRequired,
  persistedModel: PropTypes.object.isRequired,
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
  modelDelete: PropTypes.func,
  additionalActions: PropTypes.array,
  dummyRow: PropTypes.bool,
  showReadOnlyFields: PropTypes.bool,
};

export default EditModelData;
