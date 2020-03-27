import { doWeHaveObjects, updateObject, updateObjectInArray } from '../../../../helpers/utils';
import { getEditedFields } from './getEditedFields';
const getNextIdValue = arrayOfObjects => {
  if (doWeHaveObjects(arrayOfObjects)) {
    const arrayOfIds = arrayOfObjects.map((obj, index) => {
      if (obj.id) return obj.id;
      return index;
    });
    return Math.max(...arrayOfIds) + 1;
  }
  return 1;
};

export const updateModelArrayOnModel = (
  model,
  modelArrayFieldName,
  modelElementFields,
  entryToSave,
) => {
  const updatedModel = updateObject(model);

  const existingObjectArray = updatedModel[modelArrayFieldName];
  const entryToSaveData = updateObject(
    { id: entryToSave.id || getNextIdValue(existingObjectArray) },
    getEditedFields(entryToSave, modelElementFields),
  );

  updatedModel[modelArrayFieldName] = updateObjectInArray(existingObjectArray, entryToSaveData);
  updatedModel.changed = true;
  return updatedModel;
};
