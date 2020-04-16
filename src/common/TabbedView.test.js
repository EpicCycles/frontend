import TabbedView from './TabbedView';

const tabs = [
  { tabText: 'Addresses', tabValue: 1 },
  { tabText: 'Phone numbers', tabValue: 2 },
  { tabText: 'Fittings', tabValue: 3 },
  { tabText: 'History', tabValue: 4 },
  { tabText: 'Quotes', tabValue: 5 },
];
describe('TabbedView', () => {
  test('it selects the first tab if none passed', () => {
    const component = shallow(<TabbedView tabs={tabs} changeTab={jest.fn()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
  test('it selects the passed tab', () => {
    const component = shallow(<TabbedView tabs={tabs} changeTab={jest.fn()} currentTab={3} />);
    expect(toJson(component)).toMatchSnapshot();
  });
  test('it calls the function with the right value', () => {
    const changeTab = jest.fn();
    const component = shallow(<TabbedView tabs={tabs} changeTab={changeTab} currentTab={3} />);
    component.find('#tab1').simulate('click');
    expect(changeTab).toHaveBeenCalledWith(1);
  });
  test('it does not call the function if the tab is selected', () => {
    const changeTab = jest.fn();
    const component = shallow(<TabbedView tabs={tabs} changeTab={changeTab} currentTab={3} />);
    component.find('#tab3').simulate('click');
    expect(changeTab).not.toHaveBeenCalled();
  });
});
