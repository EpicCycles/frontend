import React from 'react';
import * as PropTypes from 'prop-types';

import { partFieldsComplete, supplierProductFields } from '../app/model/helpers/fields';
import { getModelKey } from '../app/model/helpers/model';
import { newSupplierProduct } from '../part/helpers/supplierProduct';
import EditModel from '../app/model/EditModel';

class SupplierProductReviewPart extends React.Component {
  addSupplierProduct = partId => {
    const supplierProduct = newSupplierProduct(partId);
    this.props.saveSupplierProductOK(supplierProduct);
  };
  render() {
    const {
      part,
      brands,
      suppliers,
      sections,
      supplierProducts,
      savePart,
      deletePart,
      saveSupplierProduct,
      deleteSupplierProduct,
    } = this.props;
    const supplierProductsForPart = supplierProducts.filter(sp => sp.part === part.id);
    const noSupplierProduct = supplierProductsForPart.length === 0;
    if (noSupplierProduct) supplierProductsForPart.push(newSupplierProduct(part.id));
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'Add Supplier Product',
        iconAction: () => this.addSupplierProduct(part.id),
        iconDisabled: noSupplierProduct,
      },
    ];
    return supplierProductsForPart.map((supplierProduct, supplierProductIndex) => {
      const rowKey = getModelKey(supplierProduct);
      return (
        <div className="grid-row" key={`partRow${rowKey}`}>
          <EditModel
            model={part}
            modelFields={partFieldsComplete}
            sections={sections}
            brands={brands}
            childModels={supplierProducts}
            lockFirstColumn
            actionsRequired
            showReadOnlyFields
            additionalActions={additionalActions}
            modelSave={savePart}
            modelDelete={deletePart}
            dummyRow={supplierProductIndex > 0}
          />
          <EditModel
            model={supplierProduct}
            modelFields={supplierProductFields}
            suppliers={suppliers}
            modelSave={saveSupplierProduct}
            modelDelete={deleteSupplierProduct}
            actionsRequired
            showReadOnlyFields
          />
        </div>
      );
    });
  }
}
SupplierProductReviewPart.propTypes = {
  part: PropTypes.object.isRequired,
  supplierProducts: PropTypes.array,
  brands: PropTypes.array,
  sections: PropTypes.array,
  suppliers: PropTypes.array,
  savePart: PropTypes.func,
  deletePart: PropTypes.func,
  saveSupplierProduct: PropTypes.func,
  saveSupplierProductOK: PropTypes.func,
  deleteSupplierProduct: PropTypes.func,
};
export default SupplierProductReviewPart;
