import React, { Fragment, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { supplierProductHeaders } from './helpers/supplierProduct';
import CSVReader from 'react-csv-reader';
import * as PropTypes from 'prop-types';

const SupplierProductUploadFile = props => {
  const [uploadedData, setUploadedData] = useState(undefined);
  function useFileContents(fileContents) {
    if (Array.isArray(fileContents) && fileContents.length > 1) {
      const withoutHeader = fileContents.slice(1);
      setUploadedData(withoutHeader);
    } else {
      setUploadedData(undefined);
    }
  }
  const clearUploadData = () => {
    setUploadedData(undefined);
  };
  const { buildInitialRowMappings, addDataAndProceed } = props;
  const uploadDisabled = false;

  if (uploadedData) {
    return (
      <Fragment>
        <div>
          <Button
            key="supplierProductFileUploadCont"
            onClick={() => addDataAndProceed(uploadedData, buildInitialRowMappings(uploadedData))}
            data-test="proceed"
          >
            Continue ...
          </Button>
          <Button key="supplierProductFileUploadReset" onClick={clearUploadData} data-test="clear">
            Clear data
          </Button>
        </div>
        <div
          key="supplierProductUploadGrid"
          className="grid"
          style={{
            height: window.innerHeight - 100 + 'px',
            width: window.innerWidth - 50 + 'px',
            overflow: 'scroll',
          }}
        >
          <div key="supplierProductUploadHeaders" className="grid-row grid-row--header">
            {supplierProductHeaders.map((cell, index) => (
              <div
                key={`col1${index}`}
                className={
                  index === 0 ? 'grid-item--header grid-header--fixed-left' : 'grid-item--header'
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
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
  return (
    <div key="supplierProductUploadInput" className="row">
      <div className="field-label">Select file for upload</div>
      <div>
        <CSVReader
          onFileLoaded={useFileContents}
          onError={clearUploadData}
          inputId="partsData"
          disabled={uploadDisabled}
          data-test="uploader"
        />
      </div>
    </div>
  );
};

SupplierProductUploadFile.propTypes = {
  buildInitialRowMappings: PropTypes.func.isRequired,
  addDataAndProceed: PropTypes.func.isRequired,
};
export default SupplierProductUploadFile;
