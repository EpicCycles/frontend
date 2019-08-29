import ModelTable from './ModelTable';
import React from 'react';

describe('ModelTable', () => {
  it('should show just headers when no model elements added', () => {
    const component = shallow(
      <ModelTable modelSave={jest.fn()} modelDelete={jest.fn()} modelArray={[]} modelFields={[]} />,
    );
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(0);
    expect(component.find('EditModel')).toHaveLength(0);
    expect(component.find('ViewModel')).toHaveLength(0);
  });
  it('should show all rows as Edit Model when model elements exist', () => {
    const models = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <ModelTable
        modelSave={jest.fn()}
        modelDelete={jest.fn()}
        modelArray={models}
        modelFields={[]}
      />,
    );
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(0);
    expect(component.find('EditModel')).toHaveLength(2);
    expect(component.find('ViewModel')).toHaveLength(0);
  });
  it('should not show headers when hide headers set', () => {
    const models = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <ModelTable
        modelSave={jest.fn()}
        modelDelete={jest.fn()}
        modelArray={models}
        modelFields={[]}
        hideHeaders
      />,
    );
    expect(component.find('ModelTableHeaderRow')).toHaveLength(0);
    expect(component.find('EditModelSimple')).toHaveLength(0);
    expect(component.find('EditModel')).toHaveLength(2);
    expect(component.find('ViewModel')).toHaveLength(0);
  });
  it('should show all rows as Edit Model  Simple when model elements exist', () => {
    const models = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <ModelTable
        modelSave={jest.fn()}
        modelDelete={jest.fn()}
        raiseState={jest.fn()}
        modelArray={models}
        modelFields={[]}
      />,
    );
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(2);
    expect(component.find('EditModel')).toHaveLength(0);
    expect(component.find('ViewModel')).toHaveLength(0);
  });
  it('should show all rows as Views when model elements exist', () => {
    const models = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <ModelTable
        modelSave={jest.fn()}
        modelDelete={jest.fn()}
        modelArray={models}
        modelFields={[]}
        viewMode
      />,
    );
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(0);
    expect(component.find('EditModel')).toHaveLength(0);
    expect(component.find('ViewModel')).toHaveLength(2);
  });
});
