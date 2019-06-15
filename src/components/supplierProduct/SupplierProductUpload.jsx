import React, { Fragment } from 'react';
import SupplierProductUploadFile from './SupplierProductUploadFile';
import { getPartTypeForName } from '../partType/helpers/partType';
import { colourStyles } from '../../helpers/constants';
import UploadMappingPartTypes from '../app/upload/UploadMappingPartTypes';
import UploadMappingSuppliers from '../app/upload/UploadMappingSuppliers';
import { buildSupplierProductForApi } from './helpers/supplierProduct';
import BrandPrompt from '../brand/BrandPrompt';
import SupplierProductUploadReview from './SupplierProductUploadReview';
import { doWeHaveObjects, updateObject } from '../../helpers/utils';
import { Button } from 'semantic-ui-react';

const uploadSteps = [
  {
    stepDescriptor: 'File',
    description: 'Upload File',
  },
  { stepDescriptor: 'Part Types', description: 'Assign Part Types for upload data' },
  { stepDescriptor: 'Suppliers', description: 'Assign Suppliers for upload data' },
  { stepDescriptor: 'Brands', description: 'Add missing brands' },
  { stepDescriptor: 'Review', description: 'Review data for parts to be created during upload' },
];
const initialState = {
  step: 0,
};

class SupplierProductUpload extends React.Component {
  state = initialState;

  onChangeField = (fieldName, fieldValue) => {
    let newState = this.state;
    newState[fieldName] = fieldValue;

    this.setState(newState);
  };

  addDataAndProceed = dataForState => {
    let nextStep = this.state.step + 1;

    let newState = updateObject(this.state, dataForState, { step: nextStep });
    if (newState.rowMappings) {
      const missingPartType = newState.rowMappings.some(
        rowMapping => !rowMapping.partType && !rowMapping.ignore,
      );
      const missingSupplier = newState.rowMappings.some(
        rowMapping => !rowMapping.supplier && !rowMapping.ignore,
      );
      if (missingPartType) {
        newState.step = 1;
      } else if (missingSupplier) {
        newState.step = 2;
      } else {
        newState.step = 3;
        newState.apiData = buildSupplierProductForApi(
          newState.rowMappings,
          newState.uploadedData,
          this.props.brands,
        );
        if (doWeHaveObjects(newState.apiData.updatedBrands))
          this.props.saveBrands(newState.apiData.updatedBrands);
        if (!doWeHaveObjects(newState.apiData.partsMissingBrands)) newState.step = 4;
      }
    }

    this.setState(newState);
  };

  goToStep = step => {
    let newState = updateObject(this.state, { step: step });
    this.setState(newState);
  };

  buildInitialRowMappings = uploadedData => {
    const { sections, suppliers } = this.props;
    return uploadedData.map((row, rowIndex) => {
      const partTypeName = row[0].trim();
      const partType = getPartTypeForName(sections, partTypeName);
      const supplierName = row[1].trim();
      const supplierNameLower = supplierName.toLowerCase();
      const rowData = { rowIndex, partTypeName, supplierName };

      if (partType) {
        rowData.partType = partType.id;
      }

      suppliers.some(supplier => {
        if (supplier.supplier_name.toLowerCase() === supplierNameLower) {
          rowData.supplier = supplier.id;
          return true;
        }
        return false;
      });
      return rowData;
    });
  };

  actionOnBrandsChange = () => {
    if (!this.props.isLoading) {
      let newState = updateObject(this.state);
      newState.apiData = buildSupplierProductForApi(
        newState.rowMappings,
        newState.uploadedData,
        this.props.brands,
      );
      if (doWeHaveObjects(newState.apiData.updatedBrands))
        this.props.saveBrands(newState.apiData.updatedBrands);
      if (!doWeHaveObjects(newState.apiData.partsMissingBrands)) newState.step = 4;
      this.setState(newState);
    }
  };

  addBrandToPart = (partDesc, brandName) => {
    const { uploadedData } = this.state;
    const finalName = `${brandName} ${partDesc}`;
    const updatedData = uploadedData.map(dataRow => {
      if (dataRow[3] === partDesc) {
        const updatedRowData = dataRow.slice();
        updatedRowData[3] = finalName;
        return updatedRowData;
      }
      return dataRow;
    });
    let newState = updateObject(this.state, { uploadedData: updatedData });

    newState.apiData = buildSupplierProductForApi(
      newState.rowMappings,
      newState.uploadedData,
      this.props.brands,
    );
    if (!doWeHaveObjects(newState.apiData.partsMissingBrands)) newState.step = 4;
    this.setState(newState);
  };
  render() {
    const {
      sections,
      suppliers,
      brands,
      saveFramework,
      saveSupplier,
      uploadParts,
      saveBrands,
    } = this.props;
    const { step, rowMappings, apiData } = this.state;
    return (
      <Fragment key="supplierProductUpload">
        <div className="row full">
          <h2 className="half">Supplier Product Upload - {uploadSteps[step].description}</h2>
          <div className="align_right half">
            {apiData && step < 4 && (
              <Button key="goToUpload" onClick={() => this.goToStep(4)}>
                Ignore unmatched data
              </Button>
            )}
          </div>
        </div>
        {step === 0 && (
          <SupplierProductUploadFile
            buildInitialRowMappings={this.buildInitialRowMappings}
            addDataAndProceed={this.addDataAndProceed}
          />
        )}
        {step === 1 && (
          <UploadMappingPartTypes
            rowMappings={rowMappings}
            sections={sections}
            saveFramework={saveFramework}
            addDataAndProceed={this.addDataAndProceed}
            multiplesAllowed
          />
        )}
        {step === 2 && (
          <UploadMappingSuppliers
            rowMappings={rowMappings}
            suppliers={suppliers}
            saveSupplier={saveSupplier}
            addDataAndProceed={this.addDataAndProceed}
          />
        )}
        {step === 3 && (
          <BrandPrompt
            brands={brands}
            productDescriptions={apiData.partsMissingBrands}
            saveBrands={saveBrands}
            actionOnBrandsChange={this.actionOnBrandsChange}
            addBrandToPart={this.addBrandToPart}
          />
        )}
        {step === 4 && (
          <SupplierProductUploadReview
            apiData={apiData}
            brands={brands}
            sections={sections}
            suppliers={suppliers}
            uploadParts={uploadParts}
          />
        )}
        <div className="full align_center">
          {uploadSteps.map((stepDetails, stepIndex) => (
            <Fragment>
              {colourStyles[stepIndex].transition && (
                <div
                  className={colourStyles[stepIndex].transition}
                  key={`transition${stepIndex}`}
                />
              )}
              <div
                key={`step${stepDetails.stepDescriptor}`}
                className={`circle
                            ${stepIndex === step ? ' selected-circle' : ' unselected-circle'}
                                 ${colourStyles[stepIndex].colour}
                                  ${colourStyles[stepIndex].background}
                                   ${colourStyles[stepIndex].border}`}
                onClick={() => this.goToStep(stepIndex)}
                disabled={!(stepIndex < this.state.step)}
                title={stepDetails.description}
              >
                {stepDetails.stepDescriptor}
              </div>
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default SupplierProductUpload;
