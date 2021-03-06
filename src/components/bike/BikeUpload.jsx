import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import BikeUploadFile from './BikeUploadFile';
import BikeUploadMapping from './BikeUploadMapping';
import BikeUploadFrame from './BikeUploadFrame';
import UploadMappingPartTypes from '../app/upload/UploadMappingPartTypes';
import { getPartTypeForName } from '../partType/helpers/partType';
import { findObjectWithId, updateObject } from '../../helpers/utils';
import BikeUploadMappingReview from './BikeUploadMappingReview';
import { colourStyles } from '../../helpers/constants';
import { bikeFields } from './helpers/bikeFields';
import BikeUploadReview from './BikeUploadReview';

const uploadSteps = [
  {
    stepNumber: 1,
    description: 'Upload File',
  },
  { stepNumber: 2, description: 'Assign Part Types for upload data' },
  { stepNumber: 3, description: 'Assign Bike level fields' },
  { stepNumber: 4, description: 'Review mapping for all data' },
  { stepNumber: 5, description: 'List Bikes created during upload' },
];
const initialState = {
  step: 0,
};

class BikeUpload extends React.Component {
  state = initialState;

  onChangeField = (fieldName, fieldValue) => {
    const newState = this.state;
    newState[fieldName] = fieldValue;
    if (fieldName === 'brand') {
      const selectedBrand = findObjectWithId(this.props.brands, fieldValue);
      if (selectedBrand) newState.brandName = selectedBrand.brand_name;
    }
    this.setState(newState);
  };

  addDataAndProceed = dataForState => {
    const nextStep = this.state.step + 1;

    const newState = updateObject(this.state, dataForState, { step: nextStep });
    if (nextStep < 3 && newState.rowMappings) {
      const unmappedFields = newState.rowMappings.filter(
        rowMapping => !(rowMapping.ignore || rowMapping.partType || rowMapping.bikeAttribute),
      );
      if (unmappedFields.length === 0) {
        newState.step = 3;
      }
    }
    this.setState(newState);
  };

  goToStep = step => {
    if (step < this.state.step) {
      const newState = { step };
      this.setState(newState);
    }
  };

  startAgain = () => {
    this.props.clearFrame();
    this.setState(initialState);
  };

  buildInitialRowMappings = uploadedData => {
    const { sections } = this.props;
    const rowMappings = uploadedData.map((row, rowIndex) => {
      const partTypeName = row[0].trim();
      const partTypeNameLower = row[0].toLowerCase();
      const rowData = { rowIndex, partTypeName };
      const matchingField = bikeFields.some(field => {
        if (field.synonyms && field.synonyms.includes(partTypeNameLower)) {
          rowData.bikeAttribute = field.fieldName;
          return true;
        }
        return false;
      });
      if (!matchingField) {
        const partType = getPartTypeForName(sections, partTypeName);
        if (partType) {
          rowData.partType = partType.id;
        }
      }
      return rowData;
    });
    return rowMappings;
  };

  render() {
    const {
      brands,
      suppliers,
      sections,
      saveBrands,
      saveFramework,
      uploadFrame,
      frame,
    } = this.props;
    const {
      brand,
      brandName,
      frameName,
      step,
      rowMappings,
      uploadedHeaders,
      uploadedData,
    } = this.state;
    return (
      <Fragment key="bikeUpload">
        <h2>Bike Upload - {uploadSteps[step].description}</h2>
        {step !== 1 && (
          <BikeUploadFrame
            brands={brands}
            suppliers={suppliers}
            onChange={this.onChangeField}
            brandSelected={brand}
            frameName={frameName}
            brandName={brandName}
            displayOnly={step > 0}
            saveBrands={saveBrands}
          />
        )}
        {step === 0 && (
          <BikeUploadFile
            brandName={brandName}
            frameName={frameName}
            brands={brands}
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
            displayPercent={65}
          />
        )}
        {step === 2 && (
          <BikeUploadMapping
            rowMappings={rowMappings}
            addDataAndProceed={this.addDataAndProceed}
            uploadFrame={uploadFrame}
          />
        )}
        {step === 3 && (
          <BikeUploadMappingReview
            rowMappings={rowMappings}
            uploadedHeaders={uploadedHeaders}
            uploadedData={uploadedData}
            brands={brands}
            brand={brand}
            frameName={frameName}
            addDataAndProceed={this.addDataAndProceed}
            uploadFrame={uploadFrame}
          />
        )}
        {step === 4 && <BikeUploadReview sections={sections} brands={brands} frame={frame} />}
        <div className="full align_center">
          {this.state.step < uploadSteps.length - 1 ? (
            uploadSteps.map((stepDetails, stepIndex) => {
              return (
                <Fragment>
                  {colourStyles[stepIndex].transition && (
                    <div
                      className={colourStyles[stepIndex].transition}
                      key={`transition${stepIndex}`}
                    />
                  )}
                  <div
                    key={`step${stepDetails.stepNumber}`}
                    className={`circle ${
                      stepIndex === step ? ' selected-circle' : ' unselected-circle'
                    } ${colourStyles[stepIndex].colour} ${colourStyles[stepIndex].background} ${
                      colourStyles[stepIndex].border
                    }`}
                    onClick={() => this.goToStep(stepIndex)}
                    disabled={!(stepIndex < this.state.step)}
                    title={stepDetails.description}
                  >
                    {stepDetails.stepNumber}
                  </div>
                </Fragment>
              );
            })
          ) : (
            <Button key="startAgain" onClick={this.startAgain}>
              Upload Another
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

export default BikeUpload;
