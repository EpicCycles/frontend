import { questionText } from '../../question/helpers/questionText';

export const displayQuoteAnswer = (quote, questions, quoteAnswers, quoteCharges) => {
  const questionsToUse = quote.bike ? questions : questions.filter(q => !q.bike_only);

  function buildDisplayAnswer(q) {
    const quoteAnswer = quoteAnswers.find(qa => qa.quote === quote.id && qa.question === q.id);
    const quoteCharge = quoteCharges.find(qc => qc.quote === quote.id && qc.charge === q.charge);
    const dummyKey = quoteAnswer ? undefined : `answer_${q.id}`;
    return {
      question: q.id,
      questionText: questionText(q.id, questions),
      answerText: quoteAnswer ? (quoteAnswer.answer ? 'Y' : 'N') : 'X',
      quote: quote.id,
      answer: quoteAnswer && quoteAnswer.answer,
      id: quoteAnswer && quoteAnswer.id,
      price: quoteCharge && quoteCharge.price,
      dummyKey,
    };
  }

  let quoteAnswerArray = questionsToUse.filter(q => !q.deleted).map(q => buildDisplayAnswer(q));
  questionsToUse
    .filter(q => q.deleted)
    .forEach(q => {
      const quoteAnswer = quoteAnswers.find(qa => qa.quote === quote.id && qa.question === q.id);
      if (quoteAnswer) quoteAnswerArray.push(buildDisplayAnswer(q));
    });
  return quoteAnswerArray;
};
