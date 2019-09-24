import {EMAIL_ERROR, searchEmailValidator} from './search';

describe('search.searchEmailValidator', () => {
  it('should not return an error if an email address has > 4 characters', () => {
    expect(searchEmailValidator('anna.', {})).toBeUndefined();
  });
  it('should return an error if an email address has < 4 characters', () => {
    expect(searchEmailValidator('ann.', {})).toBe(EMAIL_ERROR);
  });
  it('should return an error if an email address has < 4 characters', () => {
    expect(searchEmailValidator('ann@', {})).toBe(EMAIL_ERROR);
  });
  it('should not return an error if no email but dta is vak=lid oterwise', () => {
    expect(searchEmailValidator('', {firstName: 'ob'})).toBeUndefined();
  });
});
