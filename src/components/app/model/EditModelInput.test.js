import React from 'react';
import toJson from 'enzyme-to-json';
import {
  BRAND,
  CHECKBOX,
  COUNTRY,
  CURRENCY,
  EMAIL,
  PART_TYPE,
  SUPPLIER,
  TEXT,
  TEXT_AREA,
} from './helpers/fields';
import EditModelInput from './EditModelInput';
import {
  assertComponentHasExpectedProps,
  findDataTest,
} from '../../../helpers/jest_helpers/assert';
import { CHARGE } from '../../quoteCharge/helpers/quoteChargeFields';
import { FITTING } from '../../quote/helpers/quoteFields';

const foundName = 'find me';
const sections = [
  {
    id: 1,
    partTypes: [
      { id: 11, name: 'id 11' },
      { id: 21, name: 'id 11' },
    ],
  },
  {
    id: 2,
    partTypes: [
      { id: 2, name: foundName },
      { id: 22, name: 'id 11' },
    ],
  },
];
const brands = [
  { id: 1, brand_name: 'id is 1' },
  { id: 2, brand_name: foundName },
  { id: 3, brand_name: 'id is 3' },
];
const suppliers = [
  { id: 1, supplier_name: 'id is 1' },
  { id: 2, supplier_name: foundName },
  { id: 3, supplier_name: 'id is 3' },
];
const emptyModel = {};
const componentKey = 12;
describe('EditModelInput', () => {
  it('should render a field disabled when required', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
      disabled: true,
    };
    const model = { data_field: 23.9 };
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        componentKey={componentKey}
        index={0}
        onChange={jest.fn()}
      />,
    );
    assertComponentHasExpectedProps(component.find('FormTextInput'), {
      disabled: true,
    });
  });
  it('should render a field disabled when readOnyFunction is satisfied', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
      disabled: true,
      readOnlyFunction: model => {
        !model.nameField;
      },
    };
    const model = { data_field: 23.9 };
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        componentKey={componentKey}
        index={0}
        onChange={jest.fn()}
      />,
    );
    assertComponentHasExpectedProps(component.find('FormTextInput'), {
      disabled: true,
    });
  });
  it('should not render a field disabled when readOnyFunction is not satisfied', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
      disabled: true,
      readOnlyFunction: model => {
        !model.nameField;
      },
    };
    const model = { data_field: 23.9, nameField: 'present' };
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        componentKey={componentKey}
        index={0}
        onChange={jest.fn()}
      />,
    );
    assertComponentHasExpectedProps(component.find('FormTextInput'), {
      disabled: false,
    });
  });
  it('should render a field disabled when model is deleted', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
    };
    const model = { data_field: 23.9, deleted: true };
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        componentKey={componentKey}
        index={0}
        onChange={jest.fn()}
      />,
    );
    expect(component.find('FormTextInput')).toHaveLength(1);
    assertComponentHasExpectedProps(component.find('FormTextInput'), {
      disabled: true,
    });
  });
  it('should renders a currency field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
    };
    const model = { data_field: 23.9 };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders an email field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: EMAIL,
    };
    const model = { data_field: 'bill.bloggs@gmail.com' };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a currency field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a charge field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: CHARGE,
    };
    const model = { data_field: 23.9 };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a charge field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: CHARGE,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a country field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: COUNTRY,
    };
    const model = { data_field: 'NZ' };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a country field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: COUNTRY,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a text field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT,
      maxLength: 10,
    };
    const model = { data_field: 'SHow text' };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a text field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT,
      maxLength: 10,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a textarea field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT_AREA,
      displaySize: 400,
    };
    const model = { data_field: 'SHow text' };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a textarea field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT_AREA,
      displaySize: 400,
      header: 'put text here',
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should renders a checkbox field that is true', () => {
    const field = {
      fieldName: 'data_field',
      type: CHECKBOX,
    };
    const model = { data_field: true };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a checkbox field that is false', () => {
    const field = {
      fieldName: 'data_field',
      type: CHECKBOX,
    };
    const model = { data_field: false };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a checkbox field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: CHECKBOX,
      maxLength: 10,
    };
    const onChange = jest.fn();
    const component = shallow(
      <EditModelInput
        field={field}
        model={emptyModel}
        componentKey={componentKey}
        index={0}
        onChange={onChange}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
    findDataTest(component, 'model-checkbox').simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(field.fieldName, true, componentKey);
  });
  it('should renders a part type field that has data that is found', () => {
    const field = {
      fieldName: 'data_field',
      type: PART_TYPE,
      maxLength: 10,
    };
    const model = { data_field: 2 };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ sections }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a part type field that has data that is not found', () => {
    const field = {
      fieldName: 'data_field',
      type: PART_TYPE,
      maxLength: 10,
    };
    const model = { data_field: 202 };

    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ sections }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a part Type field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: PART_TYPE,
      maxLength: 10,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ sections }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a brand field that has data that is found', () => {
    const field = {
      fieldName: 'data_field',
      type: BRAND,
      maxLength: 10,
    };
    const model = { data_field: 2 };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ brands }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a brand field that has data that is not found', () => {
    const field = {
      fieldName: 'data_field',
      type: BRAND,
    };
    const model = { data_field: 202 };

    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ brands }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a brand field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: BRAND,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ brands }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a supplier field that has data that is found', () => {
    const field = {
      fieldName: 'data_field',
      type: SUPPLIER,
      maxLength: 10,
    };
    const model = { data_field: 2 };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ suppliers }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a supplier field that has data that is not found', () => {
    const field = {
      fieldName: 'data_field',
      type: SUPPLIER,
    };
    const model = { data_field: 202 };

    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={model}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ suppliers }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should renders a supplier field that has no data', () => {
    const field = {
      fieldName: 'data_field',
      type: SUPPLIER,
    };
    expect(
      toJson(
        shallow(
          <EditModelInput
            field={field}
            model={emptyModel}
            componentKey={componentKey}
            index={0}
            onChange={jest.fn()}
            sourceDataArrays={{ suppliers }}
          />,
        ),
      ),
    ).toMatchSnapshot();
  });
  it('should calls onchange with a valid field setting state correctly', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
    };
    const model = { data_field: 23.9 };
    const persistedModel = { data_field: 123.99 };
    const onChange = jest.fn();
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        persistedModel={persistedModel}
        componentKey={componentKey}
        index={0}
        onChange={onChange}
      />,
    );
    component.find('FormTextInput').prop('onChange')(field.fieldName, '45.75');
    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toBe(field.fieldName);
    expect(onChange.mock.calls[0][1]).toBe('45.75');
    expect(onChange.mock.calls[0][2]).toBe(componentKey);
  });
  it('should calls reset on a field to set back to model value', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT_AREA,
      maxLength: 10,
    };
    const model = { data_field: 23.9 };
    const persistedModel = { data_field: 123.99 };
    const onChange = jest.fn();
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        persistedModel={persistedModel}
        componentKey={componentKey}
        index={0}
        onChange={onChange}
      />,
    );
    component.find('FormTextAreaInput').prop('onClick')(field.fieldName);

    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toBe(field.fieldName);
    expect(onChange.mock.calls[0][1]).toBe(persistedModel.data_field);
    expect(onChange.mock.calls[0][2]).toBe(componentKey);
  });
  it('should calls reset on a field with no model and shows error', () => {
    const field = {
      fieldName: 'data_field',
      type: TEXT_AREA,
      maxLength: 10,
      required: true,
      error: 'My data is missing',
    };
    const model = { data_field: 23.9 };
    const onChange = jest.fn();
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        persistedModel={emptyModel}
        componentKey={componentKey}
        index={0}
        onChange={onChange}
      />,
    );
    component.find('FormTextAreaInput').prop('onClick')(field.fieldName);

    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toBe(field.fieldName);
    expect(onChange.mock.calls[0][1]).toBe('');
    expect(onChange.mock.calls[0][2]).toBe(componentKey);
  });
  it('should calls onchange with a missing field setting state correctly', () => {
    const field = {
      fieldName: 'data_field',
      type: CURRENCY,
      maxLength: 10,
      required: true,
      error: 'My data is missing',
    };
    const model = { data_field: 23.9 };
    const persistedModel = { data_field: 123.99 };
    const onChange = jest.fn();
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        persistedModel={persistedModel}
        componentKey={componentKey}
        index={0}
        onChange={onChange}
      />,
    );
    component.find('FormTextInput').prop('onChange')(field.fieldName, '');

    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toBe(field.fieldName);
    expect(onChange.mock.calls[0][1]).toBe('');
    expect(onChange.mock.calls[0][2]).toBe(componentKey);
  });
  it('should renders a fitting field that has data', () => {
    const field = {
      fieldName: 'data_field',
      type: FITTING,
    };
    const model = { data_field: 23.9 };
    const fittings = [{ id: 21 }, { id: 22 }];
    const component = shallow(
      <EditModelInput
        field={field}
        model={model}
        componentKey={componentKey}
        sourceDataArrays={{ fittings }}
        onChange={jest.fn()}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
    const fittingSelect = component.find('FittingSelect');
    expect(fittingSelect).toHaveLength(1);
    expect(fittingSelect.prop('fittings')).toEqual(fittings);
  });
});
