export const quoteOrderChecks = (quote, questions = [], quoteAnswers = []) => {
  if (!quote) return false;
  let checkQuestions = questions.filter(q => !q.deleted);
  if (quote.bike) {
    if (!quote.frame_size) return false;
    if (!quote.colour) return false;
  } else {
    checkQuestions = checkQuestions.filter(q => !q.bike_only);
  }
  return checkQuestions.every(q =>
    quoteAnswers.some(qa => qa.quote === quote.id && qa.question === q.id),
  );
};
