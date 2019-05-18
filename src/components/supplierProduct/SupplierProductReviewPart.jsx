import React from 'react';
import * as PropTypes from 'prop-types';

import { addToUniqueArray, updateObject } from '../../helpers/utils';
import { partFieldsComplete } from '../app/model/helpers/fields';
import { checkForChangesAllFields, getModelKey, updateModel } from '../app/model/helpers/model';
import SupplierProductEditRow from './SupplierProductEditRow';
import EditModelRow from '../app/model/EditModelRow';
import { getRelevantSupplierProducts, newSupplierProduct } from '../part/helpers/supplierProduct';

const dummyPart = { deleted: true };
class SupplierProductReviewPart extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // Any time the current part changes,
    // Reset any parts of state that are tied to that part.
    // In this simple example, that's just the email.
    if (
      checkForChangesAllFields(partFieldsComplete, props.part, state.persistedPart) ||
      props.part.deleted
    ) {
      return {
        part: updateObject(props.part),
        persistedPart: updateObject(props.part),
        supplierProducts: getRelevantSupplierProducts(props.part, props.supplierProducts),
      };
    }
    return null;
  }

  state = {
    part: updateObject(this.props.part),
    persistedPart: updateObject(this.props.part),
    supplierProducts: getRelevantSupplierProducts(this.props.part, this.props.supplierProducts),
  };

  handleInputChange = (fieldName, input) => {
    let { part } = this.state;
    part = updateModel(part, partFieldsComplete, fieldName, input);
    this.setState({ part });
  };
  resetPart = () => {
    let { persistedPart } = this.state;
    const part = updateObject(persistedPart);
    this.setState({ part });
  };
  addNewSupplierProduct = () => {
    let { supplierProducts, part } = this.state;
    supplierProducts = addToUniqueArray(supplierProducts, newSupplierProduct(part.id));
    this.setState({ supplierProducts });
  };
  render() {
    const { part, persistedPart, supplierProducts } = this.state;
    const {
      brands,
      suppliers,
      sections,
      savePart,
      deletePart,
      saveSupplierProduct,
      deleteSupplierProduct,
    } = this.props;
    const additionalActions = [
      {
        iconName: 'add',
        iconTitle: 'add Supplier product details',
        iconAction: this.addNewSupplierProduct,
        iconDisabled: part.deleted || !part.id,
      },
    ];
    return supplierProducts.map((supplierProduct, supplierProductIndex) => {
      const rowKey = getModelKey(supplierProduct);
      return (
        <div className="grid-row" key={`partRow${rowKey}`}>
          <EditModelRow
            model={part}
            modelFields={partFieldsComplete}
            persistedModel={persistedPart}
            sections={sections}
            brands={brands}
            onChange={this.handleInputChange}
            childModels={supplierProducts}
            lockFirstColumn
            actionsRequired
            modelSave={savePart}
            modelDelete={deletePart}
            modelReset={this.resetPart}
            additionalActions={additionalActions}
            dummyRow={supplierProductIndex > 0}
          />
          <SupplierProductEditRow
            supplierProduct={supplierProduct}
            suppliers={suppliers}
            saveSupplierProduct={saveSupplierProduct}
            deleteSupplierProduct={deleteSupplierProduct}
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
  deleteSupplierProduct: PropTypes.func,
};
export default SupplierProductReviewPart;
