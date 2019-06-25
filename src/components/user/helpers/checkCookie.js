const oneDay = 86400000;
const checkCookie = cookieContents => {
  const lastValidDate = new Date() - oneDay;
  if (cookieContents && cookieContents.setUpDate) return cookieContents.setUpDate > lastValidDate;
  return false;
};
export default checkCookie;
