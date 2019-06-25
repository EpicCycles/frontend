export const getCookie = cname => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
};

export const getCookieObject = cname => {
  const rawCookie = getCookie(cname);
  if (rawCookie) return JSON.parse(rawCookie);
};
export const createCookie = (cname, contents) => {
  if (cname && contents) {
    const exdate = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${cname}=${JSON.stringify(contents)}; expires=${exdate}`;
  }
};
export const deleteCookie = cname => {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
