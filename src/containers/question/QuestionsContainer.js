import { connect } from 'react-redux';
import Questions from '../../components/question/Questions';

import { deleteQuestion, saveQuestion, addQuestion } from '../../state/actions/core';

export default connect(
  ({ core, user }) => ({
    charges: core.charges,
    questions: core.questions,
    users: user.users,
    isLoading: core.isLoading,
  }),
  {
    saveQuestion,
    addQuestion,
    deleteQuestion,
  },
)(Questions);
