import { quoteToFrontEndFormat } from './quote';

describe('quoteToFrontEndFormat', () => {
  it('should provide empty arrays when attributes not provided', () => {
    const quoteFromAPi = { id: 1, quote_desc: 'no arrays' };
    const expectedResult = {
      id: 1,
      quote_desc: 'no arrays',
      quoteParts: [],
      charges: [],
      answers: [],
    };
    expect(quoteToFrontEndFormat(quoteFromAPi)).toEqual(expectedResult);
  });
  it('should provide empty arrays when attributes null', () => {
    const quoteFromAPi = {
      id: 1,
      quote_desc: 'null arrays',
      quoteParts: null,
      charges: null,
      answers: null,
    };
    const expectedResult = {
      id: 1,
      quote_desc: 'null arrays',
      quoteParts: [],
      charges: [],
      answers: [],
    };
    expect(quoteToFrontEndFormat(quoteFromAPi)).toEqual(expectedResult);
  });
  it('should provide data arrays when attributes have data', () => {
    const quoteFromAPi = {
      id: 1,
      quote_desc: 'null arrays',
      quoteParts: JSON.stringify([{ id: 212, tradeIn: true }]),
      charges: JSON.stringify([{ id: 'c1', charge: 23, price: 23.45 }]),
      answers: JSON.stringify([{ id: 34, questiion: 5, answer: false }]),
    };
    const expectedResult = {
      id: 1,
      quote_desc: 'null arrays',
      quoteParts: [{ id: 212, tradeIn: true }],
      charges: [{ id: 'c1', charge: 23, price: 23.45 }],
      answers: [{ id: 34, questiion: 5, answer: false }],
    };
    expect(quoteToFrontEndFormat(quoteFromAPi)).toEqual(expectedResult);
  });
});
