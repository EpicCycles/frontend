import Questions from './Questions';

describe('Questions', () => {
  it('should show just headers when no charge elements added', () => {
    const component = shallow(
      <Questions
        saveCharge={jest.fn()}
        addCharge={jest.fn()}
        deleteCharge={jest.fn()}
        questions={[]}
      />,
    );
    expect(component.find('IconArray')).toHaveLength(1);
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(0);
  });
  it('should show all rows when charge elements exist', () => {
    const questions = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <Questions
        saveCharge={jest.fn()}
        addCharge={jest.fn()}
        deleteCharge={jest.fn()}
        questions={questions}
      />,
    );
    expect(component.find('IconArray')).toHaveLength(1);
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('EditModelSimple')).toHaveLength(2);
  });
});
