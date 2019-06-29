import React from 'react';
import toJson from 'enzyme-to-json';
import BikeEdit from '../../../components/bike/BikeEdit';
import { assertComponentHasExpectedProps, findDataTest } from '../../jest_helpers/assert';
import { bikeFields } from '../../../components/app/model/helpers/fields';

const frames = [
  {
    id: 14,
    brand_name: 'Haibike',
    frame_name: 'Trekking',
    archived: false,
    archived_date: null,
    brand: 3,
  },
  {
    id: 13,
    brand_name: 'Haibike',
    frame_name: 'Urban',
    archived: false,
    archived_date: null,
    brand: 3,
  },
  {
    id: 27,
    brand_name: 'Raleigh',
    frame_name: 'Motus',
    archived: false,
    archived_date: null,
    brand: 4,
  },
];
const brands = [
  { brand_name: 'Bianchi', link: 'https://bianchi.co.uk', id: 8 },
  { brand_name: 'Haibike', id: 3 },
];
const bike = {
  id: 58,
  model_name: '4',
  description: null,
  colours: 'anthracite/black/lime',
  rrp: null,
  epic_price: null,
  club_price: '2249.00',
  sizes: null,
  frame: 14,
};

describe('basic render', () => {
  const props = {
    bike,
    brands,
    frames,
  };
  let component;
  let saveBike;
  let deleteBikes;
  beforeEach(() => {
    saveBike = jest.fn();
    deleteBikes = jest.fn();
    component = shallow(<BikeEdit {...props} saveBike={saveBike} deleteBikes={deleteBikes} />);
  });

  test('should show the bike name and bike edit page when rendered', () => {
    expect(toJson(component)).toMatchSnapshot();
    const modelEdit = component.find('EditModelPage');
    assertComponentHasExpectedProps(modelEdit, {
      model: props.bike,
      persistedModel: props.bike,
      modelFields: bikeFields,
    });
    expect(findDataTest(component, 'edit-icons')).toHaveLength(1);
    expect(findDataTest(component, 'add-bike-part')).toHaveLength(0);
  });
});

describe('With add part', () => {
  const props = {
    bike,
    brands,
    frames,
    saveBike: jest.fn(),
    deleteBikes: jest.fn(),
  };
  let component;
  let addPart;
  beforeEach(() => {
    addPart = jest.fn();
    component = shallow(<BikeEdit {...props} addPart={addPart} />);
  });
  test('should display add part when function is passed', () => {
    expect(findDataTest(component, 'edit-icons')).toHaveLength(1);

    expect(findDataTest(component, 'add-bike-part')).toHaveLength(1);
  });
});
