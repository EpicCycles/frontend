export const quoteOrderChecks = (quote, questions = []) => {
  if (!quote) return false;
  let checkQuestions = questions.filter(q => !q.deleted);
  if (quote.bike) {
    if (!quote.frame_size) return false;
    if (!quote.colour) return false;
  } else {
    checkQuestions = checkQuestions.filter(q => !q.bike_only);
  }
  const currentAnswers = quote.quoteAnswers ? quote.quoteAnswers : [];
  return checkQuestions.every(q =>
    currentAnswers.some(qa => qa.quote === quote.id && qa.question === q.id),
  );
};
