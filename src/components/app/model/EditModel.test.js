import EditModel from './EditModel';
import React from 'react';
import { assertComponentHasExpectedProps } from '../../../helpers/jest_helpers/assert';

describe('EditModel', () => {
  const model = { id: 12 };
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
});
