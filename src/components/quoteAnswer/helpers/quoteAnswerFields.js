// fields on model are quote, question, answer
import { SELECT_ONE, TEXT } from '../../app/model/helpers/fields';
import { SELECT_ONE_MISSING } from '../../app/model/helpers/error';
import { postUpdateProcessingQuoteAnswer } from './postUpdateProcessQuoteAnswer';
const answerChoices = [
  { name: 'Unknown', value: '', isDefault: true },
  { name: 'Yes', value: 'Y' },
  { name: 'No', value: 'N' },
];

const QUESTION_TEXT_FIELD = {
  fieldName: 'questionText',
  header: 'Question',
  type: TEXT,
  displaySize: 100,
  maxLength: 200,
  maxWidth: '150px',
  fixed: true,
  readOnly: true,
};
const ANSWER_FIELD = {
  fieldName: 'answerText',
  header: 'Response',
  type: SELECT_ONE,
  selectList: answerChoices,
  error: SELECT_ONE_MISSING,
  addDataMethod: postUpdateProcessingQuoteAnswer,
};
export const quoteAnswerFields = [QUESTION_TEXT_FIELD, ANSWER_FIELD];
