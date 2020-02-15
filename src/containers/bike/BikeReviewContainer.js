import { connect } from 'react-redux';
import { saveBrands } from '../../state/actions/core';
import { reviewBike, saveBike, deleteBikes, getBike } from '../../state/actions/bike';
import BikeReview from '../../components/bike/BikeReview';

const mapStateToProps = ({ core, framework, bike }) => {
  return {
    bikeId: bike.bikeId,
    bikeReviewList: bike.bikeReviewList,
    bikes: bike.bikes,
    sections: framework.sections,
    frames: bike.frames,
    brands: core.brands,
    isLoading: core.isLoading || bike.isLoading || framework.isLoading,
  };
};
const mapDispatchToProps = {
  saveBrands,
  reviewBike,
  saveBike,
  deleteBikes,
  getBike,
};
export default connect(mapStateToProps, mapDispatchToProps)(BikeReview);
