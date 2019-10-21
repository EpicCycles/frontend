export const CREATE_QUOTE = 'quote/QUOTE_CREATE';
export const COPY_QUOTE = 'quote/QUOTE_COPY';
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
export const SAVE_QUOTE_PART = 'quote/SAVE_QUOTE_PART';
export const DELETE_QUOTE_PART = 'quote/DELETE_QUOTE_PART';
export const SAVE_QUOTE_CHARGE = 'quote/SAVE_QUOTE_CHARGE';
export const DELETE_QUOTE_CHARGE = 'quote/DELETE_QUOTE_CHARGE';
export const SAVE_QUOTE_ANSWER = 'quote/SAVE_QUOTE_ANSWER';
export const DELETE_QUOTE_ANSWER = 'quote/DELETE_QUOTE_ANSWER';

export const clearQuoteState = () => ({
  type: CLEAR_QUOTE_DATA,
});

export const saveQuotePart = (quotePart, part) => ({
  type: `${SAVE_QUOTE_PART}_REQUESTED`,
  payload: { quotePart, part },
});
export const saveQuotePartOK = (quotePart, existingKey) => ({
  type: `${SAVE_QUOTE_PART}_OK`,
  payload: { quotePart, existingKey },
});
export const saveQuotePartError = payload => ({
  type: `${SAVE_QUOTE_PART}_ERROR`,
  payload,
});
export const deleteQuotePart = quotePartId => ({
  type: `${DELETE_QUOTE_PART}_REQUESTED`,
  payload: { quotePartId },
});
export const deleteQuotePartOK = quotePartId => ({
  type: `${DELETE_QUOTE_PART}_OK`,
  payload: { quotePartId },
});
export const deleteQuotePartError = error => ({
  type: `${DELETE_QUOTE_PART}_ERROR`,
  payload: error,
});
export const saveQuoteCharge = quoteCharge => ({
  type: `${SAVE_QUOTE_CHARGE}_REQUESTED`,
  payload: { quoteCharge },
});
export const saveQuoteChargeOK = (quoteCharge, existingKey) => ({
  type: `${SAVE_QUOTE_CHARGE}_OK`,
  payload: { quoteCharge, existingKey },
});
export const saveQuoteChargeError = payload => ({
  type: `${SAVE_QUOTE_CHARGE}_ERROR`,
  payload,
});
export const deleteQuoteCharge = quoteChargeId => ({
  type: `${DELETE_QUOTE_CHARGE}_REQUESTED`,
  payload: { quoteChargeId },
});
export const deleteQuoteChargeOK = quoteChargeId => ({
  type: `${DELETE_QUOTE_CHARGE}_OK`,
  payload: { quoteChargeId },
});
export const deleteQuoteChargeError = error => ({
  type: `${DELETE_QUOTE_CHARGE}_ERROR`,
  payload: error,
});
export const saveQuoteAnswer = quoteAnswer => ({
  type: `${SAVE_QUOTE_ANSWER}_REQUESTED`,
  payload: { quoteAnswer },
});
export const saveQuoteAnswerOK = (quoteAnswer, existingKey) => ({
  type: `${SAVE_QUOTE_ANSWER}_OK`,
  payload: { quoteAnswer, existingKey },
});
export const saveQuoteAnswerError = payload => ({
  type: `${SAVE_QUOTE_ANSWER}_ERROR`,
  payload,
});
export const deleteQuoteAnswer = quoteAnswerId => ({
  type: `${DELETE_QUOTE_ANSWER}_REQUESTED`,
  payload: { quoteAnswerId },
});
export const deleteQuoteAnswerOK = quoteAnswerId => ({
  type: `${DELETE_QUOTE_ANSWER}_OK`,
  payload: { quoteAnswerId },
});
export const deleteQuoteAnswerError = error => ({
  type: `${DELETE_QUOTE_ANSWER}_ERROR`,
  payload: error,
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
export const saveQuote = quote => ({
  type: `${UPDATE_QUOTE}_REQUESTED`,
  payload: { quote },
});
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

export const copyQuote = (quoteId, newQuoteData) => ({
  type: `${COPY_QUOTE}_REQUESTED`,
  payload: { quoteId, newQuoteData },
});
export const copyQuoteOK = responseData => ({
  type: `${COPY_QUOTE}_OK`,
  payload: responseData,
});
export const copyQuoteError = error => ({
  type: `${COPY_QUOTE}_ERROR`,
  payload: error,
});
