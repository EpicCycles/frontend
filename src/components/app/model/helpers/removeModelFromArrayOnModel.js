import { removeItemFromArray, updateObject, updateObjectInArray } from '../../../../helpers/utils';

export const removeModelFromArrayOnModel = (model, modelArrayFieldName, idToRemove) => {
  const updatedModel = updateObject(model);
  const existingObjectArray = updatedModel[modelArrayFieldName];
  updatedModel[modelArrayFieldName] = removeItemFromArray(existingObjectArray, idToRemove);
  return updatedModel;
};
