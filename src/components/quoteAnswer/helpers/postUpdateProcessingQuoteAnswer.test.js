import { postUpdateProcessingQuoteAnswer } from './postUpdateProcessQuoteAnswer';

describe('postUpdateProcessingQuoteAnswer', () => {
  it('should set the answer to be undefined when no answer is given', () => {
    const quoteAnswer = { answerText: 'X', answer: true };
    const quoteAnswerExpected = { answerText: 'X' };
    expect(postUpdateProcessingQuoteAnswer(quoteAnswer)).toEqual(quoteAnswerExpected);
  });
  it('should set the answer to be undefined when no answer is present', () => {
    const quoteAnswer = { answerText: '', answer: true };
    const quoteAnswerExpected = { answerText: '' };
    expect(postUpdateProcessingQuoteAnswer(quoteAnswer)).toEqual(quoteAnswerExpected);
  });
  it('should set the answer to be true when the text is Y', () => {
    const quoteAnswer = { answerText: 'Y', answer: undefined };
    const quoteAnswerExpected = { answerText: 'Y', answer: true };
    expect(postUpdateProcessingQuoteAnswer(quoteAnswer)).toEqual(quoteAnswerExpected);
  });
  it('should set the answer to be false when the text is not Y', () => {
    const quoteAnswer = { answerText: 'N', answer: undefined };
    const quoteAnswerExpected = { answerText: 'N', answer: false };
    expect(postUpdateProcessingQuoteAnswer(quoteAnswer)).toEqual(quoteAnswerExpected);
  });
});
