import EditModelSimple from './EditModelSimple';
import React from 'react';
import { customerFields } from './helpers/fields';

describe('EditModelSimple', () => {
  const model = { id: 12, first_name: 'Fred', last_name: 'Bloggs' };
  const persistedModel = { id: 12 };

  describe('page mode', () => {
    it('should show the edit page view when page mode is true', () => {
      const component = shallow(
        <EditModelSimple
          model={model}
          persistedModel={persistedModel}
          modelFields={customerFields}
          raiseState={jest.fn()}
          pageMode
        />,
      );
      expect(component.find('EditModelPage')).toHaveLength(1);
      expect(component.find('EditModelRow')).toHaveLength(0);
    });
    it('should apply a change and raise state when the action is invoked', () => {
      const raiseState = jest.fn();
      const component = shallow(
        <EditModelSimple
          model={model}
          persistedModel={persistedModel}
          modelFields={customerFields}
          raiseState={raiseState}
          pageMode
        />,
      );
      component.find('EditModelPage').prop('onChange')('first_name', 'Anna');
      expect(raiseState).toHaveBeenCalledTimes(1);
      expect(raiseState).toHaveBeenCalledWith({
        id: 12,
        first_name: 'Anna',
        last_name: 'Bloggs',
        changed: true,
        error_detail: {},
      });
    });
    it('should call raise state with persisted model when reset is invoked', () => {
      const raiseState = jest.fn();
      const component = shallow(
        <EditModelSimple
          model={model}
          persistedModel={persistedModel}
          modelFields={customerFields}
          raiseState={raiseState}
          pageMode
        />,
      );
      component.find('EditModelPage').prop('modelReset')();
      expect(raiseState).toHaveBeenCalledTimes(1);
      expect(raiseState).toHaveBeenCalledWith(persistedModel);
    });
  });
  describe('row mode', () => {
    it('should show the edit row view when page mode is not true', () => {
      const component = shallow(
        <EditModelSimple
          model={model}
          persistedModel={persistedModel}
          modelFields={customerFields}
          raiseState={jest.fn()}
        />,
      );
      expect(component.find('EditModelPage')).toHaveLength(0);
      expect(component.find('EditModelRow')).toHaveLength(1);
    });
    it('should apply a change and raise state when the action is invoked for a row', () => {
      const raiseState = jest.fn();
      const component = shallow(
        <EditModelSimple
          model={model}
          persistedModel={persistedModel}
          modelFields={customerFields}
          raiseState={raiseState}
        />,
      );
      component.find('EditModelRow').prop('onChange')('first_name', 'Anna');
      expect(raiseState).toHaveBeenCalledTimes(1);
      expect(raiseState).toHaveBeenCalledWith({
        id: 12,
        first_name: 'Anna',
        last_name: 'Bloggs',
        changed: true,
        error_detail: {},
      });
    });
    it('should call raise state with persisted model when reset is invoked for a row', () => {
      const raiseState = jest.fn();
      const component = shallow(
        <EditModelSimple
          model={model}
          persistedModel={persistedModel}
          modelFields={customerFields}
          raiseState={raiseState}
        />,
      );
      component.find('EditModelRow').prop('modelReset')();
      expect(raiseState).toHaveBeenCalledTimes(1);
      expect(raiseState).toHaveBeenCalledWith(persistedModel);
    });
  });
});
