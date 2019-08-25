import { findObjectWithId } from '../../../helpers/utils';

export const questionText = (questionId, questions) => {
  if (!questionId) return undefined;
  const question = findObjectWithId(questions, questionId);
  if (question) return question.question;
  return 'Unknown Question';
};