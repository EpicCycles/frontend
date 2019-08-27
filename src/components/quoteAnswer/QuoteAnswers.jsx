import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

import { findObjectWithKey, updateObjectInArray } from '../../helpers/utils';
import { checkForChanges, getModelKey } from '../app/model/helpers/model';
import EditModelSimple from '../app/model/EditModelSimple';
import { Dimmer, Loader } from 'semantic-ui-react';
import { displayQuoteAnswer } from './helpers/displayQuoteAnswer';
import { quoteAnswerFields } from './helpers/quoteAnswerFields';

class QuoteAnswers extends PureComponent {
  state = { updatedQuoteAnswers: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedQuoteAnswers } = state;
    const { quoteAnswers } = props;

    const checkedUpdatedQuoteAnswers = [];
    updatedQuoteAnswers.forEach(updatedQuoteAnswer => {
      const persistedDetail = findObjectWithKey(quoteAnswers, getModelKey(updatedQuoteAnswer));
      if (
        persistedDetail &&
        checkForChanges(quoteAnswerFields, persistedDetail, updatedQuoteAnswer)
      )
        checkedUpdatedQuoteAnswers.push(updatedQuoteAnswer);
    });

    return {
      updatedQuoteAnswers: checkedUpdatedQuoteAnswers,
    };
  }
  raiseStateForQuoteAnswer = updatedQuoteAnswer => {
    const { updatedQuoteAnswers } = this.state;

    const newUpdatedQuoteAnswers = updateObjectInArray(updatedQuoteAnswers, updatedQuoteAnswer);
    this.setState({ updatedQuoteAnswers: newUpdatedQuoteAnswers });
  };

  render() {
    const { updatedQuoteAnswers } = this.state;
    const {
      quote,
      questions,
      quoteAnswers,
      quoteCharges,
      saveQuoteAnswer,
      deleteQuoteAnswer,
      isLoading,
    } = this.props;
    const quoteAnswersDisplay = displayQuoteAnswer(quote, questions, quoteAnswers, quoteCharges);

    return (
      <div className="grid-container">
        {quoteAnswersDisplay.map(question => {
          const questionKey = getModelKey(question);
          const updatedQuoteAnswer = findObjectWithKey(updatedQuoteAnswers, questionKey);
          const rowClass = updatedQuoteAnswer && updatedQuoteAnswer.error ? 'error' : '';

          return (
            <div className={`grid-row ${rowClass}`} key={`row${questionKey}`}>
              <EditModelSimple
                model={updatedQuoteAnswer ? updatedQuoteAnswer : question}
                persistedModel={question}
                modelFields={quoteAnswerFields}
                actionsRequired
                modelSave={saveQuoteAnswer}
                modelDelete={deleteQuoteAnswer}
                showReadOnlyFields
                raiseState={this.raiseStateForQuoteAnswer}
                className="grid-item--borderless"
              />
            </div>
          );
        })}
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </div>
    );
  }
}
QuoteAnswers.defaultProps = {
  charges: [],
  questions: [],
  quoteAnswers: [],
  quoteCharges: [],
  quote: {},
  isLoading: PropTypes.bool,
  saveQuoteAnswer: PropTypes.func.isRequired,
  deleteQuoteAnswer: PropTypes.func.isRequired,
};
QuoteAnswers.propTypes = {
  charges: PropTypes.array,
  questions: PropTypes.array,
  quoteAnswers: PropTypes.array,
  quoteCharges: PropTypes.array,
  quote: PropTypes.object,
  users: PropTypes.array,
  isLoading: PropTypes.bool,
  saveQuoteAnswer: PropTypes.func.isRequired,
  deleteQuoteAnswer: PropTypes.func.isRequired,
};
export default QuoteAnswers;
