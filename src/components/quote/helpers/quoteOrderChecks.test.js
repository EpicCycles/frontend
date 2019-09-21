import { quoteOrderChecks } from './quoteOrderChecks';

describe('quoteOrderChecks', () => {
  const questions = [
    { id: 1, question: 'Question 1', bike_only: false },
    { id: 2, question: 'Question 2', bike_only: true },
    { id: 3, question: 'Question 3', bike_only: true, charge: 23 },
    { id: 4, question: 'Question 4 deleted', deleted: true, charge: 23 },
  ];
  describe('tests for non-bike quotes', () => {
    it('should allow order when all questions have answer for non-bike quote', () => {
      const quote = { id: 231 };
      const quoteAnswers = [
        { id: 2311, quote: 231, question: 4, answer: false },
        { id: 2312, quote: 231, question: 1, answer: true },
      ];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeTruthy();
    });
    it('should not allow order when any current question missing answer for non-bike quote', () => {
      const quote = { id: 231 };
      const quoteAnswers = [{ id: 2311, quote: 231, question: 4, answer: false }];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeDefined();
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeFalsy();
    });
    it('should allow order when all current questions have answer for non-bike quote', () => {
      const quote = { id: 231 };
      const quoteAnswers = [{ id: 2312, quote: 231, question: 1, answer: true }];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeTruthy();
    });
  });
  describe('tests for bike quotes', () => {
    it('should not allow order when bike quote is missing size', () => {
      const quote = { id: 231, bike: 14, colour: 'red' };
      const quoteAnswers = [
        { id: 2311, quote: 231, question: 4, answer: false },
        { id: 2311, quote: 231, question: 3, answer: false },
        { id: 2311, quote: 231, question: 2, answer: false },
        { id: 2312, quote: 231, question: 1, answer: true },
      ];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeDefined();
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeFalsy();
    });
    it('should not allow order when bike quote is missing colour', () => {
      const quote = { id: 231, bike: 14, frame_size: '54' };
      const quoteAnswers = [
        { id: 2311, quote: 231, question: 4, answer: false },
        { id: 2311, quote: 231, question: 3, answer: false },
        { id: 2311, quote: 231, question: 2, answer: false },
        { id: 2312, quote: 231, question: 1, answer: true },
      ];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeDefined();
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeFalsy();
    });
    it('should allow order when data is complete and questions have answer for bike quote', () => {
      const quote = { id: 231, bike: 14, frame_size: '54', colour: 'red' };
      const quoteAnswers = [
        { id: 2311, quote: 231, question: 4, answer: false },
        { id: 2311, quote: 231, question: 3, answer: false },
        { id: 2311, quote: 231, question: 2, answer: false },
        { id: 2312, quote: 231, question: 1, answer: true },
      ];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeTruthy();
    });
    it('should not allow order when any current question missing answer for bike quote', () => {
      const quote = { id: 231, bike: 14, frame_size: '54', colour: 'red' };
      const quoteAnswers = [
        { id: 2311, quote: 231, question: 1, answer: false },
        { id: 2311, quote: 231, question: 2, answer: false },
        { id: 2311, quote: 231, question: 4, answer: false },
      ];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeDefined();
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeFalsy();
    });
    it('should allow order when all current questions have answer for bike quote', () => {
      const quote = { id: 231, bike: 14, frame_size: '54', colour: 'red' };
      const quoteAnswers = [
        { id: 2311, quote: 231, question: 1, answer: false },
        { id: 2311, quote: 231, question: 3, answer: false },
        { id: 2311, quote: 231, question: 2, answer: false },
      ];
      expect(quoteOrderChecks(quote, questions, quoteAnswers)).toBeTruthy();
    });
  });
});
