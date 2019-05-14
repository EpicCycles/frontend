import React from 'react';
import * as PropTypes from 'prop-types';

import FormTextInput from '../../common/FormTextInput';
import { generateRandomCode, removeObjectWithIndex, updateObject } from '../../helpers/utils';
import { Icon } from 'semantic-ui-react';
import { NEW_ELEMENT_ID } from '../../helpers/constants';
import SupplierBlob from '../supplier/SupplierBlob';
import { brandFields } from '../app/model/helpers/fields';
import { updateModel } from '../app/model/helpers/model';

class BrandEdit extends React.Component {
  handleBrandValueChange = (fieldName, input) => {
    const updatedBrand = updateModel(this.props.brand, brandFields, fieldName, input);

    if (this.props.componentKey === NEW_ELEMENT_ID) updatedBrand.dummyKey = NEW_ELEMENT_ID;
    this.props.handleBrandChange(this.props.componentKey, updatedBrand);
  };
  removeSupplier = supplierKey => {
    let currentSuppliers = this.props.brand.supplier || [];
    const supplierIndex = currentSuppliers.indexOf(supplierKey);
    if (supplierIndex > -1) {
      const updatedSupplier = removeObjectWithIndex(currentSuppliers, supplierIndex);

      this.handleBrandValueChange('supplier', updatedSupplier);
    }
  };

  handleInputClear = fieldName => {
    if (window.confirm('Please confirm that you want to delete this Brand')) {
      const updatedBrand = updateObject(this.props.brand);
      updatedBrand.delete = true;
      this.props.handleBrandChange(this.props.componentKey, updatedBrand);
    }
  };

  addAnother = () => {
    const updatedBrand = updateObject(this.props.brand);
    updatedBrand.dummyKey = generateRandomCode();
    this.props.handleBrandChange(NEW_ELEMENT_ID, updatedBrand);
  };

  render() {
    const { brand, componentKey, pickUpBrand, suppliers } = this.props;
    const supplierForBrand = suppliers.filter(
      supplier => brand.supplier && brand.supplier.includes(supplier.id),
    );
    return (
      <div
        key={`brand${componentKey}`}
        className="rounded"
        draggable={pickUpBrand && componentKey !== NEW_ELEMENT_ID}
        onDragStart={event => pickUpBrand(event, componentKey)}
      >
        {componentKey === NEW_ELEMENT_ID && <Icon name="add" onClick={this.addAnother} />}
        <FormTextInput
          placeholder="add new"
          fieldName={`brand_name_${componentKey}`}
          value={brand.brand_name}
          onChange={this.handleBrandValueChange}
          onClick={this.handleInputClear}
        />
        <div className="ui toggle checkbox">
          <input
            type="checkbox"
            name={`bike_brand_${componentKey}`}
            onChange={() => this.handleBrandValueChange('bike_brand', !brand.bike_brand)}
            checked={brand.bike_brand}
          />
          <label>Bike Brand</label>
        </div>
        Supplier(s):{' '}
        {supplierForBrand.length > 0
          ? supplierForBrand.map(supplier => (
              <SupplierBlob
                key={`supplier${componentKey}${supplier.id}`}
                supplier={supplier}
                componentKey={supplier.id}
                allowRemoval={true}
                removeFunction={this.removeSupplier}
              />
            ))
          : 'Unknown'}
      </div>
    );
  }
}
BrandEdit.defaultProps = {
  brand: {},
  suppliers: [],
};
BrandEdit.propTypes = {
  suppliers: PropTypes.array,
  brand: PropTypes.object,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteBrand: PropTypes.func,
  saveBrand: PropTypes.func,
  closeBrandModal: PropTypes.func,
};
export default BrandEdit;
