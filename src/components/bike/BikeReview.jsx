import React, { Fragment, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import Pagination from '../../common/pagination';
import { findObjectWithId, generateRandomCode, updateObject } from '../../helpers/utils';
import { Redirect } from 'react-router';
import * as PropTypes from 'prop-types';
import { isModelValid } from '../app/model/helpers/model';
import ModelTableHeaderRow from '../app/model/ModelTableHeaderRow';
import { bikeFullName } from './helpers/bike';
import EditModel from '../app/model/EditModel';
import { bikeFields, bikePartFields } from './helpers/bikeFields';
import {textToNumber} from "../../helpers/textToNumber";

const BikeReview = props => {
  let [bike, setBike] = useState(undefined);
  let [newBikePart, setNewBikePart] = useState({ dummyKey: generateRandomCode() });

  const {
    bikeId,
    bikeReviewList,
    bikes,
    sections,
    brands,
    frames,
    isLoading,
    reviewBike,
    deleteBikes,
    saveBike,
  } = props;

  const persistedBike = findObjectWithId(bikes, bikeId);

  const reviewSelectedBike = bikePage => {
    const bikeIndex = bikePage - 1;
    reviewBike(props.bikeReviewList[bikeIndex]);
  };
  const updateBike = bikeData => {
    const bikeBeforeChange = bike ? bike : persistedBike;
    setBike(updateObject(bikeBeforeChange, bikeData));
  };
  const deleteBike = () => {
    deleteBikes([bikeId]);
  };
  const resetChanges = () => {
    setBike(undefined);
  };
  const deletePart = bikePartId => {
    const bikeBeforeChange = bike ? bike : persistedBike;
    const bikePartsUpdated = bikeBeforeChange.bikeParts.filter(bp => bp.id !== bikePartId);
    setBike(updateObject(bikeBeforeChange, { bikeParts: bikePartsUpdated }));
  };
  const saveOrAddPart = bikePart => {
    const bikeBeforeChange = bike ? bike : persistedBike;
    if (bikePart.dummyKey) {
      setNewBikePart({ dummyKey: generateRandomCode() });
    }
    // first remove any existing with this part type
    const bikePartsUpdated = bikeBeforeChange.bikeParts.filter(
      bp => bp.partType !== bikePart.partType,
    );
    const newPartId = bikePart.id ? bikePart.id : bikePart.partType;
    bikePartsUpdated.push({
      id: newPartId,
      partType: textToNumber(bikePart.partType),
      partName: bikePart.partName,
    });
    setBike(updateObject(bikeBeforeChange, { bikeParts: bikePartsUpdated }));
  };

  if (!bikeId) return <Redirect to="/bike-review-list" push />;
  if (!persistedBike) return <Redirect to="/bike-review-list" push />;
  const partTypesToShow = [];
  const bikeParts = bike ? bike.bikeParts : persistedBike.bikeParts;
  sections.forEach(section => {
    section.partTypes.forEach(partType => {
      if (bikeParts.some(bp => bp.partType === partType.id)) {
        partTypesToShow.push(partType);
      }
    });
  });
  const canSave = bike && isModelValid(bike);
  return (
    <Fragment key={`bikeReview`}>
      <h3>{bikeFullName(persistedBike, frames, brands)}</h3>

      <section className="row">
        <div>
          <div className="row">
            <button onClick={deleteBike}>Delete</button>
            <button onClick={() => saveBike(bike)} disabled={!canSave}>
              Save changes
            </button>
            <button onClick={resetChanges} disabled={!canSave}>
              Reset
            </button>
          </div>
          <EditModel
            key={`editBike${bikeId}`}
            model={bike || persistedBike}
            modelFields={bikeFields}
            persistedModel={persistedBike}
            data-test="edit-bike"
            actionsRequired
            modelSave={updateBike}
            pageMode
          />
        </div>
        <div>
          <div className="grid-container">
            <div className="grid">
              <ModelTableHeaderRow modelFields={bikePartFields} includeActions />
              {partTypesToShow.map(pt => {
                const persistedBikePart = persistedBike.bikeParts.find(bp => bp.partType === pt.id);
                const bikePart = bikeParts.find(bp => bp.partType === pt.id) || persistedBikePart;
                return (
                  <div className={`grid-row`} key={`row${bikePart.id}`}>
                    <EditModel
                      model={bikePart}
                      persistedModel={persistedBikePart}
                      modelFields={bikePartFields}
                      data-test="edit-bike-part"
                      key={`edit-bike-part-${pt.id}`}
                      modelSave={saveOrAddPart}
                      modelDelete={deletePart}
                      sourceDataArrays={{ sections }}
                      actionsRequired
                    />
                  </div>
                );
              })}
              <div className={`grid-row`} key={`row${newBikePart.dummyKey}`}>
                <EditModel
                  model={newBikePart}
                  persistedModel={{}}
                  modelFields={bikePartFields}
                  data-test="edit-bike-part"
                  key={`edit-bike-part-${newBikePart.dummyKey}`}
                  modelSave={saveOrAddPart}
                  modelDelete={deletePart}
                  sourceDataArrays={{ sections }}
                  actionsRequired
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pagination
        key="bottompagination"
        type="Bike"
        getPage={reviewSelectedBike}
        lastPage={bikeReviewList.length}
        count={bikeReviewList.length}
        page={bikes.indexOf(persistedBike) + 1}
      />
      {isLoading && (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )}
    </Fragment>
  );
};

BikeReview.defaultProps = {
  parts: [],
  brands: [],
  sections: [],
  isLoading: false,
};

BikeReview.propTypes = {
  bikeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bikeReviewList: PropTypes.array.isRequired,
  bikes: PropTypes.array.isRequired,
  brands: PropTypes.array,
  sections: PropTypes.array,
  frames: PropTypes.array.isRequired,
  reviewBike: PropTypes.func.isRequired,
  saveBike: PropTypes.func.isRequired,
  deleteBikes: PropTypes.func.isRequired,
  getBike: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
export default BikeReview;
