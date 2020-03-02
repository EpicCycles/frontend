import { questionText } from '../../question/helpers/questionText';

export const displayQuoteAnswer = (quote, questions) => {
  const { answers, bike, charges } = quote;
  const questionsToUse = bike ? questions : questions.filter(q => !q.bike_only);

  return questionsToUse
    .filter(q => {
      const quoteAnswer = answers ? answers.find(qa => qa.question === q.id) : undefined;
         const quoteCharge = charges ? charges.find(qc => qc.charge === q.charge) : undefined;
   return !!quoteAnswer  || !! quoteCharge|| !q.deleted;
    })
    .map(q => {
      const quoteAnswer = answers ? answers.find(qa => qa.question === q.id) : undefined;
      const quoteCharge = charges ? charges.find(qc => qc.charge === q.charge) : undefined;
      const dummyKey = quoteAnswer ? undefined : `answer_${q.id}`;
      return {
        question: q.id,
        questionText: questionText(q.id, questions),
        answerText: quoteAnswer ? (quoteAnswer.answer ? 'Y' : 'N') : 'X',
        answer: quoteAnswer && quoteAnswer.answer,
        id: quoteAnswer && quoteAnswer.id,
        price: quoteCharge && quoteCharge.price,
        dummyKey,
      };
    });
};
