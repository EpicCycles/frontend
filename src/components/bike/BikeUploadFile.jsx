import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';

class BikeUploadFile extends React.Component {
  state = {};

  goToNextStep = () => {
    const { uploadedHeaders, uploadedData } = this.state;
    const rowMappings = this.props.buildInitialRowMappings(uploadedData);
    this.props.addDataAndProceed({ uploadedHeaders, uploadedData, rowMappings });
  };

  addData = csvFileContents => {
    if (csvFileContents.length > 0) {
      const uploadedHeaders = csvFileContents.shift();
      this.setState({ uploadedHeaders, uploadedData: csvFileContents });
    }
  };

  clearUploadData = () => {
    this.setState({ uploadedHeaders: [], uploadedData: [] });
  };

  render() {
    const { modelName, uploadedHeaders, uploadedData } = this.state;
    const { brandName, frameName } = this.props;
    const uploadData = uploadedHeaders && uploadedHeaders.length > 0;
    const uploadDisabled = false;
    const continueDisabled = !brandName || !frameName;
    return (
      <Fragment key="bikeUploadFile">
        {!uploadData && (
          <div key="bikeUploadInput" className="row">
            <div className="field-label">Select file for upload</div>
            <div>
              <CSVReader
                onFileLoaded={this.addData}
                onError={this.clearUploadData}
                inputId="bikeData"
                disabled={uploadDisabled}
              />
            </div>
          </div>
        )}
        {uploadData && (
          <Fragment>
            <div>
              <Button
                key="bikeFileUploadCont"
                onClick={this.goToNextStep}
                disabled={continueDisabled}
              >
                Continue ...
              </Button>
              <Button key="bikeFileUploadReset" onClick={this.clearUploadData}>
                Clear data
              </Button>
            </div>
            <div
              key="bikeUploadGrid"
              className="grid"
              style={{ height: window.innerHeight * 0.6 + 'px', overflow: 'scroll' }}
            >
              <div key="bikeUploadHeaders" className="grid-row grid-row--header">
                {uploadedHeaders.map((cell, index) => (
                  <div
                    key={`col1${index}`}
                    className={
                      index === 0
                        ? 'grid-item--header grid-header--fixed-left'
                        : 'grid-item--header'
                    }
                  >
                    {cell}
                  </div>
                ))}
              </div>
              {uploadedData.map((uploadedRow, rowIndex) => (
                <div key={`detailRow${rowIndex}`} className="grid-row">
                  {uploadedRow.map((cell, index) => (
                    <div
                      className={index === 0 ? 'grid-item grid-item--fixed-left' : 'grid-item'}
                      key={`row${rowIndex}col${index}`}
                    >
                      <nobr>{cell}</nobr>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default BikeUploadFile;
