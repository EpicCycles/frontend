/**
 * buildModelActions - builds actions for the current model (use to build additional actions)
 * @param requiredActions - array of objects {iconName, iconTitle, requiresIdOnly, actionFunction}
 * @param model - model being displayed oredited
 * @returns array of model actions specific to current model
 */
export const buildModelActions = (requiredActions, model) => {
  return requiredActions.map(action => {
    const finalAction = {
      iconName: action.iconName,
      iconTitle: action.iconTitle,
    };
    const isSavedModel = model && model.id;
    if (action.requiresIdOnly) {
      finalAction.iconAction = () => isSavedModel && action.actionFunction(model.id);
    } else {
      finalAction.iconAction = () => isSavedModel && action.actionFunction(model);
    }
    finalAction.iconDisabled = !isSavedModel;
    return finalAction;
  });
};
