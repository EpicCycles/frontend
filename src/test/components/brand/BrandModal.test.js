import React from 'react';
import toJson from 'enzyme-to-json';
import BrandModal from '../../../components/brand/BrandModal';
import { BRAND_NAME_MISSING } from '../../../components/app/model/helpers/error';
import { NEW_ELEMENT_ID } from '../../../helpers/constants';

const suppliers = [
  { id: 1, supplier_name: 'supplier 1' },
  { id: 2, supplier_name: 'supplier 2' },
  { id: 3, supplier_name: 'supplier 3' },
  { id: 4, supplier_name: 'supplier 4' },
];

describe('BrandModal', () => {
  it('BrandModal displays correctly for a new brand', () => {
    const component = shallow(
      <BrandModal
        brand={{}}
        componentKey={NEW_ELEMENT_ID}
        brandModalOpen
        deleteBrand={jest.fn()}
        saveBrand={jest.fn()}
        closeBrandModal={jest.fn()}
        suppliers={suppliers}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it('BrandModal displays correctly for a brand', () => {
    const brand = {
      brand_name: 'e brand 8',
      link: 'https://bianchi.co.uk',
      id: 8,
      supplier: [23, 1, 2, 45, 16],
    };
    const componentKey = brand.id;
    const component = shallow(
      <BrandModal
        brandModalOpen
        brand={brand}
        componentKey={componentKey}
        suppliers={suppliers}
        deleteBrand={jest.fn()}
        saveBrand={jest.fn()}
        closeBrandModal={jest.fn()}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
