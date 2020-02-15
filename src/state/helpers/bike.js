import { removeObjectWithIndex, updateObject } from '../../helpers/utils';

export const findNextBikeToReview = (bikeReviewList, bikeId) => {
  const bikeIndex = bikeReviewList.indexOf(bikeId);
  return bikeReviewList[bikeIndex + 1];
};
export const removeIdFromReviewList = (bikeReviewList, bikeId) => {
  const bikeIndex = bikeReviewList.indexOf(bikeId);
  return removeObjectWithIndex(bikeReviewList, bikeIndex);
};
export const bikeToFrontEndFormat = bike => {
  const bikeParts = JSON.parse(bike.bikeParts);
  return updateObject(bike, { bikeParts });
};
export const bikeListToFrontEndFormat = bikes => {
  return bikes.map(bike => bikeToFrontEndFormat(bike));
};
