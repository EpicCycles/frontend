import React from 'react';
import BikeSearch from './BikeSearch';
import { sampleBrands } from '../../helpers/sampleData';

describe('BikeSearch', () => {
  it('should display search component', () => {
    const component = shallow(
      <BikeSearch
        onChange={jest.fn()}
        onClick={jest.fn()}
        getFrameList={jest.fn()}
        brands={sampleBrands}
        canSelectArchived={true}
      />,
    );
    expect(component.find('Search')).toHaveLength(1);
  });
});
