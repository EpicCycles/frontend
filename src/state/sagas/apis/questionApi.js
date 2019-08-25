import api from '../api';

const createQuestion = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const question = payload.question;
  const questionsApi = '/rest-epic/question';
  return await api.instance.post(questionsApi, question);
};
const deleteQuestion = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  return await api.instance.delete(`/rest-epic/question/${payload.questionId}`);
};
const saveQuestion = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const question = payload.question;
  const questionApi = `/rest-epic/question/${payload.question.id}`;
  return await api.instance.post(questionApi, question);
};

const getQuestions = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const questionsApi = '/rest-epic/question';
  return await api.instance.get(questionsApi);
};

export default {
  getQuestions,
  createQuestion,
  saveQuestion,
  deleteQuestion,
};
