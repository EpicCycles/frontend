/* eslint-disable max-len */
import api from '../api';
import { buildSearchCriteria } from './utils/list';

export const getNoteListApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const noteApi = `/rest-epic/customernotes${buildSearchCriteria(payload)}`;
  return await api.instance.get(noteApi);
};

export const createNoteApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const note = payload.note;
  const noteApi = '/rest-epic/customernote';
  return await api.instance.post(noteApi, note);
};
export const saveNoteApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const note = payload.note;
  const noteApi = `/rest-epic/customernote/${note.id}`;
  return await api.instance.post(noteApi, note);
};
export const deleteNoteApi = async payload => {
  api.instance.defaults.headers.common.Authorization = `Token ${payload.token}`;
  const noteId = payload.noteId;
  const noteApi = `/rest-epic/customernote/${noteId}`;
  return await api.instance.delete(noteApi);
};
