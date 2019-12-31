import React, { useState, Fragment } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { buildDataForApi } from './helpers/bike';

const BikeUploadMappingReview = props => {
  const [rowMappings, setRowMappings] = useState(props.rowMappings);

  const goToNextStep = () => {
    const apiData = buildDataForApi(
      props.brand,
      props.frameName,
      rowMappings,
      props.uploadedHeaders,
      props.uploadedData,
      props.brands,
    );
    props.addDataAndProceed({ rowMappings, apiData });
  };
  const discardData = rowIndex => {
    const updatedRowMappings = rowMappings.map(rowMap => {
      if (rowMap.rowIndex === rowIndex) {
        rowMap.ignore = true;
      }
      return rowMap;
    });
    setRowMappings(updatedRowMappings);
  };

  const undoDiscardData = rowIndex => {
    const updatedRowMappings = rowMappings.map(rowMap => {
      if (rowMap.rowIndex === rowIndex) {
        rowMap.ignore = false;
      }
      return rowMap;
    });
    setRowMappings(updatedRowMappings);
  };

  const { uploadedHeaders, uploadedData } = props;
  return (
    <Fragment key="bikeUploadParts">
      <div>
        <Button key="bikeFileUploadCont" onClick={goToNextStep}>
          Assign brands for Parts and Continue
        </Button>
      </div>
      <div
        key="bikeUploadGrid"
        className="grid"
        style={{
          height: window.innerHeight * 0.6 + 'px',
          width: window.innerWidth - 50 + 'px',
          overflow: 'auto',
        }}
      >
        <div key="bikeUploadHeaders" className="grid-row grid-row--header">
          {uploadedHeaders.map((cell, index) => (
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
        {rowMappings.map(rowMapping => (
          <div key={`detailRow${rowMapping.rowIndex}`} className="grid-row">
            {uploadedData[rowMapping.rowIndex].map((cell, index) => (
              <div
                className={`grid-item ${index === 0 &&
                  'grid-item--fixed-left'} ${rowMapping.ignore && 'discarded'}`}
                key={`row${rowMapping.rowIndex}col${index}`}
              >
                <nobr>
                  {cell}
                  {index === 0 &&
                    (rowMapping.ignore && (rowMapping.partType || rowMapping.bikeAttribute)) && (
                      <Icon
                        id={`undoDelete-field${index}`}
                        name="undo"
                        onClick={() => undoDiscardData(rowMapping.rowIndex)}
                        title="Discard data"
                      />
                    )}
                  {index === 0 && !rowMapping.ignore && (
                    <Icon
                      id={`delete-field${index}`}
                      name="trash"
                      onClick={() => discardData(rowMapping.rowIndex)}
                      title="Discard data"
                    />
                  )}
                </nobr>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default BikeUploadMappingReview;
