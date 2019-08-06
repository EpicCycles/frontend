import ViewModel from './ViewModel';
import { customerFields } from './helpers/fields';
import React from 'react';

describe('ViewModel', () => {
  it('should show a model page when page mode is true', () => {
    const component = shallow(<ViewModel model={{}} modelFields={customerFields} pageMode />);
    expect(component.find('ViewModelBlock')).toHaveLength(1);
    expect(component.find('IconArray')).toHaveLength(0);
    expect(component.find('ModelViewRow')).toHaveLength(0);
  });
  it('should show a model row when page mode is not true', () => {
    const component = shallow(<ViewModel model={{}} modelFields={customerFields} />);
    expect(component.find('ViewModelBlock')).toHaveLength(0);
    expect(component.find('IconArray')).toHaveLength(0);
    expect(component.find('ModelViewRow')).toHaveLength(1);
  });
  it('should show a model page with actions when page mode and actions required', () => {
    const component = shallow(
      <ViewModel model={{}} modelFields={customerFields} pageMode actionsRequired />,
    );
    expect(component.find('ViewModelBlock')).toHaveLength(1);
    expect(component.find('IconArray')).toHaveLength(1);
    expect(component.find('ModelViewRow')).toHaveLength(0);
  });
  it('should show a model row and actions when actions required', () => {
    const component = shallow(
      <ViewModel model={{}} modelFields={customerFields} actionsRequired />,
    );
    expect(component.find('ViewModelBlock')).toHaveLength(0);
    expect(component.find('IconArray')).toHaveLength(1);
    expect(component.find('ModelViewRow')).toHaveLength(1);
  });
});
