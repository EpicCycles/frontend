import IconArray from './IconArray';

describe('IconArray', () => {
  it('should disable actions when action is disabled', () => {
    const actionEdit = jest.fn();
    const actionCopy = jest.fn();
    const requiredActions = [
      { iconName: 'edit', iconTitle: 'Edit item', iconDisabled: true, iconAction: actionEdit },
      { iconName: 'copy', iconTitle: 'Copy item', iconDisabled: false, iconAction: actionCopy },
    ];
    const component = shallow(<IconArray componentKey={'test'} actionArray={requiredActions} />);
    expect(component.find('Icon')).toHaveLength(2);
    expect(
      component
        .find('Icon')
        .at(0)
        .prop('disabled'),
    ).toBeTruthy();
    expect(
      component
        .find('Icon')
        .at(0)
        .prop('onClick'),
    ).not.toBeDefined();
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('disabled'),
    ).toBeFalsy();
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('onClick'),
    ).toBe(actionCopy);
    component
      .find('Icon')
      .at(1)
      .prop('onClick')();
    expect(actionCopy).toHaveBeenCalledTimes(1);
  });
  it('should disable all actions when actions are disabled', () => {
    const actionEdit = jest.fn();
    const actionCopy = jest.fn();
    const requiredActions = [
      { iconName: 'edit', iconTitle: 'Edit item', iconDisabled: true, iconAction: actionEdit },
      { iconName: 'copy', iconTitle: 'Copy item', iconDisabled: false, iconAction: actionCopy },
    ];
    const component = shallow(
      <IconArray componentKey={'test'} actionArray={requiredActions} actionsDisabled />,
    );
    expect(component.find('Icon')).toHaveLength(2);
    expect(
      component
        .find('Icon')
        .at(0)
        .prop('disabled'),
    ).toBeTruthy();
    expect(
      component
        .find('Icon')
        .at(0)
        .prop('onClick'),
    ).not.toBeDefined();
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('disabled'),
    ).toBeTruthy();
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('onClick'),
    ).not.toBeDefined();
  });
});
