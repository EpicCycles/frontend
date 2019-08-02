import ChargesEdit from './ChargesEdit';
import React from 'react';

describe('ChargesEdit', () => {
  it('should show just headers when no charge elements added', () => {
    const component = shallow(
      <ChargesEdit
        saveCharge={jest.fn()}
        addCharge={jest.fn()}
        deleteCharge={jest.fn()}
        charges={[]}
      />,
    );
    expect(component.find('IconArray')).toHaveLength(1);
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(0);
  });
  it('should show all rows when charge elements exist', () => {
    const charges = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <ChargesEdit
        saveCharge={jest.fn()}
        addCharge={jest.fn()}
        deleteCharge={jest.fn()}
        charges={charges}
      />,
    );
    expect(component.find('IconArray')).toHaveLength(1);
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(2);
  });
});
