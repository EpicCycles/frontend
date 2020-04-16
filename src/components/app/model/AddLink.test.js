import AddLink from './AddLink';
import { findDataTest } from '../../../helpers/jest_helpers/assert';

describe('CustomerAddLink', () => {
  test('should render when passed props', () => {
    const component = shallow(<AddLink addFunction={jest.fn()} />);
    expect(findDataTest(component, 'add-icon')).toHaveLength(1);
  });
  test('should call passed method when add link is clicked', () => {
    const addFunction = jest.fn();
    const component = shallow(<AddLink addFunction={addFunction} />);
    findDataTest(component, 'add-icon').simulate('click');
    expect(addFunction).toHaveBeenCalledTimes(1);
  });
});
