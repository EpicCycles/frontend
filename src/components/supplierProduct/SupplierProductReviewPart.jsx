import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

import { partFieldsComplete, supplierProductFields } from '../app/model/helpers/fields';
import { getModelKey } from '../app/model/helpers/model';
import { newSupplierProduct } from '../part/helpers/supplierProduct';
import { findObjectWithKey } from '../../helpers/utils';
import EditModelSimple from '../app/model/EditModelSimple';

class SupplierProductReviewPart extends PureComponent {
  addSupplierProduct = partId => {
    const supplierProduct = newSupplierProduct(partId);
    this.props.saveSupplierProductOK(supplierProduct);
  };
  render() {
    const {
      part,
      updatedPart,
      brands,
      suppliers,
      sections,
      supplierProducts,
      updatedSupplierProducts,
      users,
      savePart,
      deletePart,
      saveSupplierProduct,
      deleteSupplierProduct,
      raiseStateForPart,
      raiseStateForSupplierProduct,
    } = this.props;
    const supplierProductsForPart = supplierProducts.filter(sp => sp.part === part.id);
    const noSupplierProduct = supplierProductsForPart.length === 0;
    if (noSupplierProduct) supplierProductsForPart.push({});
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'Add Supplier Product',
        iconAction: () => this.addSupplierProduct(part.id),
      },
    ];
    return supplierProductsForPart.map((supplierProduct, supplierProductIndex) => {
      const rowKey = getModelKey(supplierProduct);
      const updatedSupplierProduct = findObjectWithKey(updatedSupplierProducts, rowKey);
      return (
        <div className="grid-row" key={`partRow${rowKey}`}>
          <EditModelSimple
            model={updatedPart ? updatedPart : part}
            persistedModel={part}
            raiseState={raiseStateForPart}
            modelFields={partFieldsComplete}
            sourceDataArrays={{ sections, brands, users }}
            childModels={supplierProducts}
            lockFirstColumn
            actionsRequired
            showReadOnlyFields
            additionalActions={additionalActions}
            modelSave={savePart}
            modelDelete={deletePart}
            dummyRow={supplierProductIndex > 0}
            key={supplierProductIndex === 0 ? `edit_part_${part.id}` : `dummy${rowKey}`}
          />
          <EditModelSimple
            model={updatedSupplierProduct ? updatedSupplierProduct : supplierProduct}
            persistedModel={supplierProduct}
            raiseState={raiseStateForSupplierProduct}
            modelFields={supplierProductFields}
            sourceDataArrays={{ suppliers, users }}
            modelSave={saveSupplierProduct}
            modelDelete={deleteSupplierProduct}
            actionsRequired
            showReadOnlyFields
            dummyRow={noSupplierProduct}
            key={`sp_${rowKey}`}
          />
        </div>
      );
    });
  }
}
SupplierProductReviewPart.defaultProps = {
  updatedSupplierProducts: [],
};
SupplierProductReviewPart.propTypes = {
  part: PropTypes.object.isRequired,
  updatedPart: PropTypes.object,
  supplierProducts: PropTypes.array,
  updatedSupplierProducts: PropTypes.array,
  brands: PropTypes.array,
  sections: PropTypes.array,
  suppliers: PropTypes.array,
  users: PropTypes.array,
  savePart: PropTypes.func,
  deletePart: PropTypes.func,
  saveSupplierProduct: PropTypes.func,
  saveSupplierProductOK: PropTypes.func,
  deleteSupplierProduct: PropTypes.func,
  raiseStateForPart: PropTypes.func,
  raiseStateForSupplierProduct: PropTypes.func,
};
export default SupplierProductReviewPart;
