import React, { Fragment } from 'react';
import { changeList, updateObject } from '../../helpers/utils';
import ShowOrHide from '../../common/ShowOrHide';
import PartString from '../part/PartString';
import {
  CLUB_PRICE_FIELD,
  COLOURS_FIELD,
  DESCRIPTION_FIELD,
  EPIC_PRICE_FIELD,
  MODEL_NAME_FIELD,
  PRODUCT_CODE_FIELD,
  RRP_FIELD,
  SIZES_FIELD,
} from '../app/model/helpers/fields';
import ModelTableHeaders from '../app/model/ModelTableHeaders';
import ModelViewRow from '../app/model/ModelViewRow';
const bikeFields = [
  MODEL_NAME_FIELD,
  DESCRIPTION_FIELD,
  PRODUCT_CODE_FIELD,
  COLOURS_FIELD,
  RRP_FIELD,
  EPIC_PRICE_FIELD,
  CLUB_PRICE_FIELD,
  SIZES_FIELD,
];
class BikeUploadReview extends React.Component {
  constructor() {
    super();
    this.state = {
      bikesWithDetail: [],
    };
  }

  toggleBikeDetail = id => {
    const newState = updateObject(this.state, {
      bikesWithDetail: changeList(this.state.bikesWithDetail, id),
    });
    this.setState(newState);
  };

  render() {
    const { frame, brands, sections } = this.props;
    const { bikesWithDetail } = this.state;

    return (
      <Fragment key="bikeUploadPartTypes">
        <div
          key="partTypes"
          className="grid"
          style={{ height: `${window.innerHeight * 0.8}px`, overflow: 'scroll' }}
        >
          <div className="grid-row grid-row--header ">
            <ModelTableHeaders modelFields={bikeFields} lockFirstColumn />
            <div className="grid-item--header">Parts</div>
            <div className="grid-item--header" />
          </div>
          <Fragment>
            {frame.bikes.map((bike, bikeIndex) => (
              <div className="grid-row" key={`bikeRow${bikeIndex}`}>
                <ModelViewRow modelFields={bikeFields} model={bike} lockFirstColumn />
                <div className="grid-item align_center">
                  <ShowOrHide
                    componentKey={`seeParts${bikeIndex}`}
                    isShown={bikesWithDetail.includes(bikeIndex)}
                    hideDetail={this.toggleBikeDetail}
                    showDetail={this.toggleBikeDetail}
                    detailKey={bikeIndex}
                  />
                </div>
                <div className="grid-item ">
                  {bikesWithDetail.includes(bikeIndex) &&
                    bike.parts.map(part => (
                      <PartString part={part} brands={brands} sections={sections} />
                    ))}
                </div>
              </div>
            ))}
          </Fragment>
        </div>
      </Fragment>
    );
  }
}

export default BikeUploadReview;
