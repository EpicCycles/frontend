import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

import { findObjectWithKey, updateObjectInArray } from '../../helpers/utils';
import {
  checkForChanges,
  createEmptyModelWithDefaultFields,
  getModelKey,
} from '../app/model/helpers/model';
import { questionFields } from './helpers/questionFields';
import IconArray from '../../common/IconArray';
import { NEW_ELEMENT_ID } from '../../helpers/constants';
import EditModelSimple from '../app/model/EditModelSimple';
import ModelTableHeaderRow from '../app/model/ModelTableHeaderRow';
import { Dimmer, Loader } from 'semantic-ui-react';

class Questions extends PureComponent {
  state = { updatedQuestions: [] };
  static getDerivedStateFromProps(props, state) {
    const { updatedQuestions } = state;
    const { questions } = props;

    const checkedUpdatedQuestions = [];
    updatedQuestions.forEach(updatedQuestion => {
      const persistedDetail = findObjectWithKey(questions, getModelKey(updatedQuestion));
      if (persistedDetail && checkForChanges(questionFields, persistedDetail, updatedQuestion))
        checkedUpdatedQuestions.push(updatedQuestion);
    });

    return {
      updatedQuestions: checkedUpdatedQuestions,
    };
  }
  raiseStateForQuestion = updatedQuestion => {
    const { updatedQuestions } = this.state;

    const newUpdatedQuestions = updateObjectInArray(updatedQuestions, updatedQuestion);
    this.setState({ updatedQuestions: newUpdatedQuestions });
  };
  addNewQuestion = () => {
    const { addQuestion } = this.props;
    addQuestion(createEmptyModelWithDefaultFields(questionFields));
  };
  render() {
    const { updatedQuestions } = this.state;
    const { charges, questions, users, saveQuestion, deleteQuestion, isLoading } = this.props;
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'Add New Question',
        iconAction: () => this.addNewQuestion(),
      },
    ];
    return (
      <div className="grid-container">
        <div className="row">
          <h2>Maintain Questions </h2>
          <IconArray componentKey={NEW_ELEMENT_ID} actionArray={additionalActions} />
        </div>
        <div className="grid">
          <ModelTableHeaderRow
            modelFields={questionFields}
            blockIdentity={'question'}
            includeActions
          />
          {questions.map(question => {
            const questionKey = getModelKey(question);
            const updatedQuestion = findObjectWithKey(updatedQuestions, questionKey);
            const rowClass = updatedQuestion && updatedQuestion.error ? 'error' : '';

            return (
              <div className={`grid-row ${rowClass}`} key={`row${questionKey}`}>
                <EditModelSimple
                  model={updatedQuestion ? updatedQuestion : question}
                  persistedModel={question}
                  modelFields={questionFields}
                  actionsRequired
                  users={users}
                  charges={charges}
                  modelSave={saveQuestion}
                  modelDelete={deleteQuestion}
                  showReadOnlyFields
                  raiseState={this.raiseStateForQuestion}
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
  }
}
Questions.propTypes = {
  charges: PropTypes.array,
  questions: PropTypes.array,
  users: PropTypes.array,
  isLoading: PropTypes.bool,
  saveQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};
export default Questions;
