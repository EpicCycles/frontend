import ModelEditIcons from './ModelEditIcons';

describe('ModelEditIcons tests', () => {
  const model = {
    id: 23,
    model_text: 'model text here',
    customer_visible: true,
  };

  it('shows the buttons when model with id and no changes are present', () => {
    const modelSave = jest.fn();
    const modelDelete = jest.fn();
    const modelReset = jest.fn();

    const input = shallow(
      <ModelEditIcons
        modelSave={modelSave}
        model={model}
        modelDelete={modelDelete}
        modelReset={modelReset}
      />,
    );
    expect(input.find('IconArray')).toHaveLength(1);
  });
});
