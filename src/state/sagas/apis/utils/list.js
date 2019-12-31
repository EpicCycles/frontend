export const buildSearchCriteria = searchCriteria => {
  const keys = searchCriteria ? Object.keys(searchCriteria) : [];
  const keysWithValues = keys.filter(key => {
    if (key === 'token') return false;
    return !!searchCriteria[key];
  });
  if (keysWithValues.length > 0) {
    return `?${keysWithValues.map(key => `${key}=${searchCriteria[key]}`).join('&')}`;
  }
  return '';
};
