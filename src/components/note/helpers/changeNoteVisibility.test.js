import { changeNoteVisibility } from './changeNoteVisibility';

describe('changeNoteVisibility', () => {
  it('should not call saveNote when no note is passed', () => {
    const saveNote = jest.fn();
    const note = undefined;
    changeNoteVisibility(note, saveNote);
    expect(saveNote).not.toHaveBeenCalled();
  });
  it('should not call saveNote when the note has no id', () => {
    const saveNote = jest.fn();
    const note = { note_text: 'Note text' };
    changeNoteVisibility(note, saveNote);
    expect(saveNote).not.toHaveBeenCalled();
  });
  it('should call saveNote with a visible note when the note did not say before', () => {
    const saveNote = jest.fn();
    const note = { id: 1, note_text: 'Note text' };
    const noteUpdated = { id: 1, note_text: 'Note text', customer_visible: true };
    changeNoteVisibility(note, saveNote);
    expect(saveNote).toHaveBeenCalledWith(noteUpdated);
  });
  it('should call saveNote with a visible note when the note was not visible before', () => {
    const saveNote = jest.fn();
    const note = { id: 1, note_text: 'Note text', customer_visible: false };
    const noteUpdated = { id: 1, note_text: 'Note text', customer_visible: true };
    changeNoteVisibility(note, saveNote);
    expect(saveNote).toHaveBeenCalledWith(noteUpdated);
  });
  it('should call saveNote with a hidden note when the note was  visible before', () => {
    const saveNote = jest.fn();
    const note = { id: 1, note_text: 'Note text', customer_visible: true };
    const noteUpdated = { id: 1, note_text: 'Note text', customer_visible: false };
    changeNoteVisibility(note, saveNote);
    expect(saveNote).toHaveBeenCalledWith(noteUpdated);
  });
});
