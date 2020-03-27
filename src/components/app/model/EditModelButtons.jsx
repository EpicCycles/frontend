import React from 'react';
import * as PropTypes from 'prop-types';

import { isModelValid } from './helpers/model';

const EditModelButtons = props => {
  const { deleteModel, saveModel, model, resetChanges } = props;
  const canSave = !!model && model.changed && isModelValid(model);
  const canReset = !!model && model.changed;

  return (
    <div className="row">
      {deleteModel && (
        <button onClick={deleteModel} data-test="delete-button">
          Delete
        </button>
      )}
      <button onClick={() => saveModel(model)} disabled={!canSave} data-test="save-button">
        Save changes
      </button>
      <button onClick={resetChanges} disabled={!canReset} data-test="reset-button">
        Reset
      </button>
    </div>
  );
};
EditModelButtons.propTypes = {
  model: PropTypes.object,
  deleteModel: PropTypes.func,
  saveModel: PropTypes.func.isRequired,
  resetChanges: PropTypes.func.isRequired,
};
export default EditModelButtons;
