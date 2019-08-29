import React from 'react';
import * as PropTypes from 'prop-types';
import { findObjectWithKey } from '../../../helpers/utils';
import ModelTableHeaderRow from './ModelTableHeaderRow';
import EditModelSimple from './EditModelSimple';
import { getModelKey } from './helpers/model';
import ViewModel from './ViewModel';
import EditModel from './EditModel';
const ModelTable = props => {
  const {
    viewMode,
    modelArray,
    modelFields,
    blockIdentity,
    raiseState,
    actionsRequired,
    updatedModelArray,
    bikes,
    brands,
    customers,
    charges,
    sections,
    suppliers,
    users,
    modelSave,
    modelDelete,
    modelActions,
    lockFirstColumn,
    hideHeaders,
  } = props;
  return (
    <div className="grid-container">
      <div className="grid">
        {!hideHeaders && (
          <ModelTableHeaderRow
            modelFields={modelFields}
            blockIdentity={blockIdentity}
            includeActions={actionsRequired}
            lockFirstColumn={lockFirstColumn}
          />
        )}
        {modelArray.map(modelInstance => {
          const modelInstanceKey = getModelKey(modelInstance);
          const updatedModel = findObjectWithKey(updatedModelArray, modelInstanceKey);
          const rowClass = updatedModel && updatedModel.error ? 'error' : '';
          if (viewMode)
            return (
              <ViewModel
                model={modelInstance}
                modelFields={modelFields}
                actionsRequired={actionsRequired}
                users={users}
                sections={sections}
                brands={brands}
                bikes={bikes}
                charges={charges}
                suppliers={suppliers}
                customers={customers}
                modelSave={modelSave}
                modelDelete={modelDelete}
                additionalActions={modelActions}
                showReadOnlyFields
                lockFirstColumn={lockFirstColumn}
                key={`${blockIdentity}_${modelInstanceKey}`}
                className={hideHeaders ? 'grid-item--borderless' : ''}
              />
            );
          return (
            <div className={`grid-row ${rowClass}`} key={`row${modelInstanceKey}`}>
              {raiseState ? (
                <EditModelSimple
                  model={updatedModel ? updatedModel : modelInstance}
                  persistedModel={modelInstance}
                  modelFields={modelFields}
                  actionsRequired={actionsRequired}
                  users={users}
                  sections={sections}
                  brands={brands}
                  bikes={bikes}
                  charges={charges}
                  suppliers={suppliers}
                  customers={customers}
                  modelSave={modelSave}
                  modelDelete={modelDelete}
                  additionalActions={modelActions}
                  showReadOnlyFields
                  lockFirstColumn={lockFirstColumn}
                  raiseState={raiseState}
                  key={`${blockIdentity}_${modelInstanceKey}`}
                />
              ) : (
                <EditModel
                  model={updatedModel ? updatedModel : modelInstance}
                  persistedModel={modelInstance}
                  modelFields={modelFields}
                  actionsRequired={actionsRequired}
                  users={users}
                  sections={sections}
                  brands={brands}
                  bikes={bikes}
                  charges={charges}
                  suppliers={suppliers}
                  customers={customers}
                  modelSave={modelSave}
                  modelDelete={modelDelete}
                  additionalActions={modelActions}
                  showReadOnlyFields
                  lockFirstColumn={lockFirstColumn}
                  key={`${blockIdentity}_${modelInstanceKey}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
ModelTable.defaultProps = {
  blockIdentity: 'model',
  updatedModelArray: [],
};
ModelTable.propTypes = {
  modelArray: PropTypes.array.isRequired,
  updatedModelArray: PropTypes.array,
  modelFields: PropTypes.array.isRequired,
  viewMode: PropTypes.bool,
  blockIdentity: PropTypes.string,
  className: PropTypes.string,
  sections: PropTypes.array,
  brands: PropTypes.array,
  bikes: PropTypes.array,
  charges: PropTypes.array,
  frames: PropTypes.array,
  suppliers: PropTypes.array,
  customers: PropTypes.array,
  users: PropTypes.array,
  lockFirstColumn: PropTypes.bool,
  actionsRequired: PropTypes.bool,
  modelSave: PropTypes.func,
  modelDelete: PropTypes.func,
  modelActions: PropTypes.array,
  showReadOnlyFields: PropTypes.bool,
  hideHeaders: PropTypes.bool,
  raiseState: PropTypes.func,
};

export default ModelTable;
