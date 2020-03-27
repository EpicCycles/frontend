export const CREATE_QUOTE = 'quote/QUOTE_CREATE';
export const GET_QUOTE_TO_COPY = 'quote/GET_QUOTE_TO_COPY';
export const FIND_QUOTES = 'quote/QUOTE_SEARCH';
export const GET_QUOTE = 'quote/QUOTE_FETCH';
export const CHANGE_QUOTE = 'quote/QUOTE_CHANGE';
export const ARCHIVE_QUOTE = 'quote/QUOTE_ARCHIVE';
export const ISSUE_QUOTE = 'quote/QUOTE_ISSUE';
export const ORDER_QUOTE = 'quote/QUOTE_ORDER';
export const UNARCHIVE_QUOTE = 'quote/QUOTE_UNARCHIVE';
export const UPDATE_QUOTE = 'quote/QUOTE_PUT';
export const CLEAR_QUOTE_DATA = 'quote/QUOTE_CLEAR';

export const clearQuoteState = () => ({
  type: CLEAR_QUOTE_DATA,
});

export const createQuote = quote => ({
  type: `${CREATE_QUOTE}_REQUESTED`,
  payload: { quote },
});
export const createQuoteOK = responseData => ({
  type: `${CREATE_QUOTE}_OK`,
  payload: responseData,
});
export const createQuoteError = error => ({
  type: `${CREATE_QUOTE}_ERROR`,
  payload: error,
});
export const changeQuote = quoteId => ({
  type: CHANGE_QUOTE,
  payload: { quoteId },
});
export const getQuote = quoteId => ({
  type: `${GET_QUOTE}_REQUESTED`,
  payload: { quoteId },
});
export const getQuoteOK = responseData => ({
  type: `${GET_QUOTE}_OK`,
  payload: responseData,
});
export const getQuoteError = error => ({
  type: `${GET_QUOTE}_ERROR`,
  payload: error,
});
export const getQuoteToCopy = quoteId => ({
  type: `${GET_QUOTE_TO_COPY}_REQUESTED`,
  payload: { quoteId },
});
export const getQuoteToCopyOK = responseData => ({
  type: `${GET_QUOTE_TO_COPY}_OK`,
  payload: responseData,
});
export const getQuoteToCopyError = error => ({
  type: `${GET_QUOTE_TO_COPY}_ERROR`,
  payload: error,
});

export const archiveQuote = quoteId => ({
  type: `${ARCHIVE_QUOTE}_REQUESTED`,
  payload: { quoteId },
});
export const archiveQuoteOK = responseData => ({
  type: `${ARCHIVE_QUOTE}_OK`,
  payload: responseData,
});
export const archiveQuoteError = error => ({
  type: `${ARCHIVE_QUOTE}_ERROR`,
  payload: error,
});

export const issueQuote = quoteId => ({
  type: `${ISSUE_QUOTE}_REQUESTED`,
  payload: { quoteId },
});
export const issueQuoteOK = responseData => ({
  type: `${ISSUE_QUOTE}_OK`,
  payload: responseData,
});
export const issueQuoteError = error => ({
  type: `${ISSUE_QUOTE}_ERROR`,
  payload: error,
});

export const orderQuote = quoteId => ({
  type: `${ORDER_QUOTE}_REQUESTED`,
  payload: { quoteId },
});
export const orderQuoteOK = responseData => ({
  type: `${ORDER_QUOTE}_OK`,
  payload: responseData,
});
export const orderQuoteError = error => ({
  type: `${ORDER_QUOTE}_ERROR`,
  payload: error,
});

export const unarchiveQuote = quoteId => ({
  type: `${UNARCHIVE_QUOTE}_REQUESTED`,
  payload: { quoteId },
});
export const unarchiveQuoteOK = responseData => ({
  type: `${UNARCHIVE_QUOTE}_OK`,
  payload: responseData,
});
export const unarchiveQuoteError = error => ({
  type: `${UNARCHIVE_QUOTE}_ERROR`,
  payload: error,
});
export const saveQuote = quote => {
  if (quote.id) {
    return {
      type: `${UPDATE_QUOTE}_REQUESTED`,
      payload: { quote },
    };
  } else {
    return {
      type: `${CREATE_QUOTE}_REQUESTED`,
      payload: { quote },
    };
  }
};
export const saveQuoteOK = responseData => ({
  type: `${UPDATE_QUOTE}_OK`,
  payload: responseData,
});
export const saveQuoteError = error => ({
  type: `${UPDATE_QUOTE}_ERROR`,
  payload: error,
});

export const getQuoteList = searchCriteria => ({
  type: `${FIND_QUOTES}_REQUESTED`,
  payload: { searchCriteria },
});
export const getQuoteListOK = responseData => ({
  type: `${FIND_QUOTES}_OK`,
  payload: responseData,
});
export const getQuoteListError = error => ({
  type: `${FIND_QUOTES}_ERROR`,
  payload: error,
});
