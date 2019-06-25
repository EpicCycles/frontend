export const needToLogin = (user, currentPath, userCookie) => {
  if (currentPath.endsWith('login')) return false;

  if (user || (userCookie && userCookie.user)) return false;
  return true;
};
