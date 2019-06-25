export const bikeActions = (
  bikeId,
  bikeReviewList,
  bikeDeleteList,
  changeBikeReviewList,
  changeBikeDeleteList,
) => {
  const onReviewList = bikeReviewList.includes(bikeId);
  const onDeleteList = bikeDeleteList.includes(bikeId);
  return [
    {
      iconName: 'edit outline',
      iconTitle: 'Review this bike',
      className: onReviewList ? 'red' : '',
      iconAction: () => !onDeleteList && changeBikeReviewList(bikeId),
      iconDisabled: onDeleteList,
    },
    {
      iconName: 'delete',
      iconTitle: 'Delete this bike',
      className: onDeleteList ? 'red' : '',
      iconAction: () => !onReviewList && changeBikeDeleteList(bikeId),
      iconDisabled: onReviewList,
    },
  ];
};
