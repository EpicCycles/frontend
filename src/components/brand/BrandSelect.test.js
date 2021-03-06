import { NEW_ELEMENT_ID } from '../../helpers/constants';
import BrandSelect from './BrandSelect';

const brands = [
  { id: 1, brand_name: 'brand 1' },
  { id: 2, brand_name: 'brand 2', supplier: [] },
  { id: 3, brand_name: 'brand 3', supplier: [1] },
  { id: 4, brand_name: 'brand 4', delete: true },
  {
    id: 5,
    brand_name: 'brand 5',
    changed: true,
    supplier: [1, 3],
  },
  { dummyKey: '123ABC', brand_name: 'brand new', changed: true },
  { dummyKey: NEW_ELEMENT_ID, brand_name: 'brand new 2', changed: true },
];
test('component displays correctly with brands', () => {
  const component = shallow(<BrandSelect brands={brands} onChange={jest.fn()} />);
  expect(toJson(component)).toMatchSnapshot();
});
