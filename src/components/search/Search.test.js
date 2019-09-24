import Search from './Search';
import toJson from 'enzyme-to-json';
import React from 'react';
import { FIRST_NAME_FIELD } from '../app/model/helpers/fields';

describe('Search', () => {
  const searchFields = [FIRST_NAME_FIELD];
  it('should render when minimal data passed', () => {
    const component = shallow(<Search searchFields={searchFields} doSearch={jest.fn()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should set state when updated search criteria passed', () => {
    const component = shallow(<Search searchFields={searchFields} doSearch={jest.fn()} />);
    const newSearchCriteria = { first_name: 'Fred' };
    component.instance().raiseStateForSearchCriteria(newSearchCriteria);
    component.update();
    expect(component.state('updatedSearchCriteria')).toEqual(newSearchCriteria);
  });
  it('should reflect no change when updated search criteria matched old values', () => {
    const searchCriteria = { first_name: 'Fred' };
    const searchCriteriaAfterSave = { first_name: 'Fred', changed: false };
    const component = shallow(
      <Search searchFields={searchFields} doSearch={jest.fn()} searchCriteria={searchCriteria} />,
    );
    component.instance().raiseStateForSearchCriteria(searchCriteria);
    component.update();
    expect(component.state('updatedSearchCriteria')).toEqual(searchCriteriaAfterSave);
  });
});
