import React from 'react';
import ModelTableHeaders from './model/ModelTableHeaders';
import { customerFields } from './model/helpers/fields';
import { findDataTest } from '../../helpers/jest_helpers/assert';

describe('ModelTableHeaders', () => {
  it('should show all the headers when a model has fields', () => {
    const component = shallow(<ModelTableHeaders modelFields={customerFields} />);
    expect(findDataTest(component, 'model-field-header')).toHaveLength(customerFields.length);
  });
});
