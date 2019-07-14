import React, { Fragment } from 'react';
import { changeList, doWeHaveObjects, removeKey, updateObject } from '../../helpers/utils';
import { Button, Dimmer, Icon, Loader } from 'semantic-ui-react';
import BikeReviewListSelection from './BikeReviewListSelection';
import { Redirect } from 'react-router';
import ModelTableActionHeader from '../app/model/ModelTableActionHeader';
import {
  CLUB_PRICE_FIELD,
  EPIC_PRICE_FIELD,
  FRAME_NAME_FIELD,
  MODEL_NAME_FIELD,
  RRP_FIELD,
} from '../app/model/helpers/fields';
import ModelTableHeaders from '../app/model/ModelTableHeaders';
import EditModel from '../app/model/EditModel';
import { frameActions } from './helpers/frameActions';
import { bikeActions } from './helpers/bikeActions';

const frameFields = [FRAME_NAME_FIELD];
const bikeFields = [MODEL_NAME_FIELD, RRP_FIELD, EPIC_PRICE_FIELD, CLUB_PRICE_FIELD];
class BikeReviewList extends React.Component {
  state = {
    brand: '',
    frameName: '',
    archived: false,
    frameArchiveList: [],
    frameDeleteList: [],
    bikeReviewList: [],
    bikeDeleteList: [],
  };
  handleInputChange = (fieldName, input) => {
    let newState = updateObject(this.state);
    newState[fieldName] = input;
    this.setState(newState);
  };
  handleInputClear = fieldName => {
    removeKey(this.state, fieldName);
  };
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.getFrameList();
    }
  };
  buildSearchCriteria = () => {
    const { brand, frameName, archived } = this.state;
    return { brand, frameName, archived };
  };
  getFrameList = () => {
    this.props.getFrameList(this.buildSearchCriteria());
  };
  showSearch = () => {
    const { frameArchiveList, frameDeleteList, bikeReviewList, bikeDeleteList } = this.state;
    if (
      frameArchiveList.length > 0 ||
      frameDeleteList.length > 0 ||
      bikeReviewList.length > 0 ||
      bikeDeleteList.length > 0
    ) {
      if (!window.confirm('Are You Sure?')) return;
    }
    let newState = updateObject(this.state, {
      frameArchiveList: [],
      frameDeleteList: [],
      bikeReviewList: [],
      bikeDeleteList: [],
    });
    this.setState(newState);
    this.props.clearFrame();
  };
  changeFrameArchiveList = frameId => {
    let newState = updateObject(this.state, {
      frameArchiveList: changeList(this.state.frameArchiveList, frameId),
    });
    this.setState(newState);
  };
  changeFrameDeleteList = frameId => {
    let newState = updateObject(this.state, {
      frameDeleteList: changeList(this.state.frameDeleteList, frameId),
    });
    this.setState(newState);
  };
  changeBikeReviewList = bikeId => {
    let newState = updateObject(this.state, {
      bikeReviewList: changeList(this.state.bikeReviewList, bikeId),
    });
    this.setState(newState);
  };
  changeBikeDeleteList = bikeId => {
    let newState = updateObject(this.state, {
      bikeDeleteList: changeList(this.state.bikeDeleteList, bikeId),
    });
    this.setState(newState);
  };
  restoreArchivedFrame = frameId => {
    const frame = {
      id: frameId,
      archived: false,
      archived_date: null,
    };
    this.props.saveFrame(frame, this.buildSearchCriteria());
  };
  archiveFrames = () => {
    this.props.archiveFrames(this.state.frameArchiveList, this.buildSearchCriteria());
    let newState = updateObject(this.state, { frameArchiveList: [] });
    this.setState(newState);
  };
  deleteFrames = () => {
    this.props.deleteFrames(this.state.frameDeleteList, this.buildSearchCriteria());
    let newState = updateObject(this.state, { frameDeleteList: [] });
    this.setState(newState);
  };
  reviewAll = () => {
    const { frames } = this.props;
    const nonArchivedFrames = frames ? frames.filter(frame => !frame.archived) : [];
    let bikeReviewList = [];
    nonArchivedFrames.forEach(frame => {
      this.props.bikes
        .filter(bike => bike.frame === frame.id)
        .forEach(bike => bikeReviewList.push(bike.id));
    });
    if (this.kickOffReview(bikeReviewList)) {
      this.setState(updateObject(this.state, { reviewFirstBike: true }));
    } else {
      this.setState(updateObject(this.state, { bikeReviewList, reviewFirstBike: false }));
    }
  };
  startReview = () => {
    if (this.kickOffReview(this.state.bikeReviewList)) {
      this.setState(updateObject(this.state, { reviewFirstBike: true }));
    }
  };
  kickOffReview = bikeReviewList => {
    const { frameArchiveList, frameDeleteList, bikeDeleteList } = this.state;
    if (frameArchiveList.length > 0 || frameDeleteList.length > 0 || bikeDeleteList.length > 0) {
      if (
        !window.confirm('Do you want to continue without processing delete and archive requests?')
      ) {
        return false;
      }
    }
    this.props.reviewBikes(bikeReviewList, this.buildSearchCriteria());
    return true;
  };
  deleteBikes = () => {
    this.props.deleteBikes(this.state.bikeDeleteList, this.buildSearchCriteria());
    let newState = updateObject(this.state, { bikeDeleteList: [] });
    this.setState(newState);
  };
  classWhenOnList = (checkList, checkItem, className = 'red') => {
    if (checkList.includes(checkItem)) return className;
    return '';
  };

  constructor(props) {
    super();
    if (!(props.brands && props.brands.length > 0)) {
      if (!props.isLoading) {
        props.getBrands();
      }
    }
  }

  render() {
    const {
      reviewFirstBike,
      brand,
      frameName,
      archived,
      frameArchiveList,
      bikeReviewList,
      bikeDeleteList,
      frameDeleteList,
    } = this.state;
    const { isLoading, brands, frames, bikes, saveFrame, saveBike } = this.props;
    const archivedFrames = frames ? frames.filter(frame => frame.archived) : [];
    const nonArchivedFrames = frames ? frames.filter(frame => !frame.archived) : [];
    let framesWidth = archived ? window.innerWidth * 0.75 : window.innerWidth;
    const haveFrames = doWeHaveObjects(frames);
    return (
      <Fragment key="bikeUpload">
        {reviewFirstBike && <Redirect to="/bike-review" push />}
        {!haveFrames ? (
          <BikeReviewListSelection
            brands={brands}
            onChange={this.handleInputChange}
            brand={brand}
            frameName={frameName}
            archived={archived}
            getFrameList={this.getFrameList}
            onKeyPress={this.handleKeyPress}
          />
        ) : (
          <Fragment>
            <h2>Review Frames</h2>

            <div className="row full align_right">
              <Button key="newSearch" onClick={this.showSearch}>
                New Search
              </Button>
              <Button
                key="archiveFrames"
                disabled={frameArchiveList.length === 0}
                onClick={this.archiveFrames}
              >
                Archive Frames
              </Button>
              <Button
                key="deleteFrames"
                disabled={frameDeleteList.length === 0}
                onClick={this.deleteFrames}
              >
                Delete Frames
              </Button>
              <Button
                key="deleteBikes"
                disabled={bikeDeleteList.length === 0}
                onClick={this.deleteBikes}
              >
                Delete Bikes
              </Button>
              <Button
                key="reviewBikes"
                disabled={bikeReviewList.length === 0}
                onClick={this.startReview}
              >
                Review Bikes
              </Button>
              <Button key="reviewAllBikes" onClick={this.reviewAll}>
                Review All
              </Button>
            </div>
            <div className="row">
              {nonArchivedFrames.length > 0 ? (
                <div
                  key="bikeReviewGrid"
                  className="grid"
                  style={{
                    height: window.innerHeight - 100 + 'px',
                    width: framesWidth - 50 + 'px',
                    overflow: 'scroll',
                  }}
                >
                  <div key="bikeReviewHeaders" className="grid-row grid-row--header">
                    <ModelTableHeaders modelFields={frameFields} lockFirstColumn={true} />
                    <div className="grid-item--header" />
                    <ModelTableHeaders modelFields={bikeFields} />
                    <ModelTableActionHeader />
                  </div>
                  {nonArchivedFrames.map((frame, frameIndex) =>
                    bikes
                      .filter(bike => bike.frame === frame.id)
                      .map((bike, bikeIndex) => (
                        <div key={`detailRow${frameIndex}${bikeIndex}`} className="grid-row">
                          <EditModel
                            model={frame}
                            modelFields={frameFields}
                            lockFirstColumn={true}
                            actionsRequired={true}
                            additionalActions={
                              bikeIndex === 0
                                ? frameActions(
                                    frame.id,
                                    frameArchiveList,
                                    frameDeleteList,
                                    this.changeFrameArchiveList,
                                    this.changeFrameDeleteList,
                                  )
                                : []
                            }
                            modelSave={saveFrame}
                            dummyRow={bikeIndex > 0}
                          />
                          <EditModel
                            model={bike}
                            modelFields={bikeFields}
                            actionsRequired={true}
                            additionalActions={bikeActions(
                              bike.id,
                              bikeReviewList,
                              bikeDeleteList,
                              this.changeBikeReviewList,
                              this.changeBikeDeleteList,
                            )}
                            modelSave={saveBike}
                          />
                        </div>
                      )),
                  )}
                </div>
              ) : (
                <div>No current frames found</div>
              )}
              {archived && archivedFrames.length > 0 && (
                <div
                  key="bikeArchiveGrid"
                  className="grid"
                  style={{
                    height: window.innerHeight - 100 + 'px',
                    width: window.innerWidth * 0.25 - 50 + 'px',
                    overflow: 'scroll',
                  }}
                >
                  <div key="bikeReviewHeaders" className="grid-row grid-row--header">
                    <div className="grid-item--header grid-header--fixed-left">Frame</div>
                    <div className="grid-item--header">Date Archived</div>
                    <div className="grid-item--header">Undo</div>
                  </div>
                  {archivedFrames.map((frame, frameIndex) => (
                    <div key={`archiveRow${frameIndex}`} className="grid-row">
                      <div
                        className="grid-item grid-item--fixed-left"
                        key={`archiveRowFrame${frameIndex}`}
                      >
                        {frame.frame_name}
                      </div>
                      <div className="grid-item" key={`archiveRowDate${frameIndex}`}>
                        {frame.archived_date.substring(0, 10)}
                      </div>
                      <div className="grid-item align_center" key={`archiveRowUndo${frameIndex}`}>
                        <Icon
                          key={`undo${frameIndex}`}
                          name="undo"
                          className="red"
                          onClick={() => this.restoreArchivedFrame(frame.id)}
                          title="Undo Archive of frame"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {archived && archivedFrames.length === 0 && <div>No Archived frames found</div>}
            </div>
          </Fragment>
        )}
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </Fragment>
    );
  }
}

export default BikeReviewList;
