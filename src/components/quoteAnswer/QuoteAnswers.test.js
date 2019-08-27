import QuoteAnswers from './QuoteAnswers';
import React from 'react';

describe('QuoteAnswers', () => {
  const questions = [
    { id: 1, question: 'Question 1', bike_only: false },
    { id: 2, question: 'Question 2', bike_only: true },
    { id: 3, question: 'Question 3', bike_only: true, charge: 23 },
    { id: 4, question: 'Question 4 deleted', deleted: true, charge: 23 },
  ];
  it('should show a row for every question', () => {
    const quote = { id: 231, bike: 1234 };
    const component = shallow(
      <QuoteAnswers
        saveQuoteAnswer={jest.fn()}
        deleteQuoteAnswer={jest.fn()}
        questions={questions}
        quote={quote}
      />,
    );
    expect(component.find('EditModelSimple')).toHaveLength(3);
  });
});
