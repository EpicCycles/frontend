import application from './application';
import { FRAMEWORK_SAVE } from '../actions/framework';

describe('application reducer', () => {
  it('should add a changes saved message when required', () => {
    const initialState = { someData: 'is set', message: 'Old message' };
    const expectedState = { someData: 'is set', message: 'Changes saved', messageType: 'I' };
    expect(application(initialState, { type: FRAMEWORK_SAVE })).toEqual(expectedState);
  });
});
