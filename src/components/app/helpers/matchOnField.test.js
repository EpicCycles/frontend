import { matchOnField } from '../model/helpers/matchOnField';

describe('matchOnField', () => {
  const objectsToCheck = [
    { fieldName: 'Match exactly' },
    { fieldName: 'Match when change case' },
    { fieldName: 'Match-only when special characters removed!' },
    { fieldNames: 'Do not find me' },
    { fieldName: 'unused' },
  ];

  it('should match when the value is found exactly', () => {
    const expectedResult = { fieldName: 'Match exactly' };
    expect(matchOnField(objectsToCheck, 'fieldName', 'Match exactly')).toEqual(expectedResult);
    expect(matchOnField(objectsToCheck, 'fieldName', 'match exactly')).toEqual(expectedResult);
    expect(matchOnField(objectsToCheck, 'fieldName', ' match Exactly ')).toEqual(expectedResult);
    expect(matchOnField(objectsToCheck, 'fieldName', 'Match-exactly')).toEqual(expectedResult);
    expect(matchOnField(objectsToCheck, 'fieldName', 'MATCHEXACTLY')).toEqual(expectedResult);
    expect(matchOnField(objectsToCheck, 'fieldName', ' Match   exactly!! ')).toEqual(
      expectedResult,
    );
  });

  it('should return undefined when the string does not match', () => {
    expect(matchOnField(objectsToCheck, 'fieldName', 'do not find me')).not.toBeDefined();
  });

  it('should return undefined when the string is a partial match', () => {
    expect(matchOnField(objectsToCheck, 'fieldName', 'when change case')).not.toBeDefined();
  });
});
