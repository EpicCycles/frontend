import FormTextInput from './FormTextInput';

describe('FormTextInput', () => {
  it('renders the form text input correctly', () => {
    const input = shallow(
      <FormTextInput
        id="1234"
        label="Test"
        fieldName="testfield"
        placeholder="Please enter your loyalty number"
        onChange={jest.fn()}
      />,
    );
    expect(toJson(input)).toMatchSnapshot();
  });
  it('renders the form numeric input correctly', () => {
    const input = shallow(
      <FormTextInput
        id="1234"
        label="Test"
        fieldName="testfield"
        placeholder="Please enter your loyalty number"
        onChange={jest.fn()}
        dataType="number"
      />,
    );
    expect(toJson(input)).toMatchSnapshot();
  });

  it('renders an error when present', () => {
    const input = shallow(
      <FormTextInput
        id="5678"
        label="Test"
        fieldName="testfield"
        placeholder="Please enter your loyalty number"
        onChange={jest.fn()}
        error="Incorrect loyalty number"
      />,
    );
    expect(toJson(input)).toMatchSnapshot();
  });

  it('should call onClearEmail when the button is clicked', () => {
    const onChange = jest.fn();
    const value = 'test@johnlewis.co.uk';
    const fieldName = 'email';
    const onClearEmail = jest.fn();
    const input = shallow(
      <FormTextInput
        onClick={onClearEmail}
        fieldName="testfield"
        onChange={onChange}
        value={value}
        fieldName={fieldName}
      />,
    );
    expect(toJson(input)).toMatchSnapshot();
    expect(input.find('#removeemail')).toHaveLength(1);
    input.find('#removeemail').simulate('click');
    expect(onClearEmail.mock.calls).toHaveLength(1);
  });

  it('should call onChange when an input is entered', () => {
    const onChange = jest.fn();
    const value = 'test@johnlewis.co.uk';
    const fieldName = 'email';
    const onClearEmail = jest.fn();
    const input = shallow(
      <FormTextInput
        onClick={onClearEmail}
        fieldName="testfield"
        onChange={onChange}
        value={value}
        fieldName={fieldName}
      />,
    );
    expect(toJson(input)).toMatchSnapshot();
    input.find('input').simulate('change', { target: { value: 1234567890123456 } });
    expect(onChange.mock.calls).toHaveLength(1);
  });
});
