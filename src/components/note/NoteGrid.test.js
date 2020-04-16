import { findDataTest } from '../../helpers/jest_helpers/assert';
import NoteGrid from './NoteGrid';

describe('NoteGrid', () => {
  it('should return no notes message when no notes exist', () => {
    const component = shallow(<NoteGrid notes={[]} users={[]} />);
    expect(findDataTest(component, 'no-data-message')).toHaveLength(1);
    expect(findDataTest(component, 'note-headers')).toHaveLength(0);
    expect(findDataTest(component, 'note-row')).toHaveLength(0);
  });
  it('should return block for notes when notes are passed', () => {
    const notes = [{ id: 123 }];
    const users = [{ id: 23 }];
    const component = shallow(<NoteGrid notes={notes} users={users} />);
    expect(findDataTest(component, 'no-data-message')).toHaveLength(0);
    expect(findDataTest(component, 'note-headers')).toHaveLength(1);
    expect(findDataTest(component, 'note-row')).toHaveLength(1);
  });
});
