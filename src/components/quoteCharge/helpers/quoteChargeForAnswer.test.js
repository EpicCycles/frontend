import { quoteChargeForAnswer } from './quoteChargeForAnswer';

describe('quoteChargeForAnswer', () => {
  const questions = [{ id: 1, charge: 21 }, { id: 2, charge: 22 }, { id: 3 }];
  const charges = [
    { id: 21, price: 30 },
    { id: 22, percentage: 25 },
  ];
  it('should add no charge when answer is false', () => {
    const answer = { question: 1, answer: false };
    const quote = { id: 123, charges: [] };
    expect(quoteChargeForAnswer(quote, answer, questions, charges)).toEqual(quote);
  });
  it('should add no charge when a related charge on quote', () => {
    const answer = { question: 1, answer: true };
    const quote = { id: 123, charges: [{ charge: 21, price: 35 }] };
    expect(quoteChargeForAnswer(quote, answer, questions, charges)).toEqual(quote);
  });
  it('should add no charge when answer has no charge associated', () => {
    const answer = { question: 3, answer: true };
    const quote = { id: 123, charges: [{ charge: 21, price: 35 }] };
    expect(quoteChargeForAnswer(quote, answer, questions, charges)).toEqual(quote);
  });
  it('should add a fixed charge when charge is fixed price', () => {
    const answer = { question: 1, answer: true };
    // const quote = { id: 123, charges: [{ charge: 22, price: 22 }] };
    const quote = { id: 123 };
    const expectedQuote = {
      id: 123,
      charges: [{ charge: 21, price: 30, id: 1 }],
      calculated_price: 0,
      changed: true,
      charges_total: 30,
      fixed_price_total: 0,
      quote_price: undefined,
      total_price: 30,
    };
    expect(quoteChargeForAnswer(quote, answer, questions, charges)).toEqual(expectedQuote);
  });
  it('should add a percentage charge on calculated price when charge is a percentage', () => {
    const answer = { question: 2, answer: true };
    const quote = {
      id: 123,
      bike: 12,
      bike_price: 1000,
      charges: [{ id: 1, charge: 11, price: 35 }],
    };
    const expectedQuote = {
      id: 123,
      bike: 12,
      bike_price: 1000,
      calculated_price: 1000,
      fixed_price_total: 0,
      charges: [
        { id: 1, charge: 11, price: 35 },
        { id: 2, charge: 22, price: 250 },
      ],
      changed: true,
      charges_total: 285,
      quote_price: undefined,
      total_price: 1285,
    };
    expect(quoteChargeForAnswer(quote, answer, questions, charges)).toEqual(expectedQuote);
  });
});
