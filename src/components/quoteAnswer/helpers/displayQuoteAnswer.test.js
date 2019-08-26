import { displayQuoteAnswer } from './displayQuoteAnswer';

describe('displayQuoteAnswer', () => {
  const questions = [
    { id: 1, question: 'Question 1', bike_only: false },
    { id: 2, question: 'Question 2', bike_only: true },
    { id: 3, question: 'Question 3', bike_only: true, charge: 23 },
    { id: 4, question: 'Question 4 deleted', deleted: true, charge: 23 },
  ];
  it('should show all questions when quote is bike quote', () => {
    const quote = { id: 231, bike: 1234 };
    const expectedAnswers = [
      {
        quote: 231,
        question: 1,
        questionText: 'Question 1',
        answerText: '',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_1',
      },
      {
        quote: 231,
        question: 2,
        questionText: 'Question 2',
        answerText: '',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_2',
      },
      {
        quote: 231,
        question: 3,
        questionText: 'Question 3',
        answerText: '',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_3',
      },
    ];
    expect(displayQuoteAnswer(quote, questions, [], [])).toEqual(expectedAnswers);
  });
  it('should show some questions when quote is not abike quote', () => {
    const quote = { id: 231 };
    const expectedAnswers = [
      {
        quote: 231,
        question: 1,
        questionText: 'Question 1',
        answerText: '',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_1',
      },
    ];
    expect(displayQuoteAnswer(quote, questions, [], [])).toEqual(expectedAnswers);
  });
  it('should show a deleted question when an answer exists for it', () => {
    const quote = { id: 231 };
    const quoteAnswers = [
      { id: 2311, quote: 231, question: 4, answer: false },
      { id: 2312, quote: 231, question: 1, answer: true },
    ];
    const expectedAnswers = [
      {
        id: 2312,
        quote: 231,
        question: 1,
        questionText: 'Question 1',
        answerText: 'Y',
        answer: true,
        price: undefined,
        dummyKey: undefined,
      },
      {
        id: 2311,
        quote: 231,
        question: 4,
        questionText: 'Question 4 deleted',
        answerText: 'N',
        answer: false,
        price: undefined,
        dummyKey: undefined,
      },
    ];
    expect(displayQuoteAnswer(quote, questions, quoteAnswers, [])).toEqual(expectedAnswers);
  });
});
