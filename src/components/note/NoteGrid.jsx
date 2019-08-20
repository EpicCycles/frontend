import React from 'react';
import * as PropTypes from 'prop-types';
import { customerNoteFields } from './helpers/noteFields';
import ViewModel from '../app/model/ViewModel';
import { noteActions } from './helpers/noteActions';
import ModelTableHeaderRow from '../app/model/ModelTableHeaderRow';
import { doWeHaveObjects } from '../../helpers/utils';

const NoteGrid = props => {
  const { notes, users, deleteNote, saveNote } = props;
  if (!doWeHaveObjects(notes)) return <div data-test="no-data-message">No Notes to view.</div>;
  return (
    <div className="grid-container">
      <div className="grid">
        <ModelTableHeaderRow
          blockIdentity={'noteGrid'}
          data-test="note-headers"
          modelFields={customerNoteFields}
          lockFirstColumn
          includeActions
        />
        {notes.map(note => (
          <ViewModel
            model={note}
            modelFields={customerNoteFields}
            users={users}
            data-test="note-row"
            lockFirstColumn
            actionsRequired
            modelActions={noteActions(note, saveNote, deleteNote)}
            key={`note_${note.id}`}
          />
        ))}
      </div>
    </div>
  );
};
NoteGrid.propTypes = {
  notes: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  deleteNote: PropTypes.func,
  saveNote: PropTypes.func,
};
export default NoteGrid;
