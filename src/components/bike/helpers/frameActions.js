export const frameActions = (
  frameId,
  frameArchiveList,
  frameDeleteList,
  changeFrameArchiveList,
  changeFrameDeleteList,
) => {
  const onArchiveList = frameArchiveList.includes(frameId);
  const onDeleteList = frameDeleteList.includes(frameId);
  return [
    {
      iconName: 'archive',
      iconTitle: 'Archive this frame and all related bikes',
      className: onArchiveList ? 'red' : '',
      iconAction: () => !onDeleteList && changeFrameArchiveList(frameId),
      iconDisabled: onDeleteList,
    },
    {
      iconName: 'delete',
      iconTitle: 'Delete this frame and all related bikes',
      className: onDeleteList ? 'red' : '',
      iconAction: () => !onArchiveList && changeFrameDeleteList(frameId),
      iconDisabled: onArchiveList,
    },
  ];
};
