import { NEW_ELEMENT_ID } from '../../helpers/constants';
import PartViewRow from './PartViewRow';

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
const sections = [
  {
    id: 1,
    name: 'Frameset',
    placing: 10,
    partTypes: [
      {
        id: 1,
        attributes: [],
        synonyms: [],
        name: 'Frame',
        placing: 10,
        can_be_substituted: false,
        can_be_omitted: false,
        customer_visible: true,
        includeInSection: 1,
      },
      {
        id: 3,
        attributes: [
          {
            id: 1,
            options: [],
            attribute_name: 'Diameter',
            in_use: true,
            mandatory: false,
            placing: 10,
            attribute_type: '1',
            partType: 2,
          },
        ],
        synonyms: [],
        name: 'Seat Clamp',
        placing: 20,
        can_be_substituted: true,
        can_be_omitted: true,
        customer_visible: false,
        includeInSection: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Groupset',
    placing: 20,
    partTypes: [
      {
        id: 9,
        attributes: [
          {
            id: 4,
            options: [
              {
                id: 1,
                option_name: 'Braze',
                placing: 10,
                part_type_attribute: 4,
              },
              {
                id: 2,
                option_name: 'Band',
                placing: 20,
                part_type_attribute: 4,
              },
            ],
            attribute_name: 'Braze/Band',
            in_use: true,
            mandatory: true,
            placing: 10,
            attribute_type: '3',
            partType: 9,
          },
          {
            id: 16,
            options: [
              {
                id: 6,
                option_name: 'Short',
                placing: 10,
                part_type_attribute: 16,
              },
              {
                id: 7,
                option_name: 'Medium',
                placing: 20,
                part_type_attribute: 16,
              },
            ],
            attribute_name: 'Cage',
            in_use: true,
            mandatory: true,
            placing: 10,
            attribute_type: '6',
            partType: 10,
          },
        ],
        synonyms: [],
        name: 'Rear Mech',
        placing: 40,
        can_be_substituted: true,
        can_be_omitted: true,
        customer_visible: false,
        includeInSection: 2,
      },
      {
        id: 12,
        attributes: [
          {
            id: 5,
            options: [],
            attribute_name: 'Diameter',
            in_use: true,
            mandatory: true,
            placing: 10,
            attribute_type: '1',
            partType: 12,
          },
        ],
        synonyms: [
          {
            id: 2,
            name: 'Rotors',
            partType: 12,
          },
        ],
        name: 'Brake Rotors',
        placing: 60,
        can_be_substituted: true,
        can_be_omitted: true,
        customer_visible: false,
        includeInSection: 2,
      },
      {
        id: 14,
        attributes: [
          {
            id: 15,
            options: [],
            attribute_name: 'Cassette Ratio',
            in_use: true,
            mandatory: true,
            placing: 10,
            attribute_type: '1',
            partType: 14,
          },
          {
            id: 14,
            options: [],
            attribute_name: 'BB Type',
            in_use: true,
            mandatory: false,
            placing: 10,
            attribute_type: '1',
            partType: 15,
          },
          {
            id: 2,
            options: [],
            attribute_name: 'Length',
            in_use: true,
            mandatory: true,
            placing: 10,
            attribute_type: '1',
            partType: 7,
          },
          {
            id: 3,
            options: [],
            attribute_name: 'Ratio',
            in_use: true,
            mandatory: true,
            placing: 20,
            attribute_type: '1',
            partType: 7,
          },
        ],
        synonyms: [],
        name: 'Chainset',
        placing: 110,
        can_be_substituted: true,
        can_be_omitted: true,
        customer_visible: false,
        includeInSection: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'Wheelset',
    placing: 30,
    partTypes: [
      {
        id: 171,
        attributes: [
          {
            id: 13,
            options: [],
            attribute_name: 'Colour',
            in_use: true,
            mandatory: false,
            placing: 10,
            attribute_type: '1',
            partType: 17,
          },
          {
            id: 12,
            options: [],
            attribute_name: 'Baldness',
            in_use: true,
            mandatory: false,
            placing: 10,
            attribute_type: '1',
            partType: 18,
          },
          {
            id: 17,
            options: [],
            attribute_name: 'Size',
            in_use: true,
            mandatory: true,
            placing: 20,
            attribute_type: '1',
            partType: 18,
          },
          {
            id: 11,
            options: [
              {
                id: 3,
                option_name: 'Short',
                placing: 10,
                part_type_attribute: 11,
              },
              {
                id: 4,
                option_name: 'Medium',
                placing: 20,
                part_type_attribute: 11,
              },
              {
                id: 5,
                option_name: 'Long',
                placing: 30,
                part_type_attribute: 11,
              },
              {
                id: 8,
                option_name: 'Extra Long',
                placing: 40,
                part_type_attribute: 11,
              },
            ],
            attribute_name: 'Valve Length',
            in_use: true,
            mandatory: false,
            placing: 10,
            attribute_type: '4',
            partType: 19,
          },
        ],
        synonyms: [],
        name: 'Tubes',
        placing: 30,
        can_be_substituted: true,
        can_be_omitted: true,
        customer_visible: false,
        includeInSection: 3,
      },
    ],
  },
];
describe('PartViewRow', () => {
  it('should display when no part and no supplier products exist', () => {
    const part = {};
    const supplierProducts = [];
    const component = shallow(
      <PartViewRow
        part={part}
        supplierProducts={supplierProducts}
        lockFirstColumn={false}
        sections={sections}
        brands={brands}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should display when no supplier products exist', () => {
    const part = {
      id: 1,
      brand: 2,
      part_name: 'Part Name string',
      trade_in_price: 12,
      standard: true,
      stocked: false,
    };
    const supplierProducts = [];
    const component = shallow(
      <PartViewRow
        part={part}
        supplierProducts={supplierProducts}
        lockFirstColumn={false}
        sections={sections}
        brands={brands}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should display when one supplier products exist', () => {
    const part = {
      id: 1,
      brand: 2,
      part_name: 'Part Name string',
      trade_in_price: 12,
      standard: true,
      stocked: false,
    };
    const supplierProducts = [{ id: 121 }];
    const component = shallow(
      <PartViewRow
        part={part}
        supplierProducts={supplierProducts}
        lockFirstColumn={false}
        sections={sections}
        brands={brands}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should display when multiple supplier products exist', () => {
    const part = {
      id: 1,
      brand: 2,
      part_name: 'Part Name string',
      trade_in_price: 12,
      standard: true,
      stocked: false,
    };
    const supplierProducts = [{ id: 121 }, { id: 41 }];
    const component = shallow(
      <PartViewRow
        part={part}
        supplierProducts={supplierProducts}
        lockFirstColumn={false}
        sections={sections}
        brands={brands}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
