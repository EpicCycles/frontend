import EditModel from './EditModel';
import React from 'react';
import { assertComponentHasExpectedProps } from '../../../helpers/jest_helpers/assert';
import { customerFields } from './helpers/fields';
import { updateObject } from '../../../helpers/utils';

describe('EditModel', () => {
  const model = { id: 12 };
  const model2 = { id: 14 };
  const actions = [
    {
      iconName: 'clone',
      iconTitle: 'copy quote',
      iconAction: jest.fn(),
    },
  ];
  it('should render a page view when in page mode', () => {
    const component = shallow(<EditModel model={model} modelFields={[]} pageMode={true} />);
    expect(component.find('EditModelPage')).toHaveLength(1);
    expect(component.find('IconArray')).toHaveLength(0);
    expect(component.find('EditModelRow')).toHaveLength(0);
  });
  it('should render actions when page mode and actions required', () => {
    const component = shallow(
      <EditModel
        actionsRequired={true}
        modelSave={jest.fn()}
        model={model}
        modelFields={[]}
        pageMode={true}
      />,
    );
    expect(component.find('EditModelPage')).toHaveLength(1);
    expect(component.find('EditModelRow')).toHaveLength(0);
  });
  it('should render actions and additional actions when page mode and actions required', () => {
    const component = shallow(
      <EditModel
        actionsRequired={true}
        modelSave={jest.fn()}
        model={model}
        modelFields={[]}
        pageMode={true}
        additionalActions={actions}
      />,
    );
    expect(component.find('EditModelPage')).toHaveLength(1);
    expect(component.find('EditModelRow')).toHaveLength(0);
  });
  it('should render page row when not page mode and pass data for additional actions', () => {
    const component = shallow(
      <EditModel
        actionsRequired={true}
        modelSave={jest.fn()}
        model={model}
        modelFields={[]}
        pageMode={false}
        additionalActions={actions}
      />,
    );
    expect(component.find('EditModelPage')).toHaveLength(0);
    expect(component.find('EditModelRow')).toHaveLength(1);
    assertComponentHasExpectedProps(component.find('EditModelRow'), {
      additionalActions: actions,
      actionsRequired: true,
    });
  });
  describe('update changes', () => {
    it('should reflect a field change when onchange is called for the model', () => {
      const modelWithUpdates = updateObject(model, { first_name: 'Anna' });
      const component = shallow(
        <EditModel
          actionsRequired={true}
          modelSave={jest.fn()}
          model={model}
          modelFields={customerFields}
          pageMode={false}
          additionalActions={actions}
        />,
      );
      component.find('EditModelRow').prop('onChange')('first_name', 'Anna');
      assertComponentHasExpectedProps(component.find('EditModelRow'), {
        model: modelWithUpdates,
        persistedModel: model,
      });
    });
    it('should reset state when the model in props is not the original persisted model', () => {
      const modelWithUpdates = { id: 14, first_name: 'Belinda' };
      const component = shallow(
        <EditModel
          actionsRequired={true}
          modelSave={jest.fn()}
          model={model}
          modelFields={customerFields}
          pageMode={false}
          additionalActions={actions}
        />,
      );
      component.find('EditModelRow').prop('onChange')('first_name', 'Belinda');

      assertComponentHasExpectedProps(component.find('EditModelRow'), {
        model: modelWithUpdates,
        persistedModel: model,
      });
    });
  });
});
