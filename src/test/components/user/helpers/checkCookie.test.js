import checkCookie from '../../../../components/user/helpers/checkCookie';

describe('checkCookie', () => {
  const dateValid = new Date() + 86400000 - 1;
  const dateExpired = new Date() + 86400001;
  it('should return false when there is no set up date', () => {
    const cookieContents = '';
    expect(checkCookie(cookieContents)).toBeFalsy();
  });
  it('should return false when there is a user but no set up date', () => {
    const cookieContents = { user: { id: 'a user' } };
    expect(checkCookie(cookieContents)).toBeFalsy();
  });
  it('should return false when there is a set up date more than a day old', () => {
    const cookieContents = { user: { id: 'a user' }, setUpDate: dateExpired };
    expect(checkCookie(cookieContents)).toBeFalsy();
  });
  it('should return true when there is a set up date within a day old', () => {
    const cookieContents = { user: { id: 'a user' }, setUpDate: dateValid };
    expect(checkCookie(cookieContents)).toBeFalsy();
  });
});
