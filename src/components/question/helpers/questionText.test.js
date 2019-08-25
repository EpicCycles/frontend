import { questionText } from './questionText';

describe('questionText', () => {
  const questions = [
    { id: 2, question: 'Question 2' },
    { id: 21, question: 'Question 21' },
    { id: 1, question: 'Question 1' },
  ];
  it('should return a found name when a string id is provided', () => {
    expect(questionText('1', questions)).toEqual('Question 1');
  });
  it('should return a found name when a numeric id is provided', () => {
    expect(questionText(21, questions)).toEqual('Question 21');
  });
  it('should return unknown when an id is not in the array', () => {
    expect(questionText(212, questions)).toEqual('Unknown Question');
  });
  it('should return unknown when an id is not passed', () => {
    expect(questionText(undefined, questions)).toBeUndefined();
  });
});
