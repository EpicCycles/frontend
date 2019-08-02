import React from 'react';
import ModelViewRow from './model/ModelViewRow';
import { frameFields } from './model/helpers/fields';
import ModelViewRowField from './model/ModelViewRowField';
import { findDataTest } from '../../helpers/jest_helpers/assert';

describe('ModelViewRow', () => {
  const model = {
    id: 14,
    brand_name: 'Haibike',
    frame_name: 'Trekking',
    archived: false,
    archived_date: null,
    brand: 3,
  };
  it('should display a cell for each field', () => {
    const component = shallow(<ModelViewRow modelFields={frameFields} model={model} />);
    expect(findDataTest(component, 'model-field-cell')).toHaveLength(frameFields.length);
    expect(component.find(ModelViewRowField)).toHaveLength(frameFields.length);
  });
});
