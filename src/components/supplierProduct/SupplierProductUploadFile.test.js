import SupplierProductUploadFile from './SupplierProductUploadFile';
import React from 'react';
import { findDataTest } from '../../helpers/jest_helpers/assert';

describe('SupplierProductUploadFile', () => {
  it('Should show the file uploaded when no data is present', () => {
    const component = shallow(
      <SupplierProductUploadFile
        buildInitialRowMappings={jest.fn()}
        addDataAndProceed={jest.fn()}
      />,
    );
    expect(findDataTest(component, 'uploader')).toHaveLength(1);
    expect(findDataTest(component, 'clear')).toHaveLength(0);
    expect(findDataTest(component, 'proceed')).toHaveLength(0);
  });
  it('should show the data and related buttons once data is uploaded', () => {
    const component = shallow(
      <SupplierProductUploadFile
        buildInitialRowMappings={jest.fn()}
        addDataAndProceed={jest.fn()}
      />,
    );
    findDataTest(component, 'uploader').prop('onFileLoaded')([
      ['header, header, header'],
      ['data'],
      ['data'],
    ]);
    expect(findDataTest(component, 'uploader')).toHaveLength(0);
    expect(findDataTest(component, 'clear')).toHaveLength(1);
    expect(findDataTest(component, 'proceed')).toHaveLength(1);
  });
  it('should show the load again if no data is present to upload', () => {
    const component = shallow(
      <SupplierProductUploadFile
        buildInitialRowMappings={jest.fn()}
        addDataAndProceed={jest.fn()}
      />,
    );
    findDataTest(component, 'uploader').prop('onFileLoaded')([['header, header, header']]);
    expect(findDataTest(component, 'uploader')).toHaveLength(1);
    expect(findDataTest(component, 'clear')).toHaveLength(0);
    expect(findDataTest(component, 'proceed')).toHaveLength(0);
  });
});
