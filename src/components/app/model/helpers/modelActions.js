import { getModelKey, isModelValid } from './model';
import { doWeHaveObjects } from '../../../../helpers/utils';

export const modelActions = (model, actionFunctions, otherActions) => {
  const { modelSave, modelDelete, modelReset } = actionFunctions;
  const componentKey = getModelKey(model);
  const isValid = isModelValid(model);
  const canReset = model.changed;
  const canDelete = model.id && !model.deleted;
  const canSave = isValid && model.changed;

  const actionArray = [];
  if (modelReset)
    actionArray.push({
      iconName: 'undo',
      iconTitle: 'undo changes',
      iconAction: () => canReset && modelReset(),
      iconDisabled: !canReset,
    });
  if (modelSave)
    actionArray.push({
      iconName: 'check',
      iconTitle: 'save changes',
      iconAction: () => canSave && modelSave(model),
      iconDisabled: !canSave,
    });
  if (modelDelete)
    actionArray.push({
      iconName: 'delete',
      iconTitle: 'delete',
      iconAction: () => canDelete && modelDelete(componentKey),
      iconDisabled: !canDelete,
    });

  if (doWeHaveObjects(otherActions)) return actionArray.concat(otherActions);
  return actionArray;
};
