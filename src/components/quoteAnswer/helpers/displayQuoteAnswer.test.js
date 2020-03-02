import { displayQuoteAnswer } from './displayQuoteAnswer';

describe('displayQuoteAnswer', () => {
  const questions = [
    { id: 1, question: 'Question 1', bike_only: false, charge: 23 },
    { id: 2, question: 'Question 2', bike_only: true },
    { id: 3, question: 'Question 3', bike_only: true },
    { id: 4, question: 'Question 4 deleted', deleted: true, charge: 64 },
  ];
  it('should show all questions when quote is bike quote', () => {
    const quote = { id: 231, bike: 1234 };
    const expectedAnswers = [
      {
        question: 1,
        questionText: 'Question 1',
        answerText: 'X',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_1',
      },
      {
        question: 2,
        questionText: 'Question 2',
        answerText: 'X',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_2',
      },
      {
        question: 3,
        questionText: 'Question 3',
        answerText: 'X',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_3',
      },
    ];
    expect(displayQuoteAnswer(quote, questions)).toEqual(expectedAnswers);
  });
  it('should show some questions when quote is not a bike quote', () => {
    const quote = { id: 231 };
    const expectedAnswers = [
      {
        question: 1,
        questionText: 'Question 1',
        answerText: 'X',
        answer: undefined,
        id: undefined,
        price: undefined,
        dummyKey: 'answer_1',
      },
    ];
    expect(displayQuoteAnswer(quote, questions)).toEqual(expectedAnswers);
  });
  it('should show a deleted question when an answer exists for it', () => {
    const quote = {
      id: 231,
      answers: [
        { id: 2311, quote: 231, question: 4, answer: false },
        { id: 2312, quote: 231, question: 1, answer: true },
      ],
    };
    const expectedAnswers = [
      {
        id: 2312,
        question: 1,
        questionText: 'Question 1',
        answerText: 'Y',
        answer: true,
        price: undefined,
        dummyKey: undefined,
      },
      {
        id: 2311,
        question: 4,
        questionText: 'Question 4 deleted',
        answerText: 'N',
        answer: false,
        price: undefined,
        dummyKey: undefined,
      },
    ];
    expect(displayQuoteAnswer(quote, questions)).toEqual(expectedAnswers);
  });
  it('should show a charge when it has been entered', () => {
    const quote = {
      id: 231,
      answers: [{ id: 2312, quote: 231, question: 1, answer: true }],
      charges: [
        { id: 1, charge: 23, price: 45.0 },
        { id: 2, charge: 64, price: 30.0 },
      ],
    };
    const expectedAnswers = [
      {
        id: 2312,
        question: 1,
        questionText: 'Question 1',
        answerText: 'Y',
        answer: true,
        price: 45.0,
        dummyKey: undefined,
      },
      {
        id: undefined,
        question: 4,
        questionText: 'Question 4 deleted',
        answerText: 'X',
        answer: undefined,
        price: 30.0,
        dummyKey: 'answer_4',
      },
    ];
    expect(displayQuoteAnswer(quote, questions)).toEqual(expectedAnswers);
  });
});
