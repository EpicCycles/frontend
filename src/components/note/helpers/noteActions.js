import { changeNoteVisibility } from './changeNoteVisibility';
import { CUSTOMER_VISIBLE, SYSTEM_GENERATED_FIELD } from './noteFields';

export const noteActions = (note, saveNote, deleteNote) => {
  const actionArray = [];
  if (saveNote)
    actionArray.push({
      iconName: note[CUSTOMER_VISIBLE] ? 'eye slash' : 'eye',
      iconTitle: 'change visibility to customer',
      iconAction: () => changeNoteVisibility(note, saveNote),
      iconDisabled: !!note[SYSTEM_GENERATED_FIELD.fieldName],
    });
  if (deleteNote)
    actionArray.push({
      iconName: 'trash',
      iconTitle: 'delete note',
      iconAction: () => !!note.id && deleteNote(note.id),
      iconDisabled: !!note[SYSTEM_GENERATED_FIELD.fieldName],
    });
  return actionArray;
};
