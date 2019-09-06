import { updateObject } from '../../../helpers/utils';

export const postUpdateProcessingQuoteAnswer = quoteAnswer => {
  const answer = quoteAnswer.answerText
    ? quoteAnswer.answerText === 'X'
      ? undefined
      : quoteAnswer.answerText === 'Y'
    : undefined;
  return updateObject(quoteAnswer, { answer });
};
