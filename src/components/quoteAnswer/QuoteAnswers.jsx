import React, { useState } from 'react';
import * as PropTypes from 'prop-types';

import { getModelKey } from '../app/model/helpers/model';
import { Dimmer, Loader } from 'semantic-ui-react';
import { displayQuoteAnswer } from './helpers/displayQuoteAnswer';
import { quoteAnswerFields } from './helpers/quoteAnswerFields';
import EditModelButtons from '../app/model/EditModelButtons';
import { updateModelArrayOnModel } from '../app/model/helpers/updateModelArrayOnModel';
import { removeModelFromArrayOnModel } from '../app/model/helpers/removeModelFromArrayOnModel';
import EditModel from '../app/model/EditModel';

const QuoteAnswers = props => {
  let [updatedQuote, setUpdatedQuote] = useState(props.quote);
  const { quote, questions, saveQuote, isLoading } = props;
  const resetQuote = () => {
    setUpdatedQuote(quote);
  };
  const saveAnswer = arrayObject => {
    if (arrayObject.answerText === 'X') {
      removeAnswer(arrayObject.id);
    } else {
      setUpdatedQuote(
        updateModelArrayOnModel(updatedQuote, 'answers', quoteAnswerDataFields, arrayObject),
      );
    }
  };
  const removeAnswer = itemId => {
    setUpdatedQuote(removeModelFromArrayOnModel(updatedQuote, 'answers', itemId));
  };
  const quoteAnswersDisplay = displayQuoteAnswer(updatedQuote, questions);

  return (
    <div className="grid-container">
      <EditModelButtons model={updatedQuote} resetChanges={resetQuote} saveModel={saveQuote} />
      <div className="grid">
        {quoteAnswersDisplay.map(answer => {
          const questionKey = getModelKey(answer);
          const rowClass = answer && answer.error ? 'error' : '';

          return (
            <div className={`grid-row ${rowClass}`} key={`row${questionKey}`}>
              <EditModel
                model={answer}
                modelFields={quoteAnswerFields}
                actionsRequired
                modelSave={saveAnswer}
                modelDelete={removeAnswer}
                showReadOnlyFields
                className="grid-item--borderless"
              />
            </div>
          );
        })}
      </div>
      {isLoading && (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )}
    </div>
  );
};
QuoteAnswers.defaultProps = {
  questions: [],
};
QuoteAnswers.propTypes = {
  isLoading: PropTypes.bool,
  questions: PropTypes.array,
  quote: PropTypes.object.isRequired,
  saveQuote: PropTypes.func.isRequired,
};
export default QuoteAnswers;
