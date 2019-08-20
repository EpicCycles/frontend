import { noteActions } from './noteActions';

describe('noteActions', () => {
  it('should return an empty array when no save function passed', () => {
    expect(noteActions()).toEqual([]);
  });
  it('should return a single entry array when save function passed', () => {
    const note = {};
    const saveNote = jest.fn();
    const actions = noteActions(note, saveNote);
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('iconName', 'eye');
    expect(actions[0]).toHaveProperty('iconTitle', 'change visibility to customer');
    expect(actions[0]).toHaveProperty('iconDisabled', false);
  });
  it('should return a single element array when save function passed', () => {
    const note = {};
    const saveNote = jest.fn();
    const actions = noteActions(note, saveNote);
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('iconName', 'eye');
    expect(actions[0]).toHaveProperty('iconTitle', 'change visibility to customer');
    expect(actions[0]).toHaveProperty('iconDisabled', false);
  });
  it('should return a two element array when save and delete functions passed', () => {
    const note = { customer_visible: true, system_generated: false };
    const saveNote = jest.fn();
    const deleteNote = jest.fn();
    const actions = noteActions(note, saveNote, deleteNote);
    expect(actions).toHaveLength(2);
    expect(actions[0]).toHaveProperty('iconName', 'eye slash');
    expect(actions[0]).toHaveProperty('iconTitle', 'change visibility to customer');
    expect(actions[0]).toHaveProperty('iconDisabled', false);
    expect(actions[1]).toHaveProperty('iconName', 'trash');
    expect(actions[1]).toHaveProperty('iconTitle', 'delete note');
    expect(actions[1]).toHaveProperty('iconDisabled', false);
  });
  it('should return disabled icons when system generated', () => {
    const note = { customer_visible: false, system_generated: true };
    const saveNote = jest.fn();
    const deleteNote = jest.fn();
    const actions = noteActions(note, saveNote, deleteNote);
    expect(actions).toHaveLength(2);
    expect(actions[0]).toHaveProperty('iconName', 'eye');
    expect(actions[0]).toHaveProperty('iconTitle', 'change visibility to customer');
    expect(actions[0]).toHaveProperty('iconDisabled', true);
    expect(actions[1]).toHaveProperty('iconName', 'trash');
    expect(actions[1]).toHaveProperty('iconTitle', 'delete note');
    expect(actions[1]).toHaveProperty('iconDisabled', true);
  });
});
