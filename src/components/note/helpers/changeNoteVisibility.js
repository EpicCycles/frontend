import { updateObject } from '../../../helpers/utils';

export const changeNoteVisibility = (note, saveNote) => {
  if (note && note.id) {
    let updatedNote = updateObject(note, { customer_visible: !note.customer_visible });
    saveNote(updatedNote);
  }
};
