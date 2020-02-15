import { CHANGE_ROUTE, changeRoute } from './application';

describe('application actions', () => {
  it('should create an action when change route is required', () => {
    expect(changeRoute('myRoute', true)).toEqual({
      type: CHANGE_ROUTE,
      payload: { newRoute: 'myRoute', clearState: true },
    });
  });
});
