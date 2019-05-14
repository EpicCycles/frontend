import React from 'react';
import toJson from 'enzyme-to-json';
import Framework from '../../../components/framework/Framework';
import { NEW_ELEMENT_ID } from '../../../helpers/constants';

describe('Framework', () => {
  test('Framework displays and getFramework is not called', () => {
    const sections = [
      { id: 23 },
      { dummyKey: 'dummy1' },
      { dummyKey: 'dummy2', changed: true },
      { id: 45, delete: true },
      { id: 62, error: true, error_detail: 'errors' },
      { dummyKey: NEW_ELEMENT_ID },
    ];
    const isLoading = false;

    const saveFramework = jest.fn();

    const component = shallow(
      <Framework sections={sections} saveFramework={saveFramework} isLoading={isLoading} />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
