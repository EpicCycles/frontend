import React, { Fragment } from 'react';
import SupplierProductHeaders from './SupplierProductHeaders';
import { Button } from 'semantic-ui-react';
import { partFieldsComplete, supplierProductFields } from '../app/model/helpers/fields';
import ModelViewRow from '../app/model/ModelViewRow';

class SupplierProductUploadReview extends React.Component {
  saveData = () => {
    let { apiData } = this.props;
    this.props.uploadParts(apiData.parts);
  };

  render() {
    const { apiData, brands, sections, suppliers } = this.props;
    return (
      <Fragment key="reviewSuplierProducts">
        <div>
          <Button key="bikeFileUploadCont" onClick={this.saveData}>
            Upload data
          </Button>
        </div>
        <div
          key="partTypes"
          className="grid"
          style={{ height: window.innerHeight * 0.8 + 'px', overflow: 'scroll' }}
        >
          <SupplierProductHeaders />
          {apiData.parts.map((part, partIndex) => (
            <div className="grid-row" key={`partRow${partIndex}`}>
              <ModelViewRow
                key={`part${partIndex}`}
                modelFields={partFieldsComplete}
                model={part}
                lockFirstColumn={true}
                sourceDataArrays={{ sections, brands }}
              />
              <ModelViewRow
                key={`supplierProduct${partIndex}`}
                modelFields={supplierProductFields}
                model={part.supplierProduct}
                sourceDataArrays={{ suppliers }}
              />
              <div className="grid-item">{part.error && part.error_detail.join()}</div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default SupplierProductUploadReview;
