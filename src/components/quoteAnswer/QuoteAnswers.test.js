import QuoteAnswers from './QuoteAnswers';
import { updateObject } from '../../helpers/utils';

describe('QuoteAnswers', () => {
  const questions = [
    { id: 1, question: 'Question 1', bike_only: false },
    { id: 2, question: 'Question 2', bike_only: true },
    { id: 3, question: 'Question 3', bike_only: true, charge: 23 },
    { id: 4, question: 'Question 4 deleted', deleted: true, charge: 23 },
  ];
  const charges = [
    { id: 21, price: 30 },
    { id: 22, percentage: 25 },
  ];
  it('should show a row for every question', () => {
    const quote = { id: 231, bike: 1234, answers: [{ question: 1, answer: 'Y' }] };
    const component = shallow(
      <QuoteAnswers
        saveQuoteAnswer={jest.fn()}
        deleteQuoteAnswer={jest.fn()}
        questions={questions}
        quote={quote}
      />,
    );
    expect(component.find('EditModel')).toHaveLength(3);
  });
  it('should remove an answer when save and answer set to unknown', () => {
    const quote = { id: 231, bike: 1234, answers: [{ id: 12, question: 1, answer: true }] };
    const component = shallow(
      <QuoteAnswers
        saveQuoteAnswer={jest.fn()}
        deleteQuoteAnswer={jest.fn()}
        questions={questions}
        quote={quote}
      />,
    );
    expect(component.find('EditModel')).toHaveLength(3);
    expect(
      component
        .find('EditModel')
        .at(0)
        .prop('model').answerText,
    ).toEqual('Y');

    const updatedValue = updateObject(
      component
        .find('EditModel')
        .at(0)
        .prop('model'),
      { answer: undefined, answerText: 'X' },
    );
    component
      .find('EditModel')
      .at(0)
      .prop('modelSave')(updatedValue);

    expect(
      component
        .find('EditModel')
        .at(0)
        .prop('model').id,
    ).not.toBeDefined();
    expect(
      component
        .find('EditModel')
        .at(0)
        .prop('model').answerText,
    ).toEqual('X');
    expect(
      component
        .find('EditModel')
        .at(1)
        .prop('model').answerText,
    ).toEqual('X');
    expect(
      component
        .find('EditModel')
        .at(2)
        .prop('model').answerText,
    ).toEqual('X');
  });
  it('should delete an existing answer when delete is requested', () => {
    const quote = { id: 231, bike: 1234, answers: [{ id: 123, question: 1, answer: 'Y' }] };
    const component = shallow(
      <QuoteAnswers
        saveQuoteAnswer={jest.fn()}
        deleteQuoteAnswer={jest.fn()}
        questions={questions}
        quote={quote}
      />,
    );
    component
      .find('EditModel')
      .at(0)
      .prop('modelDelete')(123);
    expect(
      component
        .find('EditModel')
        .at(0)
        .prop('model').answerText,
    ).toEqual('X');
  });
});
