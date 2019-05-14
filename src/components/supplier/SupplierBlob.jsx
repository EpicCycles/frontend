import React from 'react';
import { buildColourAttributesForId } from '../../helpers/utils';
import { Icon } from 'semantic-ui-react';
import Brands from '../brand/Brands';
import * as PropTypes from 'prop-types';
import { getModelKey } from '../app/model/helpers/model';

class SupplierBlob extends React.Component {
  render() {
    const {
      supplier,
      brands,
      showBrands,
      showWebsite,
      allowRemoval,
      removeFunction,
      allowEdit,
      editFunction,
    } = this.props;
    const componentKey = getModelKey(supplier);
    const colourAttributes = buildColourAttributesForId(componentKey);
    const dest = allowEdit ? 'E' : '';
    const brandNames = [];
    if (showBrands && brands)
      brands.forEach(brand => {
        if (brand.supplier.includes(supplier.id)) brandNames.push(brand.brand_name);
      });
    return (
      <div
        key={`supplierBlob${dest}${componentKey}`}
        className={`rounded-auto ${colourAttributes.colour} ${colourAttributes.background} ${
          colourAttributes.border
        }`}
      >
        <nobr>
          {supplier.supplier_name}
          {allowEdit && (
            <Icon
              key={`supplierBlobEdit${dest}${componentKey}`}
              name="edit"
              onClick={() => editFunction(componentKey)}
            />
          )}
          {allowRemoval && (
            <Icon
              key={`supplierBlobDelete${dest}${componentKey}`}
              name="delete"
              onClick={() => removeFunction(componentKey)}
            />
          )}
        </nobr>
        {showBrands && (
          <div key={`supplierBlobBrands${dest}${componentKey}`}>
            {' '}
            Brands: {brandNames.join(', ')}
          </div>
        )}
        {showWebsite && supplier.link && (
          <a key={`supplierBlobLink${dest}${componentKey}`} href={supplier.link}>
            Website
          </a>
        )}
      </div>
    );
  }
}
SupplierBlob.defaultProps = {
  brands: [],
  supplier: {},
};
SupplierBlob.propTypes = {
  brands: PropTypes.array,
  supplier: PropTypes.object,
  showBrands: PropTypes.bool,
  showWebsite: PropTypes.bool,
  allowEdit: PropTypes.bool,
  allowRemoval: PropTypes.bool,
  editFunction: PropTypes.func,
  removeFunction: PropTypes.func,
};
export default SupplierBlob;
