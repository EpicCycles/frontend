import history from '../../../history';
import { runSaga } from '@redux-saga/core';
import { deleteNote } from '../note';

jest.mock('../apis/noteApi');
const { deleteNoteApi } = require('../apis/noteApi');

describe('note.deleteNote saga', () => {
  const action = {
    type: 'note/NOTE_DELETE_REQUESTED',
    payload: { noteId: 12 },
  };
  afterEach(() => {
    deleteNoteApi.mockClear();
  });
  it('should create action to remove note from state when api succeeds', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    deleteNoteApi.mockImplementation(() => {
      return;
    });
    const result = await runSaga(myIO, deleteNote, action);
    expect(deleteNoteApi).toHaveBeenCalledWith({ noteId: 12, token: 'existingToken' });
    expect(dispatched).toEqual([
      {
        type: 'note/NOTE_DELETE',
        payload: { noteId: 12 },
      },
    ]);
  });
  it('should send error when delete note fails', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: { token: 'existingToken' } }),
    };
    deleteNoteApi.mockRejectedValue(new Error('the error'));
    const result = await runSaga(myIO, deleteNote, action);
    expect(deleteNoteApi).toHaveBeenCalledWith({ noteId: 12, token: 'existingToken' });
    expect(dispatched).toEqual([
      {
        payload: 'Note delete failed',
        type: 'note/NOTE_DELETE_ERROR',
      },
    ]);
  });
  it('should clear state and redirect to login page when no token', async () => {
    const dispatched = [];
    const myIO = {
      dispatch: action => dispatched.push(action),
      getState: () => ({ user: {} }),
    };
    const result = await runSaga(myIO, deleteNote, action);
    expect(deleteNoteApi).not.toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: 'user/USER_LOGOUT_REQUESTED',
      },
    ]);
  });
});
