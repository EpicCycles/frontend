import React from 'react';
import EditModelButtons from './EditModelButtons';
import { findDataTest } from '../../../helpers/jest_helpers/assert';

describe('EditModelButtons', () => {
  it('should render when edit and resent functions are provided', () => {
    const saveFunc = jest.fn();
    const resetFunc = jest.fn();
    const component = shallow(<EditModelButtons saveModel={saveFunc} resetChanges={resetFunc} />);
    expect(findDataTest(component, 'save-button')).toHaveLength(1);
    expect(findDataTest(component, 'save-button').prop('disabled')).toBeTruthy();
    expect(findDataTest(component, 'reset-button')).toHaveLength(1);
    expect(findDataTest(component, 'reset-button').prop('disabled')).toBeTruthy();
    expect(findDataTest(component, 'delete-button')).toHaveLength(0);
  });
  it('should disable save when model has an error', () => {
    const saveFunc = jest.fn();
    const resetFunc = jest.fn();
    const deleteFunc = jest.fn();
    const model = { error: true, changed: true };
    const component = shallow(
      <EditModelButtons
        model={model}
        deleteModel={deleteFunc}
        saveModel={saveFunc}
        resetChanges={resetFunc}
      />,
    );
    expect(findDataTest(component, 'save-button')).toHaveLength(1);
    expect(findDataTest(component, 'save-button').prop('disabled')).toBeTruthy();
    expect(findDataTest(component, 'reset-button')).toHaveLength(1);
    expect(findDataTest(component, 'reset-button').prop('disabled')).toBeFalsy();
    expect(findDataTest(component, 'delete-button')).toHaveLength(1);
  });
  it('should disable reset when model has no changes', () => {
    const saveFunc = jest.fn();
    const resetFunc = jest.fn();
    const deleteFunc = jest.fn();
    const model = { changed: false };
    const component = shallow(
      <EditModelButtons
        model={model}
        deleteModel={deleteFunc}
        saveModel={saveFunc}
        resetChanges={resetFunc}
      />,
    );
    expect(findDataTest(component, 'save-button')).toHaveLength(1);
    expect(findDataTest(component, 'save-button').prop('disabled')).toBeFalsy();
    expect(findDataTest(component, 'reset-button')).toHaveLength(1);
    expect(findDataTest(component, 'reset-button').prop('disabled')).toBeTruthy();
    expect(findDataTest(component, 'delete-button')).toHaveLength(1);
  });
});
