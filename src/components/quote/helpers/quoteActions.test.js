import { quoteActions } from './quoteActions';
import { QUOTE_ARCHIVED, QUOTE_INITIAL, QUOTE_ISSUED, QUOTE_ORDERED } from './quote';

describe('quoteActions', () => {
  it('should return an empty array when non actions are passed', () => {
    expect(quoteActions({}, {})).toEqual([]);
  });
  it('should have clone quote with the quote id when quote has an id', () => {
    const quote = { id: 23 };
    const cloneQuote = jest.fn();
    const availableActions = { cloneQuote };
    const expectedActions = [
      {
        iconName: 'clone',
        iconTitle: 'copy quote',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have clone quote disabled when quote has no id', () => {
    const quote = {};
    const cloneQuote = jest.fn();
    const availableActions = { cloneQuote };
    const expectedActions = [
      {
        iconName: 'clone',
        iconTitle: 'copy quote',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have get quote with the quote id when quote has an id', () => {
    const quote = { id: 23 };
    const getQuote = jest.fn();
    const availableActions = { getQuote };
    const expectedActions = [
      {
        iconName: 'edit',
        iconTitle: 'edit quote',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have get quote disabled when quote has no id', () => {
    const quote = {};
    const getQuote = jest.fn();
    const availableActions = { getQuote };
    const expectedActions = [
      {
        iconName: 'edit',
        iconTitle: 'edit quote',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have issue quote with the quote id when quote is new', () => {
    const quote = { id: 23, quote_status: QUOTE_INITIAL };
    const issueQuote = jest.fn();
    const availableActions = { issueQuote };
    const expectedActions = [
      {
        iconName: 'mail',
        iconTitle: 'issue quote',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have issue quote disabled when quote status is not initial', () => {
    const quote = {};
    const issueQuote = jest.fn();
    const availableActions = { issueQuote };
    const expectedActions = [
      {
        iconName: 'mail',
        iconTitle: 'issue quote',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have change quote enabled when the quote is not archived', () => {
    const quote = { id: 23, quote_status: QUOTE_INITIAL };
    const changeQuote = jest.fn();
    const availableActions = { changeQuote };
    const expectedActions = [
      {
        iconName: 'eye',
        iconTitle: 'view quote',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have change quote disabled when quote status is archived', () => {
    const quote = { quote_status: QUOTE_ARCHIVED };
    const changeQuote = jest.fn();
    const availableActions = { changeQuote };
    const expectedActions = [
      {
        iconName: 'eye',
        iconTitle: 'view quote',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have archive quote enabled when the quote is not archived', () => {
    const quote = { id: 23, quote_status: QUOTE_INITIAL };
    const archiveQuote = jest.fn();
    const availableActions = { archiveQuote };
    const expectedActions = [
      {
        iconName: 'remove',
        iconTitle: 'archive quote',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have archive quote disabled when quote status is archived', () => {
    const quote = { quote_status: QUOTE_ARCHIVED };
    const archiveQuote = jest.fn();
    const availableActions = { archiveQuote };
    const expectedActions = [
      {
        iconName: 'remove',
        iconTitle: 'archive quote',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have unarchive quote enabled when the quote is archived', () => {
    const quote = { id: 23, quote_status: QUOTE_ARCHIVED };
    const unarchiveQuote = jest.fn();
    const availableActions = { unarchiveQuote };
    const expectedActions = [
      {
        iconName: 'undo',
        iconTitle: 'un-archive quote',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have unarchive quote disabled when quote status is not archived', () => {
    const quote = { quote_status: QUOTE_ORDERED };
    const unarchiveQuote = jest.fn();
    const availableActions = { unarchiveQuote };
    const expectedActions = [
      {
        iconName: 'undo',
        iconTitle: 'un-archive quote',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have place enabled when the quote is issued', () => {
    const quote = { id: 23, quote_status: QUOTE_ISSUED };
    const placeOrder = jest.fn();
    const availableActions = { placeOrder };
    const expectedActions = [
      {
        iconName: 'thumbs up',
        iconTitle: 'place order',
        iconAction: expect.any(Function),
        iconDisabled: false,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
  it('should have place disabled when quote status is not issued', () => {
    const quote = { quote_status: QUOTE_ARCHIVED };
    const placeOrder = jest.fn();
    const availableActions = { placeOrder };
    const expectedActions = [
      {
        iconName: 'thumbs up',
        iconTitle: 'place order',
        iconAction: expect.any(Function),
        iconDisabled: true,
      },
    ];
    expect(quoteActions(quote, availableActions)).toEqual(expectedActions);
  });
});
